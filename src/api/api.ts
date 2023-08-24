import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getNewAccessToken, setClientHeader } from './loginApi';

const baseUrl = process.env.REACT_APP_SERVER_API_URL;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

/** access token 갱신 interceptor */
axiosInstance.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => {
    console.log('👀response interceptor 정상적으로 통과!');
    return res;
  },
  (err): void => {
    console.log('👀response interceptor err ', err);
    console.log('👀response interceptor err msg ', err.response.data.message);
    if (err.response.data.message == '토큰 유효기간 만료.') {
      const refreshToken = window.localStorage.getItem('refresh_token');
      axiosInstance.defaults.headers['Refreshtoken'] = refreshToken;
      getNewAccessToken();
    }
    throw err;
  }
);

/** 요청 이전 access token 존재시 넣어주기 */
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  console.log('👀request interceptor start');
  const accessToken = window.localStorage.getItem('access_token');
  if (accessToken) {
    console.log('👀request interceptor accessToken exists');
    setClientHeader(accessToken);
  }
  return config;
});
