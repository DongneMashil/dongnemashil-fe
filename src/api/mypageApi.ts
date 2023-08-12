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
  reviewId: number;
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
  totalElements: number;
  totalPages: number;
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

export const postProfile = async (post: { imgUrl: File; nickname: string }) => {
  // 사진전송 및 게시
  try {
    const profileExt = post.imgUrl.name.split('.').pop();

    const formedData = new FormData();
    formedData.append(
      'file',
      post.imgUrl,
      `userProfile.${profileExt}` // 파일이름을 영문 단어로 통일
    );
    formedData.append('nickname', post.nickname);
    console.log(Array.from(formedData.entries()));

    const response = await axiosInstance.patch('/mypage', formedData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Content-Encoding': 'gzip',   // 추가함
      },
    });

    console.log(JSON.stringify(response) + '🏠');

    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};
