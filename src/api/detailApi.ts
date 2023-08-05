import { AxiosResponse, AxiosError } from 'axios';
import { axiosInstance, axiosWithToken } from './api';

type Comment = {
  comment_id: number;
  username: string;
  profile_img: string;
  comment: string;
};

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
  comments: Comment[] | null;
};

export const getReviewDetail = async (
  detailId: undefined | string
): Promise<ReviewDetail> => {
  // 상세페이지 조회
  try {
    const response: AxiosResponse<ReviewDetail> = await axiosInstance.get(
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

export const likeReview = async (
  reviewId: undefined | string
): Promise<boolean> => {
  try {
    const response: AxiosResponse<{ liked: boolean }> =
      await axiosWithToken.post(`/api/like/${reviewId}`);
    return response.data.liked;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};

export const checkLikeStatus = async (
  reviewId: undefined | string
): Promise<boolean> => {
  try {
    const response: AxiosResponse<{ liked: boolean }> =
      await axiosWithToken.get(`/api/like/${reviewId}`);
    return response.data.liked;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};
