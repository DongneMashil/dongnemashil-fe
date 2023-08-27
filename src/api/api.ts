import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { getNewAccessToken, setClientHeader } from './loginApi';

interface RetryConfig extends AxiosRequestConfig {
  _retry: boolean;
}

export const retryConfig: RetryConfig = {
  _retry: false,
};

const baseUrl = process.env.REACT_APP_SERVER_API_URL;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

/** access token 갱신 interceptor */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    console.log('👀response interceptor 정상적으로 통과!');
    return response;
  },
  async (err) => {
    console.log('👀response interceptor err ', err);
    console.log('👀response interceptor err msg ', err.response.data.message);
    console.log('👀response interceptor config', retryConfig);
    console.log('👀response interceptor config _retry ', retryConfig._retry);
    if (
      err.response.data.message == '토큰 유효기간 만료.' &&
      retryConfig._retry === false
    ) {
      console.log('👀repsponse interceptor 분기 진입');
      retryConfig._retry = true;
      const refreshToken = window.localStorage.getItem('refresh_token');
      axiosInstance.defaults.headers.common['Refreshtoken'] = refreshToken;
      await getNewAccessToken();

      return axiosInstance(retryConfig);
    } else throw err;
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
