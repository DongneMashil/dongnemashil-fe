import { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from './api';

export interface ReviewData {
  id: number;
  address: string;
  content: string;
  mainImgUrl: string;
  roadName: string;
  subImgUrl: string[];
  tag: { id: number; name: string }[];
  title: string;
  videoUrl: string | null;
}

export const submitReview = async (data: globalThis.FormData) => {
  try {
    const response: AxiosResponse<{ id: number }> = await axiosInstance.post(
      '/reviews',
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

export const updateReview = async (
  reviewId: number,
  data: globalThis.FormData
) => {
  try {
    const response: AxiosResponse<{ id: number }> = await axiosInstance.put(
      `/reviews/${reviewId}`,
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
      if (e.response?.status === 401) {
        throw new Error('로그인이 필요한 기능입니다.');
      } else if (e.response?.status === 403) {
        throw new Error('작성자가 아닙니다.');
      } else {
        throw new Error(e.response?.data?.errorMessage || e.message);
      }
    }
    throw e;
  }
};

export const getReview = async (reviewId: number) => {
  try {
    const response: AxiosResponse<ReviewData> = await axiosInstance.get(
      `/reviews/${reviewId}`
    );
    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      if (e.response?.status === 400) {
        throw new Error('범위를 벗어난 페이지 요청입니다.');
      } else if (e.response?.status === 404) {
        throw new Error('페이지가 존재하지 않습니다.');
      } else {
        throw new Error(e.response?.data?.errorMessage || e.message);
      }
    }
    throw e;
  }
};
