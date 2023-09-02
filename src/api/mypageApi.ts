import { AxiosResponse, AxiosError } from 'axios';
import { axiosInstance } from './api';
import { tokenHandler } from './loginApi';

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

export type OtherUserProfile = {
  profileImgUrl: string | null | undefined;
};

export const getOtherUserProfile = async (
  nickname: string
): Promise<string> => {
  // 마이페이지 조회
  try {
    const response: AxiosResponse<string> = await axiosInstance.get(
      `/reviews/userimg`,
      {
        params: {
          nickname,
        },
      }
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
  userprofileUrl: string | null;
  imgUrl: string | null;
  roadName: string;
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
  q?: string,
  page?: number
): Promise<GetMyReviewsResponse> => {
  // 내 게시글과 내 좋아요 글 조회
  try {
    const response: AxiosResponse<GetMyReviewsResponse> =
      await axiosInstance.get(`/mypage/list`, {
        params: {
          q,
          page,
        },
      });
    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};

export const getOtherUserReviews = async (
  nickname?: string,
  page?: number
): Promise<GetMyReviewsResponse> => {
  // 내 게시글과 내 좋아요 글 조회
  try {
    const response: AxiosResponse<GetMyReviewsResponse> =
      await axiosInstance.get(`/reviews/user`, {
        params: {
          nickname,
          page,
        },
      });
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
  smallMainImgUrl: string | null;
  comment: string;
  createdAt: string;
  modifiedAt: string;
  reviewId: number;
};

export type GetMyCommentResponse = {
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
  totalPages: number;
  totalElements: number;
};

export const getMyComments = async (
  page?: number
): Promise<GetMyCommentResponse> => {
  try {
    const response: AxiosResponse<GetMyCommentResponse> =
      await axiosInstance.get(`/mypage/comments`, {
        params: {
          page: page,
        },
      });
    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};

export const postProfile = async (post: {
  imgUrl: File | null;
  nickname: string;
}) => {
  // 사진전송 및 게시
  try {
    const formedData = new FormData();
    if (post.imgUrl) {
      const profileExt = post.imgUrl.name.split('.').pop();
      formedData.append(
        'file',
        post.imgUrl,
        `userProfile.${profileExt}` // 파일이름을 영문 단어로 통일
      );
    }

    const jsonData = {
      nickname: post.nickname,
    };
    const blob = new Blob([JSON.stringify(jsonData)], {
      type: 'application/json',
    });
    formedData.append('nickname', blob);
    // formedData.append(
    //   'nickname',
    //   new Blob([post.nickname], { type: 'text/plain' })
    // );

    const config = {
      method: 'patch',
      url: '/mypage',
      maxBodyLength: Infinity,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formedData,
    };

    const response = await axiosInstance.request(config);

    //⬇️새로운 토큰으로 교체

    const accessToken = response.headers['authorization'].replace(
      'Bearer%20',
      ''
    );
    const refreshToken = response.headers['refreshtoken'].replace(
      'Bearer%20',
      ''
    );

    tokenHandler(accessToken, refreshToken);

    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};
