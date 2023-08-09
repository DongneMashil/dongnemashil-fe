import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { getNewAccessToken } from './loginApi';

const baseUrl = process.env.REACT_APP_SERVER_API_URL;

/** 회원가입, 로그인용 인스턴스 */
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

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
