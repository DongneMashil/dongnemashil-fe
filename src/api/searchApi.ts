import { axiosInstance } from './axiosInstance';
import { AxiosResponse } from 'axios';

type SearchQuery = {
  search: string;
  tags: string[]; // 0~3개의 태그를 가질 수 있는 배열
};

type SearchItem = {
  detailsId: number;
  userId: number;
  content: string;
  imgUrl: string;
  videoUrl: string;
  createdAt: string;
  nickname: string;
  profileImgUrl: string;
};

type SearchResult = {
  selectList: SearchItem[];
};
// 나머지 타입은 이전과 동일하므로 생략

export const searchReviews = async (
  query: SearchQuery
): Promise<SearchResult> => {
  // axios GET 요청에서 params는 객체 형태로 전달되므로,
  // tags 배열을 개별 파라미터로 전달하기 위해 spread operator를 사용합니다.
  const params = {
    search: query.search,
    tag1: query.tags[0], // 배열에 값이 없으면 undefined가 전달됩니다.
    tag2: query.tags[1],
    tag3: query.tags[2],
  };

  try {
    const response: AxiosResponse<SearchResult> = await axiosInstance.get(
      `/api/search`,
      { params }
    );
    return response.data;
  } catch (e: any) {
    throw new Error(e.response?.data?.errorMessage || 'An error occurred');
  }
};
