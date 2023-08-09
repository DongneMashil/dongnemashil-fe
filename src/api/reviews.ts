import { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from './api';


export const submitReview = async (data: globalThis.FormData) => {
  try {
    const response: AxiosResponse<{ id: number }> = await axiosInstance.post(
      '/api/reviews',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      // 각 에러 코드에 따라 특정 에러 메시지를 던질 수 있습니다.
      if (e.response?.status === 400) {
        throw new Error('content가 필요합니다.');
      } else if (e.response?.status === 409) {
        throw new Error('이미지가 필요합니다.');
      } else if (e.response?.status === 401) {
        throw new Error('로그인이 필요한 기능입니다.');
      } else if (e.response?.status === 415) {
        throw new Error('지정한 미디어 타입이 아닙니다.');
      } else {
        throw new Error(e.response?.data?.errorMessage || e.message);
      }
    }
    throw e;
  }
};

// import axios, { AxiosError, AxiosResponse } from 'axios';

// const jsonServer = axios.create({
//   baseURL: 'http://localhost:4000',
// });

// export const submitReview = async (data: globalThis.FormData) => {
//   try {
//     console.log('Sending FormData:', Array.from(data.entries()));

//     const response: AxiosResponse<{ id: number }> = await jsonServer.post(
//       '/reviews',
//       data,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );
//     return response.data;
//   } catch (e: unknown) {
//     if (e instanceof AxiosError) {
//       if (e.response?.status === 400) {
//         throw new Error('content가 필요합니다.');
//       } else if (e.response?.status === 409) {
//         throw new Error('이미지가 필요합니다.');
//       } else if (e.response?.status === 401) {
//         throw new Error('로그인이 필요한 기능입니다.');
//       } else if (e.response?.status === 415) {
//         throw new Error('지정한 미디어 타입이 아닙니다.');
//       } else {
//         throw new Error(e.response?.data?.errorMessage || e.message);
//       }
//     }
//     throw e;
//   }
// };
