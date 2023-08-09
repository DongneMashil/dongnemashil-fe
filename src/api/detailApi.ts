import axios, { AxiosResponse, AxiosError, AxiosInstance } from 'axios';
// import { axiosInstance } from './api';

const baseUrl = process.env.REACT_APP_SERVER_API_URL;
export const tempInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

export type ReviewDetail = {
  id: number;
  content: string;
  profileImgUrl: string | null;
  address: string;
  title: string;
  mainImgUrl: string | null;
  subImgUrl: string[];
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
): Promise<ReviewDetail> => {
  // 상세페이지 조회
  try {
    const response: AxiosResponse<ReviewDetail> = await tempInstance.get(
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
  profileImgUrl: string | null;
  comment: string;
  createdAt: string;
  modifiedAt: string;
};

export type ExtendedReviewDetailComment = {
  comments: Comment[] | null;
  pageable: ResponseData['pageable'];
  size: number;
  number: number;
  sort: ResponseData['sort'];
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

type ResponseData = {
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
export const getComment = async (
  detailId: undefined | string,
  page?: number
): Promise<ExtendedReviewDetailComment> => {
  try {
    const response: AxiosResponse<ResponseData> = await axios.get(
      `${process.env.REACT_APP_SERVER_API_URL}/reviews/${detailId}/comments`,
      {
        params: {
          page: page,
        },
      }
    );
    return {
      ...response.data,
      comments: response.data.content,
    };
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
    const response: AxiosResponse<Comment> = await tempInstance.post(
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

// export const postLike = async (
//   reviewId: undefined | string
// ): Promise<boolean> => {
//   try {
//     const response: AxiosResponse<{ liked: boolean }> = await tempInstance.post(
//       `/reviews/${reviewId}/likes`
//     );
//     return response.data.liked;
//   } catch (e: unknown) {
//     if (e instanceof AxiosError) {
//       throw new Error(e.response?.data?.errorMessage || e.message);
//     }
//     throw e;
//   }
// };
export const postLikeOptimistic = async (
  reviewId: undefined | string,
  currentState: boolean // 현재 좋아요 상태를 받아옵니다.
): Promise<boolean> => {
  // 1. UI를 즉시 업데이트합니다. (낙관적 업데이트)
  const updatedState = !currentState;

  try {
    // 2. 백엔드에 비동기 요청을 보냅니다.
    const response: AxiosResponse<{ message: string }> =
      await tempInstance.post(`/reviews/${reviewId}/likes`);

    if (
      //예상과 반대의 값이 올때
      (updatedState === true && response.data.message === '좋아요 취소 완료') ||
      (updatedState === false && response.data.message === '좋아요 완료')
    ) {
      console.log('좋아요 낙관적 업데이트 알림 : 예상과 반대의 값이 왔습니다.');
      return !updatedState; // 서버에서 온 값(updatedState의 반대)을 보냅니다.
    }

    return updatedState;
  } catch (e: unknown) {
    // 3. 요청이 실패하면 UI를 이전 상태로 롤백하고 사용자에게 오류 메시지를 표시합니다.
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};
