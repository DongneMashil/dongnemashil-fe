import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER_API_URL;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export const axiosWithToken = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
