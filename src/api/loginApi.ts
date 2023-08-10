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
  await axiosInstance
    .post(`/login`, data)
    .then((res) => {
      console.log('login success', res.data);
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
  return axiosInstance.post(`/register`, data).then((res) => {
    console.log('register success', res.data);
    return res.data;
  });
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
