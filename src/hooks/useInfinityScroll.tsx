import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import { useIntersect } from './useIntersect';
import { useState } from 'react';

interface ApiParams {
  q?: string;
  page: number;
}

interface UseInfinityScrollProps<T> {
  getAPI: (params?: ApiParams) => Promise<T>;
  queryKey?: string[];
  qValue?: string;
}

export const useInfinityScroll = <T extends { last: boolean }>({
  getAPI,
  queryKey = [],
  qValue = undefined,
}: UseInfinityScrollProps<T>) => {
  const [paramQ, setParamQ] = useState<string | undefined>(qValue);

  const fetchItems = async (
    context: QueryFunctionContext<string[], ApiParams>
  ): Promise<T & { nextPage: number }> => {
    const { q, page } = context.pageParam || { page: 1 };
    setParamQ(q);
    const response = await getAPI({ page, q });

    console.log(JSON.stringify(response));

    return {
      ...response,
      nextPage: page + 1,
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
            q: paramQ,
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
