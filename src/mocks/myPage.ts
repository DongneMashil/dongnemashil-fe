import { rest } from 'msw';

// Generate comment mock data
export const commentsMockData = Array.from({ length: 1000 }).map((_, id) => ({
  id: id + 3,
  comment: 'Mock Comment ' + (id + 1),
  nickname: 'Nickname ' + ((id % 10) + 1),
  profileImgUrl:
    'https://dongnemashil-image.s3.ap-northeast-2.amazonaws.com/sampleProfile.jpg',
  createdAt: new Date().toISOString(),
  modifiedAt: new Date().toISOString(),
  reviewId: 1,
}));

export const mockMyCommentsHandler = rest.get(
  'https://testggyeon.shop/api/mypage/comments',
  (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page')) - 1 || 0;
    const size = 10;
    const totalCount = commentsMockData.length;
    const totalPages = Math.ceil(totalCount / size);

    const commentsForPage = commentsMockData.slice(
      page * size,
      (page + 1) * size
    );

    return res(
      ctx.status(200),
      ctx.json({
        content: commentsForPage,
        pageable: {
          sort: {
            empty: true,
            sorted: false,
            unsorted: true,
          },
          offset: page * size,
          pageNumber: page,
          pageSize: size,
          paged: true,
          unpaged: false,
        },
        size,
        number: page,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true,
        },
        numberOfElements: commentsForPage.length,
        first: page === 0,
        last: totalPages - 1 === page,
        empty: commentsForPage.length === 0,
      }),
      ctx.delay(500)
    );
  }
);
