import { AxiosResponse, AxiosError } from 'axios';
import { axiosInstance } from './api';

interface ResponseData {
  content: ReviewsList[];
  pageable: {
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
  };
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
  img_url: string;
  profileImg_url: string;
  likeCnt: number;
  tag: string;
}

export const getReviews = async (
  type: string,
  page: number
): Promise<ReviewsList[]> => {
  try {
    const res: AxiosResponse<ResponseData> = await axiosInstance.get(
      `/reviews?type=${type}&page=${page}`
    );
    return res.data.content;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data?.errorMessage || e.message);
    }
    throw e;
  }
};
