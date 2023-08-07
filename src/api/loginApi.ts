import { axiosInstance } from './api';
import { AxiosError, AxiosResponse } from 'axios';

/** 카카오 로그인 */
export const loginKakao = () => {
  const loginURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_CLIENT_API_URL}login/kakao&response_type=code`;

  window.location.href = loginURL;
};

/** 카카오 로그인 후 코드 전송 */
export const loginKakaoCallback = async (code: string) => {
  console.log(code);
  await axiosInstance
    .post(`kakao?code=${code}`)
    .then((res) => {
      console.log('카카오 로그인 성공', res.data);
      //window.location.href = '/';
    })
    .catch((err) => {
      console.log('kakao 소셜 로그인 에러 : ', err);
      window.alert('소셜 로그인에 실패하였습니다.');
      //window.location.href = `/login`;
    });
};

/** 로그인 */
export const login = async (data: { email: string; password: string }) => {
  await axiosInstance
    .post(`/login`, data)
    .then((res) => {
      console.log('login success', res.data);
      //window.location.href = '/';
    })
    .catch((err) => {
      throw err;
    });
};

/** 회원가입 */
export const register = async (data: {
  email: string;
  nickname: string;
  password: string;
}) => {
  console.log('요청 데이터: ', data);
  await axiosInstance
    .post(`/register`, data)
    .then((res) => {
      console.log('register success', res.data);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

/** 로그인 유저 정보 */
export const verifyUser = () => {
  axiosInstance
    .get(`/accesstoken`)
    .then((res: AxiosResponse) => {
      console.log('Verified User:', res.data);
      return res.data;
    })
    .catch((err: AxiosError) => {
      console.log(err);
    });
};

/** refresh token으로 access token 재발급 */
export const getNewAccessToken = () => {
  axiosInstance
    .get(`/refreshtoken`)
    .then((res) => {
      console.log('Got new access token', res.data);
    })
    .catch((err: AxiosError) => {
      console.log(err.message);
      window.alert('다시 로그인해주세요!');
      window.location.href = '/';
    });
};
