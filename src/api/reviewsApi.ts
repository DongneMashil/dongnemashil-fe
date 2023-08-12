import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query';
import { axiosInstance } from './api';

export interface ResponseData {
  content: ReviewsList[];
  pageable: Pageable;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

export interface ReviewsList {
  id: number;
  roadName: string;
  mainImgUrl: string;
  videoUrl: string | null;
  profileImgUrl: string | null;
  likeCnt: number;
  likebool: boolean;
}

export interface Pageable {
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

interface PaginationParams {
  type: string;
  tag: string | null;
}

const reviewKeys = {
  all: ['responseData'] as const,
  lists: () => [...reviewKeys.all, 'list'] as const,
  // list: (type: string) => [...reviewKeys.lists(), { type }] as const,
};

export const useFetchReviews = ({ type, tag }: PaginationParams) =>
  useInfiniteQuery(
    reviewKeys.lists(),
    ({ pageParam = 1 }: QueryFunctionContext) =>
      axiosInstance.get<ResponseData>('/reviews', {
        params: { type, page: pageParam, tag },
      }),
    {
      getNextPageParam: ({ data: { last, number } }) =>
        last ? undefined : number + 2,
    }
  );
