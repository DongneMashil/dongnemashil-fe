import { AxiosResponse, AxiosError } from 'axios';
import { axiosInstance } from './api';

export type MyProfile = {
  email: string;
  profileImgUrl: string | null | undefined;
  nickname: string;
};

export const getMyProfile = async (): Promise<MyProfile> => {
  // 마이페이지 조회
  try {
    const response: AxiosResponse<MyProfile> = await axiosInstance.get(
      `/mypage`
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
  profileImgUrl: string | null;
  comment: string;
  createdAt: string;
  modifiedAt: string;
};

export type GetMyReviewsResponse = {
  content: Comment[];
  pageable: {
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
  };
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export const getMyReviews = async (
  type: string
): Promise<GetMyReviewsResponse> => {
  // 마이페이지 조회
  try {
    const response: AxiosResponse<GetMyReviewsResponse> =
      await axiosInstance.get(`/mypage/list?q=${type}`);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};
