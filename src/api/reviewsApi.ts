import { AxiosResponse, AxiosError } from 'axios';
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

// export const getReviews = async (
//   type: string,
//   page: number
// ): Promise<ReviewsList[]> => {
//   try {
//     const res: AxiosResponse<ResponseData> = await axiosInstance.get(
//       `/reviews?type=${type}&page=${page}`
//     );
//     return res.data.content;
//   } catch (e: unknown) {
//     if (e instanceof AxiosError) {
//       throw new Error(e.response?.data?.errorMessage || e.message);
//     }
//     throw e;
//   }
// };

// export const getMoreDatas = async (
//   type: string,
//   page: number
// ): Promise<ResponseData> => {
//   try {
//     const res: AxiosResponse<ResponseData> = await axiosInstance.get(
//       `/reviews?type=${type}&page=${page}`
//     );
//     return res.data;
//   } catch (e: unknown) {
//     if (e instanceof AxiosError) {
//       throw new Error(e.response?.data?.errorMessage || e.message);
//     }
//     throw e;
//   }
// };
