import axios, { AxiosResponse } from 'axios';

const baseUrl = process.env.REACT_APP_SERVER_API_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

const axiosWithToken = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

type Comment = {
  comment_id: number;
  username: string;
  profile_img: string;
  comment: string;
};

type HouseDetail = {
  id: number;
  content: string;
  img_url: string;
  video_url: string;
  createdAt: string;
  nickname: string;
  profileImgUrl: string;
  address: string;
  comments: Comment[];
};

export const getReviewDetail = async (
  detailId: number | string
): Promise<HouseDetail> => {
  // 상세페이지 조회
  try {
    const response: AxiosResponse<HouseDetail> = await axiosInstance.get(
      `/reviews/${detailId}`
    );
    return response.data;
  } catch (e: any) {
    throw new Error(e.response?.data?.errorMessage || 'An error occurred');
  }
};

export const likeReview = async (
  reviewId: number | string
): Promise<boolean> => {
  try {
    const response: AxiosResponse<{ liked: boolean }> =
      await axiosWithToken.post(`/api/like/${reviewId}`);
    return response.data.liked;
  } catch (e: any) {
    throw new Error(e.response?.data?.errorMessage || 'An error occurred');
  }
};

export const checkLikeStatus = async (
  reviewId: number | string
): Promise<boolean> => {
  try {
    const response: AxiosResponse<{ liked: boolean }> =
      await axiosWithToken.get(`/api/like/${reviewId}`);
    return response.data.liked;
  } catch (e: any) {
    throw new Error(e.response?.data?.errorMessage || 'An error occurred');
  }
};
