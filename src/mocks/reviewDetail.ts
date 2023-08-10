import { rest } from 'msw';

export const commentsMock = Array.from({ length: 1000 }).map((_, id) => ({
  reviewId: Math.floor(id / 30) + 1, // 예를 들어, 20개의 댓글마다 reviewId가 증가하게 설정
  id: id + 1,
  comment: `댓글 내용 ${id + 1}`,
  nickname: `user${(id % 10) + 1}`, // 10명의 유저가 댓글을 작성
  profileImgUrl: 'https://source.unsplash.com/random',
  createdAt: new Date().toISOString(),
}));

export const reviewDetaiCommentHandler = rest.get(
  'https://testggyeon.shop/api/reviews/:reviewId/comments',
  (req, res, ctx) => {
    console.log(
      'MSW: Intercepted GET request to /api/reviews/:reviewId/comments'
    );
    const { reviewId } = req.params;
    const relevantComments = commentsMock.filter(
      (comment) => comment.reviewId === Number(reviewId)
    );
    const { searchParams } = req.url;
    const page = Number(searchParams.get('page') || 0);
    const size = 8;
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
  }
);

export interface ReviewDetail {
  id: number;
  content: string;
  mainImgUrl: string;
  subImgUrl: string[];
  videoUrl: string;
  profileImgUrl: string;
  address: string;
  title: string;
  likeCnt: number;
  likebool: boolean;
  commentCnt: number;
  createdAt: string;
  modifiedAt: string;
  tag: {
    id: number;
    name: string;
  }[];
}

// Mock data for the review details
export const reviewDetailsMock: ReviewDetail = {
  id: 123,
  content: 'This is the content.',
  mainImgUrl: 'https://example.com/image.jpg',
  subImgUrl: ['https://example.com/image.jpg', 'https://example.com/image.jpg'],
  videoUrl: 'https://example.com/video.mp4',
  profileImgUrl: 'https://example.com/profile.jpg',
  address: '123 Main St, City',
  title: 'Example Title',
  likeCnt: 42,
  likebool: true,
  commentCnt: 10,
  createdAt: '2023-08-05T10:30:00',
  modifiedAt: '2023-08-05T15:45:00',
  tag: [
    {
      id: 1,
      name: 'tag1',
    },
    {
      id: 2,
      name: 'tag2',
    },
  ],
};

// Handler for the review details
export const reviewDetailHandler = rest.get(
  'https://testggyeon.shop/api/reviews/:reviewId',
  (req, res, ctx) => {
    console.log('MSW: Intercepted GET request to /api/reviews/:reviewId');
    // const { reviewId } = req.params;

    // For this example, we are sending the same reviewDetailsMock for every request
    // In a more complex scenario, you might want to look up the review based on the reviewId
    return res(ctx.status(200), ctx.json(reviewDetailsMock), ctx.delay(500));
  }
);
