import axios, { AxiosResponse, AxiosError } from 'axios';
import { axiosInstance } from './api';

export interface UserStateRes {
  email: string;
  nickname: string;
}

export const tokenHandler = (accessToken: string, refreshToken?: string) => {
  // 토큰 로컬 스토리지에 저장
  // console.log('tokenHandler', accessToken, refreshToken);
  window.localStorage.setItem('access_token', accessToken);
  if (refreshToken) {
    window.localStorage.setItem('refresh_token', refreshToken);
  }
};

export const setClientHeader = (accessToken: string) => {
  // console.log('setClientHeader', accessToken);
  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer%20${accessToken}`;
  // console.log('setting access token to header: ', `Bearer%20${accessToken}`);
};

export const resetHeader = () => {
  // console.log('resetHeader');
  // window.localStorage.removeItem('access_token');
  // window.localStorage.removeItem('refresh_token');
  window.localStorage.clear();
  // console.log( 'reset Header access token', window.localStorage.getItem('access_token') );
  // console.log( 'reset Header refresh token', window.localStorage.getItem('refresh_token') );
  axiosInstance.defaults.headers.common = {};
};

/** 카카오 로그인 */
export const loginKakao = () => {
  const loginURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_CLIENT_API_URL}/login/kakao&response_type=code`;

  window.location.href = loginURL;
};

/** 카카오 로그인 후 코드 전송 */
export const loginKakaoCallback = async (code: string) => {
  // console.log(code);
  await axiosInstance
    .post(`/kakao?code=${code}`)
    .then((response) => {
      // console.log('response headers', response.headers);
      const accessToken = response.headers['authorization'].replace(
        'Bearer%20',
        ''
      );
      const refreshToken = response.headers['refreshtoken'].replace(
        'Bearer%20',
        ''
      );
      // console.log('Received Access Token: ', accessToken);
      // console.log('Received Refresh Token: ', refreshToken);
      tokenHandler(accessToken, refreshToken);
      // console.log('카카오 로그인 성공', response.data);
    })
    .catch((err) => {
      console.log('kakao 소셜 로그인 에러 : ', err);
      window.alert('소셜 로그인에 실패하였습니다.');
      window.location.href = `/login`;
    });
};

/** 로그인 */
export const login = async (data: { email: string; password: string }) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(`/login`, data);
    // console.log('Login Success, ', response.data);

    // 토큰 가져오기
    const accessToken = response.headers['authorization'].replace(
      'Bearer%20',
      ''
    );
    const refreshToken = response.headers['refreshtoken'].replace(
      'Bearer%20',
      ''
    );
    // console.log('Received Access Token: ', accessToken);
    // console.log('Received Refresh Token: ', refreshToken);
    // 로컬스토리지 저장, 헤더에 세팅
    tokenHandler(accessToken, refreshToken);

    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data || e.message);
    }
    throw e;
  }
};

/** 회원가입 */
// 회원가입 요청 후
// then에서 토큰 지정 (로컬스토리지에 저장)
// catch에서 에러 던지기
export const register = async (data: {
  email: string;
  nickname: string;
  password: string;
}) => {
  // console.log('요청 데이터: ', data);
  try {
    const response: AxiosResponse = await axiosInstance.post(`/register`, data);
    const accessToken = response.headers['authorization'].replace(
      'Bearer%20',
      ''
    );
    const refreshToken = response.headers['refreshtoken'].replace(
      'Bearer%20',
      ''
    );
    // console.log('Received accessToken: ', accessToken);
    // console.log('Received refreshToken: ', refreshToken);
    tokenHandler(accessToken, refreshToken);

    return response.data;
  } catch (e: unknown) {
    // console.log(e);
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data || e.message);
    }
    throw e;
  }
};

/** 회원가입 아이디 중복 체크 */
export const confirmId = async (email: string) => {
  try {
    const req = {
      email,
    };
    const response: AxiosResponse = await axiosInstance.post(
      `/register/email`,
      req
    );
    return response.data;
  } catch (e: unknown) {
    // console.log(e);
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.message || e.message);
    }
    throw e;
  }
};

/** 회원가입 닉네임 중복 체크 */
export const confirmNickname = async (nickname: string) => {
  try {
    const req = {
      nickname,
    };
    const response: AxiosResponse = await axiosInstance.post(
      `/register/nickname`,
      req
    );
    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.message || e.message);
    }
    throw e;
  }
};

/** 로그인 유저 정보 */
export const verifyUser = () => {
  const token = window.localStorage.getItem('access_token');
  if (token) {
    setClientHeader(token);
  }
  return axiosInstance.get(`/accesstoken`).then((response) => {
    return response.data;
  });
};

/** refresh token으로 access token 재발급 */
export const getNewAccessToken = async () => {
  // 헤더에 리프레쉬 토큰 삽입
  const refreshToken = `Bearer%20${window.localStorage.getItem(
    'refresh_token'
  )}`;
  // console.log('setting refresh token to header', refreshToken);
  // axiosInstance.defaults.headers.common['Refreshtoken'] = refreshToken;

  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_API_URL}/refreshtoken`,
    {
      headers: {
        Refreshtoken: refreshToken,
      },
    }
  );
  return response;
};

/** logout */
export const logout = () => {
  resetHeader();
  window.location.href = '/';
};
