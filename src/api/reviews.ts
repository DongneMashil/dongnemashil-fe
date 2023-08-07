import { AxiosError, AxiosResponse } from 'axios';
import { axiosWithToken } from './api';

interface ReviewData {
  title: string;
  content: string;
  img_url: string;
  address: string;
  tag: string;
}

export const submitReview = async (data: ReviewData) => {
  try {
    const response: AxiosResponse<{ id: number }> = await axiosWithToken.post(
      '', 
      data
    );
    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      // 각 에러 코드에 따라 특정 에러 메시지를 던질 수 있습니다.
      if (e.response?.status === 400) {
        throw new Error("content가 필요합니다.");
      } else if (e.response?.status === 409) {
        throw new Error("이미지가 필요합니다.");
      } else if (e.response?.status === 401) {
        throw new Error("로그인이 필요한 기능입니다.");
      } else if (e.response?.status === 415) {
        throw new Error("지정한 미디어 타입이 아닙니다.");
      } else {
        throw new Error(e.response?.data?.errorMessage || e.message);
      }
    }
    throw e;
  }
};
