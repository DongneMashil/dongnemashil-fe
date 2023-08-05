import { axiosInstance, axiosUserInstance, axiosRefreshToken } from './api';
import { AxiosError, AxiosResponse } from 'axios';

/** 헤더에 토큰 설정 */
const setHeaders = (res: AxiosResponse): void => {
  console.log('res', res);
  console.log("res.headers['Accesstoken']", res.headers['Accesstoken']);

  //! body로 받은 토큰값을 axios 헤더에 저장하기
  //! 서버에 body 전송으로 변경할 것을 요청하기
  const accessToken = res.data.accessToken; //! 이후 체크 필요
  axiosUserInstance.defaults.headers['AccessToken'] = accessToken;

  console.log('Access Token: ', accessToken);
};

/** 카카오 로그인 */
export const loginKakao = () => {
  const loginURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=http://localhost:3000/login/kakao&response_type=code`;

  window.location.href = loginURL;
};

/** 카카오 로그인 후 코드 전송 */
export const loginKakaoCallback = async (code: string) => {
  console.log(code);
  await axiosInstance
    .post(`kakao?code=${code}`)
    .then((res) => {
      console.log('카카오 로그인 성공', res.data);
      setHeaders(res);
      window.location.href = `/`;
    })
    .catch((err) => {
      console.log('kakao 소셜 로그인 에러 : ', err);
      window.alert('소셜 로그인에 실패하였습니다.');
      window.location.href = `/login`;
    });
};

/** 로그인 */
export const login = async (email: string, pw: string) => {
  await axiosInstance
    .post(`/login`, {
      email: email,
      password: pw,
    })
    .then((res) => {
      console.log('login success', res.data);
      setHeaders(res);
    })
    .catch((err) => {
      // 400 이메일이나  비밀번호가 잘못된 경우
      // {errorMessage: "잘못된 이메일이거나 잘못된 비밀번호입니다."}
      throw err;
    });
};

/** 회원가입 */
export const register = async (
  email: string,
  nickname: string,
  password: string
) => {
  const data = {
    email: email,
    password: password,
    nickname: nickname,
  };
  console.log('요청 데이터: ', data);
  await axiosInstance
    .post(`/register`, data)
    .then((res) => {
      console.log('register success', res.data);
      setHeaders(res);
    })
    .catch((err) => {
      console.log(err);
      // 400 이메일 형식이 올바르지 않은 경우
      //{errorMessage : "이메일 형식이 일치하지 않습니다."}

      // 400  닉네임 형식이 올바르지 않은 경우
      //{errorMessage : "닉네임 형식이 맞지 않습니다."}

      // 400 비밀번호 형식이 올바르지 않은 경우
      //{errorMessage : "비밀번호는 최소 8자리 이상15자리 이하, 영문 숫자, 특수문자(!@#$%^&*)가 최소 하나 포함되어야 합니다."}

      // 409 이메일이 존재하는 경우
      //{errorMessage : "이미 이메일이 존재합니다."}

      throw err;
    });
};

/** 로그인 유저 정보 */
export const verifyUser = () => {
  axiosUserInstance
    .get(`/accesstoken`)
    .then((res: AxiosResponse) => {
      console.log('Verified User:', res.data);
      return res.data;
    })
    .catch((err: AxiosError) => {
      console.log(err);
      // 400 서버 에러
      // {errorMessage : 유저를 찾을 수 없습니다.}
      //? axiosInstance에 토큰 설정이 안되어있을 경우 어떻게 될까? 내쪽에서 먼저 예외 처리 필요?

      //401 토큰 에러
      // (errorMessage : 토큰 유효기간 만료)

      //401 토큰 에러
      // (errorMessage : 유효한 토큰이 아닙니다.)
      throw err;
    });
};

/** refresh token으로 access token 재발급 */
export const getNewAccessToken = () => {
  axiosRefreshToken
    .get(`/refreshtoken`)
    .then((res) => {
      console.log('Got new access token', res.data);
      const newAccessToken = res.headers['Accesstoken'];
      axiosUserInstance.defaults.headers['AccessToken'] = newAccessToken;
    })
    .catch((err: AxiosError) => {
      console.log(err.message);
      window.alert('다시 로그인해주세요!');
      window.location.href = '/';
      //401 토큰 에러
      //(errorMessage : 토큰 유효기간 만료)
      //401 토큰 에러
      //(errorMessage : 유효한 토큰이 아닙니다.)
    });
};
