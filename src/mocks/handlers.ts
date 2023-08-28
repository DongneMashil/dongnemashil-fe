import { ReviewsList } from 'api/reviewsApi';
import noUser from 'assets/images/nouser.gif';
import { rest } from 'msw';
import { reviewDetaiCommentHandler } from './reviewDetail';
import { mockMyCommentsHandler } from './myPage';

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
    middleMainImgUrl: 'https://source.unsplash.com/random',
    profileImgUrl: noUser,
    createdAt: '2시간전',
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
  mockMyCommentsHandler,
];
