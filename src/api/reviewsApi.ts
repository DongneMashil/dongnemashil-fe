import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query';
import { axiosInstance } from './api';
import { useRecoilValue } from 'recoil';
import {
  selectedTagSelector,
  sortTypeSelector,
} from 'recoil/reviewsQuery/reviewsQuery';

export interface ReviewsAndPageable {
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
  totalElements?: number;
  totalPages?: number;
}

export interface ReviewsList {
  id: number;
  roadName: string;
  middleMainImgUrl: string;
  smallMainImgUrl?: string;
  profileImgUrl: string | null;
  createdAt: string;
  likeCnt: number;
  likebool: boolean;
  address?: string;
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
  q?: string | null;
}

const reviewKeys = {
  all: ['responseData'] as const,
  lists: () => [...reviewKeys.all, 'list'] as const,
  // list: (type: string) => [...reviewKeys.lists(), { type }] as const,
};

export const useFetchReviews = ({ q }: PaginationParams = {}) => {
  const tag = useRecoilValue(selectedTagSelector);
  const type = useRecoilValue(sortTypeSelector);

  const queryKey = reviewKeys.all;

  const queryFn = ({ pageParam = 1 }: QueryFunctionContext) =>
    axiosInstance.get<ReviewsAndPageable>(q ? '/search' : '/reviews', {
      params: { type, page: pageParam, tag, q },
    });

  return useInfiniteQuery(queryKey, queryFn, {
    getNextPageParam: ({ data: { last, number } }) =>
      last ? undefined : number + 2,
  });
};
