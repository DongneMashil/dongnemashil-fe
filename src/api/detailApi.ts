import { AxiosResponse, AxiosError } from 'axios';
import { axiosInstance } from './api';

export type ReviewDetailResponse = {
  id: number;
  nickname: string;
  content: string;
  profileImgUrl: string | null;
  address: string;
  roadName: string;
  title: string;
  mainImgUrl: string | null;
  smallMainImgUrl: string | null;
  middleMainImgUrl: string | null;
  subImgUrl: string[];
  smallSubImgUrl: string[];
  middleSubImgUrl: string[];
  videoUrl: string | null;
  likeCnt: number;
  commentCnt: number;
  createdAt: string;
  modifiedAt: string;
  tag: {
    id: number;
    name: string;
  }[];
  likebool: boolean;
};

export const getReviewDetail = async (
  detailId: undefined | string
): Promise<ReviewDetailResponse> => {
  // 상세페이지 조회
  try {
    const response: AxiosResponse<ReviewDetailResponse> =
      await axiosInstance.get(`/reviews/${detailId}`);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};

export const deleteReviewDetail = async (detailId: undefined | string) => {
  // 상세페이지 조회
  try {
    const response = await axiosInstance.delete(`/reviews/${detailId}`);
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

type GetCommentResponse = {
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
export interface GetCommentParams {
  detailId: string | number;
  page?: number;
}

export const getComment = async (
  params: GetCommentParams
): Promise<GetCommentResponse> => {
  const { detailId, page } = params;
  try {
    const response: AxiosResponse<GetCommentResponse> = await axiosInstance.get(
      `/reviews/${detailId}/comments`,
      {
        params: {
          page: page,
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

export const postLikeOptimistic = async (
  reviewId: undefined | string,
  currentState: boolean // 현재 좋아요 상태를 받아옵니다.
): Promise<boolean> => {
  //  UI를 즉시 업데이트합니다. (낙관적 업데이트)
  const updatedState = !currentState;

  try {
    // 백엔드에 비동기 요청을 보냅니다.
    const response: AxiosResponse<{ message: string }> =
      await axiosInstance.post(`/reviews/${reviewId}/likes`);

    if (
      //예상과 반대의 값이 올때
      (updatedState === true && response.data.message === '좋아요 취소 완료') ||
      (updatedState === false && response.data.message === '좋아요 완료')
    ) {
      return currentState;
    }

    return updatedState;
  } catch (e: unknown) {
    // 서버와 통신이 어려울 경우 UI를 이전 상태로 롤백하고 사용자에게 오류 메시지를 표시합니다.
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response: AxiosResponse<{ message: string }> =
      await axiosInstance.delete(`/comments/${commentId}`);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};

export const editComment = async (commentId: string, comment: string) => {
  try {
    const response: AxiosResponse<Comment> = await axiosInstance.put(
      `/comments/${commentId}`,
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
