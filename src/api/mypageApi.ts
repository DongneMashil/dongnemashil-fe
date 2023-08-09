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

export const getMypage = async (
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

export type MyPageDetail = {
  detailsId: number;
  userId: number;
  content: string;
  imgUrl: string;
  videoUrl: string | null;
  createdAt: string;
  nickname: string;
  profileImgUrl: string;
};

export const getMyPageDetails = async (
  qValue: 'likes' | 'comments' | 'review'
): Promise<MyPageDetail[]> => {
  try {
    const response: AxiosResponse<{ selectList: MyPageDetail[] }> =
      await axiosInstance.get(`/mypage/list?q=${qValue}`);
    return response.data.selectList;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};
