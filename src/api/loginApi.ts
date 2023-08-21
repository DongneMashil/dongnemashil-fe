import { AxiosResponse, AxiosError } from 'axios';
import { axiosInstance } from './api';

export interface UserStateRes {
  email: string;
  nickname: string;
}

/** 카카오 로그인 */
export const loginKakao = () => {
  const loginURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_CLIENT_API_URL}/login/kakao&response_type=code`;

  window.location.href = loginURL;
};

/** 카카오 로그인 후 코드 전송 */
export const loginKakaoCallback = async (code: string) => {
  console.log(code);
  await axiosInstance
    .post(`/kakao?code=${code}`)
    .then((res) => {
      console.log('카카오 로그인 성공', res.data);
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
    console.log('Login Success, ', response.data);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data || e.message);
    }
    throw e;
  }
};

/** 회원가입 */
export const register = async (data: {
  email: string;
  nickname: string;
  password: string;
}) => {
  console.log('요청 데이터: ', data);
  try {
    const response: AxiosResponse = await axiosInstance.post(`/register`, data);
    console.log('register success', response);
    const accessToken = response.headers['Accesstoken'];
    const refreshToken = response.headers['Refreshtoken'];
    console.log('refresh token', refreshToken);
    console.log('access token', accessToken);

    return response.data;
  } catch (e: unknown) {
    console.log(e);
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
    console.log(e);
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
  return axiosInstance.get(`/accesstoken`).then((res) => {
    return res.data;
  });
};

/** refresh token으로 access token 재발급 */
export const getNewAccessToken = () => {
  return axiosInstance.get(`/refreshtoken`).then((res) => {
    console.log('Got new access token', res.data);
    return res.data;
  });
};

/** logout */
export const logout = () => {
  return axiosInstance.get(`/logout`).then((res) => {
    console.log('Successfully logged out, ', res.data);
    return res.data;
  });
};
