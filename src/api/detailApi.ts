import axios, { AxiosResponse } from 'axios';
import { axiosInstance, axiosWithToken } from './apiInstance';

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
  video_url: string;
  createdAt: string;
  nickname: string;
  profileImgUrl: string;
  address: string;
  comments: Comment[];
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
  } catch (e: any) {
    throw new Error(e.response?.data?.errorMessage || 'An error occurred');
  }
};

export const likeReview = async (
  reviewId: undefined | string
): Promise<boolean> => {
  try {
    const response: AxiosResponse<{ liked: boolean }> =
      await axiosWithToken.post(`/api/like/${reviewId}`);
    return response.data.liked;
  } catch (e: any) {
    throw new Error(e.response?.data?.errorMessage || 'An error occurred');
  }
};

export const checkLikeStatus = async (
  reviewId: undefined | string
): Promise<boolean> => {
  try {
    const response: AxiosResponse<{ liked: boolean }> =
      await axiosWithToken.get(`/api/like/${reviewId}`);
    return response.data.liked;
  } catch (e: any) {
    throw new Error(e.response?.data?.errorMessage || 'An error occurred');
  }
};
