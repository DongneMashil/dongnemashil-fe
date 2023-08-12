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

export type Review = {
  nickname: string;
  userprofileImgUrl: string | null;
  imgUrl: string | null;
  address: string;
  createdAt: string;
  reviewId: number;
};

export type GetMyReviewsResponse = {
  content: Review[];
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
  // 내 게시글과 내 좋아요 글 조회
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

export type Comment = {
  id: number;
  comment: string;
  nickname: string;
  profileImgUrl: string | null;
  createdAt: string;
  modifiedAt: string;
  reviewId: number;
};

export type GetMyCommentsResponse = {
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

export const getMyComments = async (): Promise<GetMyCommentsResponse> => {
  // 내댓글조회
  try {
    const response: AxiosResponse<GetMyCommentsResponse> =
      await axiosInstance.get(`/mypage/comments`);
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
    formedData.append(
      'nickname',
      new Blob([post.nickname], { type: 'text/plain' })
    );

    console.log(Array.from(formedData.entries()));

    const config = {
      method: 'patch',
      url: '/mypage',
      maxBodyLength: Infinity,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formedData,
    };

    const response = await axiosInstance.request(config);
    console.log(JSON.stringify(response) + '🏠');

    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};
