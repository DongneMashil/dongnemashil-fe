import { ThumbnailProps } from 'components/homePage';
import { rest } from 'msw';

export interface PaginationResponse<T> {
  contents: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}

export const commentsMock = Array.from({ length: 1000 }).map((_, id) => ({
  reviewId: Math.floor(id / 30) + 1, // 예를 들어, 20개의 댓글마다 reviewId가 증가하게 설정
  id: id + 1,
  comment: `댓글 내용 ${id + 1}`,
  nickname: `user${(id % 10) + 1}`, // 10명의 유저가 댓글을 작성
  profileImgUrl: 'https://source.unsplash.com/random',
  createdAt: new Date().toISOString(),
}));

export const result = Array.from(Array(1000).keys()).map(
  (id): ThumbnailProps => ({
    id,
    road_name: '서울숲로',
    img_url: 'https://source.unsplash.com/random',
    likeCnt: `120${id}`,
  })
);

export const handlers = [
  rest.get('/reviews', async (req, res, ctx) => {
    console.log('MSW: Intercepted GET request to /reviews');
    // const { searchParams } = req.url;
    // const size = Number(searchParams.get('size'));
    // const page = Number(searchParams.get('page'));
    const size = 10;
    const page = 0;
    const totalCount = result.length;
    const totalPages = Math.round(totalCount / size);

    return res(
      ctx.status(200),
      ctx.json<PaginationResponse<ThumbnailProps>>({
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
  rest.get('/api/reviews/:reviewId/comments', (req, res, ctx) => {
    console.log(
      'MSW: Intercepted GET request to /api/reviews/:reviewId/comments'
    );

    const { reviewId } = req.params;
    const relevantComments = commentsMock.filter(
      (comment) => comment.reviewId === Number(reviewId)
    );
    const { searchParams } = req.url;
    const page = Number(searchParams.get('page') || 0);
    const size = 8; // 하드코딩되어 있던 size 값을 조정했습니다.

    const paginatedComments = relevantComments.slice(
      page * size,
      (page + 1) * size
    );

    const totalPages = Math.ceil(relevantComments.length / size);

    return res(
      ctx.status(200),
      ctx.json({
        content: paginatedComments,
        pageable: {
          sort: {
            empty: true,
            unsorted: true,
            sorted: false,
          },
          offset: page * size,
          pageNumber: page,
          pageSize: size,
          unpaged: totalPages === 0,
          paged: totalPages > 0,
        },
        size: size,
        number: page,
        sort: {
          empty: true,
          unsorted: true,
          sorted: false,
        },
        numberOfElements: paginatedComments.length,
        first: page === 0,
        last: totalPages <= page,
        empty: paginatedComments.length === 0,
      }),
      ctx.delay(500)
    );
  }),
];
