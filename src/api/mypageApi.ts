import { AxiosResponse, AxiosError } from 'axios';
import { axiosWithToken } from './api';

export type ReviewDetail = {
  id: number;
  content: string;
  img_url: string;
  title: string;
  video_url: string | null;
  createdAt: string;
  nickname: string;
  profileImg_url: string;
  address: string;
  likeCnt: number;
  commentCnt: number;
  comments: unknown[] | null;
};

export const getMy = async (
  detailId: undefined | string
): Promise<ReviewDetail> => {
  // 상세페이지 조회
  try {
    const response: AxiosResponse<ReviewDetail> = await axiosWithToken.get(
      `/reviews/${detailId}`
    );
    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};
