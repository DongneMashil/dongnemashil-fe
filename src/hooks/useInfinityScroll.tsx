import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import { useIntersect } from './useIntersect';

export interface ApiParams {
  q?: string;
  type?: string;
  tag?: string;
  page?: number;
  detailId?: string | number;
}

interface UseInfinityScrollProps<T> {
  getAPI: (params: ApiParams) => Promise<T>;
  queryKey?: string[];
  qValue?: string;
  typeValue?: string;
  detailIdValue?: string | number;
  tagValue?: string;
  pageValue?: number;
}

export const useInfinityScroll = <T extends { last: boolean }>({
  getAPI,
  queryKey = [],
  qValue = undefined,
  typeValue = undefined,
  detailIdValue = undefined,
  tagValue = undefined,
  pageValue = 1,
}: UseInfinityScrollProps<T>) => {
  const fetchItems = async (
    context: QueryFunctionContext<string[], ApiParams>
  ): Promise<T & { nextPage: number }> => {
    const { q, page, type, detailId, tag } = context.pageParam || {
      page: pageValue,
      q: qValue,
      type: typeValue,
      detailId: detailIdValue,
      tag: tagValue,
    };
    console.log(
      '🐶useInfinityScrollValues:',
      'q: ',
      q,
      'page: ',
      page,
      'type: ',
      type,
      'detailId: ',
      detailId,
      'tag: ',
      tag
    );

    // 기본적으로 page만 설정
    const params: ApiParams = {
      page,
      q,
      type,
      detailId,
      tag,
    };

    const response = await getAPI(params);

    console.log(JSON.stringify(response));

    return {
      ...response,
      nextPage: page! + 1,
    };
  };

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    queryKey,
    fetchItems,

    {
      getNextPageParam: (fetchResponse: T & { nextPage: number }) => {
        if (!fetchResponse.last)
          return {
            page: fetchResponse.nextPage,
            q: qValue,
          };
        return undefined;
      },
    }
  );

  const onIntersectCallback = () => {
    if (!isLoading) {
      fetchNextPage();
    }
  };

  const loaderRef = useIntersect(onIntersectCallback, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  });

  return { data, fetchNextPage, hasNextPage, isLoading, loaderRef };
};

// const { data, fetchNextPage, hasNextPage, isLoading, loaderRef } = useInfinityScroll<MyApiResponse>({
//     getAPI: fetchMyApi,
//     queryKey: ["myQueryKey"]
//   });
