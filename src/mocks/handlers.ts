import { ReviewsList } from 'api/reviewsApi';
import { user } from 'assets/user';
import { rest } from 'msw';
import { reviewDetaiCommentHandler } from './reviewDetail';

export interface PaginationResponse<T> {
  contents: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}

export const result = Array.from(Array(1000).keys()).map(
  (id): ReviewsList => ({
    id,
    roadName: '서울숲로',
    mainImgUrl: 'https://source.unsplash.com/random',
    videoUrl:
      'https://dongnemashil-image.s3.ap-northeast-2.amazonaws.com/f8b850ad-a2b6-4f56-a1e2-a6b5c8dc382c-KakaoTalk_Video_2023-08-09-15-47-34.mp4',
    profileImgUrl: user,
    likeCnt: 1200,
    likebool: false,
  })
);

export const handlers = [
  rest.get('/reviews', async (req, res, ctx) => {
    console.log('MSW: Intercepted GET request to /reviews');
    // const { searchParams } = req.url;
    // const type = searchParams.get('type');
    const page = 0;
    const size = 10;
    const totalCount = result.length;
    const totalPages = Math.round(totalCount / size);

    return res(
      ctx.status(200),
      ctx.json<PaginationResponse<ReviewsList>>({
        contents: result.slice(page * size, (page + 1) * size),
        pageNumber: page,
        pageSize: size,
        totalPages,
        totalCount,
        isLastPage: totalPages <= page,
        isFirstPage: page === 0,
      }),
      ctx.delay(500)
    );
  }),
  reviewDetaiCommentHandler, //태현 test용
  // reviewDetailHandler, //태현 test용
];
