import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
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

export interface NearbyReviewsList {
  id: number;
  nickname: string;
  roadName: string;
  smallMainImgUrl: string;
  latitude: number;
  longitude: number;
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
};

export const useFetchReviews = ({ q }: PaginationParams = {}) => {
  const tag = useRecoilValue(selectedTagSelector);
  const type = useRecoilValue(sortTypeSelector);

  const queryKey = reviewKeys.all;

  const queryFn = ({ pageParam = 1 }: QueryFunctionContext) =>
    axiosInstance.get<ReviewsAndPageable>(q ? '/search' : '/reviews', {
      params: { size: 6, type, page: pageParam, tag, q },
    });

  return useInfiniteQuery(queryKey, queryFn, {
    getNextPageParam: ({ data: { last, number } }) =>
      last ? undefined : number + 2,
  });
};

// 반경 검색
export const fetchNearbyReviews = async (
  lat: number,
  lng: number,
  rad: number = 2
): Promise<NearbyReviewsList[]> => {
  try {
    const response: AxiosResponse<NearbyReviewsList[]> =
      await axios.get(`${process.env.REACT_APP_SERVER_API_URL}/search/nearby?latitude=${lat}
    &longitude=${lng}&radius=${rad}`);
    console.log('fetchNearbyReviews data', response);
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data || e.message);
    }
    throw e;
  }
};
