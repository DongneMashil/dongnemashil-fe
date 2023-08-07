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
];
