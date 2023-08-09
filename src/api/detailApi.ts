import { AxiosResponse, AxiosError } from 'axios';
import { axiosInstance } from './api';

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

export type Comment = {
  id: number;
  nickname: string;
  profileImgUrl: string;
  comment: string;
};
export type ReviewDetailComment = {
  comments: Comment[] | null;
};

export const getComment = async (
  detailId: undefined | string
): Promise<ReviewDetail> => {
  // 댓글조회
  try {
    const response: AxiosResponse<ReviewDetail> = await axiosInstance.get(
      `/reviews/${detailId}/comments`
    );
    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};

export const postComment = async (
  reviewId: undefined | string,
  comment: string
): Promise<Comment> => {
  // 댓글작성
  try {
    const response: AxiosResponse<Comment> = await axiosInstance.post(
      `/reviews/${reviewId}/comments`,
      { comment }
    );
    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};

export const postLike = async (
  reviewId: undefined | string
): Promise<boolean> => {
  try {
    const response: AxiosResponse<{ liked: boolean }> =
      await axiosInstance.post(`/reviews/${reviewId}/likes`);
    return response.data.liked;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};
