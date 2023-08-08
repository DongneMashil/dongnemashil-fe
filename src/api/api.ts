import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { getNewAccessToken } from './loginApi';

const baseUrl = process.env.REACT_APP_SERVER_API_URL;

/** 회원가입, 로그인용 인스턴스 */
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

/** 유저 인증 인스턴스 - 로그인 상태의 api 요청시 해당 인스턴스 사용 필요 */
// export const axiosUserInstance: AxiosInstance = axios.create({
//   baseURL: baseUrl,
//   withCredentials: true,
// });
/** access token 갱신 interceptor */
axiosInstance.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => {
    // 걍 전달
    return res;
  },
  (err: AxiosError | Error): void => {
    console.log('interceptor', err);
    getNewAccessToken(); // 리프레시 토큰으로 갱신!!!
  }
);

// const verifyUserSuccess = async (
//   config: AxiosRequestConfig
// ): Promise<AxiosRequestConfig> => {
//   return config; // 20X 정상 응답시 그냥 전달
// };

// const verifyUserError = err : any => {
//   return Promise.reject(err);
// }

/** access token 인증 실패시 사용 인스턴스 (refresh token 갱신용) */
// export const axiosRefreshToken: AxiosInstance = axios.create({
//   baseURL: baseUrl,
//   withCredentials: true,
// });
