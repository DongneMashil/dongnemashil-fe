import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getNewAccessToken } from './loginApi';

const baseUrl = process.env.REACT_APP_SERVER_API_URL;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

/** access token 갱신 interceptor */
axiosInstance.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => {
    return res;
  },
  (err): void => {
    console.log('interceptor err ', err);
    console.log('interceptor err msg ', err.response.data.message);
    if (err.response.data.message == '토큰 유효기간 만료.') {
      const refreshToken = window.localStorage.getItem('refresh_token');
      axiosInstance.defaults.headers['Refreshtoken'] = refreshToken;
      getNewAccessToken();
    }
    throw err;
  }
);
