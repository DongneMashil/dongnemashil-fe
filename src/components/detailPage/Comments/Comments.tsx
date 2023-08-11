import { useInfiniteQuery } from '@tanstack/react-query';
import { getComment } from 'api/detailApi';
import SkeletonUI from 'components/common/SkeletonUI/SkeletonUI';
import React, { useEffect, useRef } from 'react';
import timeAgo from 'utils/timeAgo';
import {
  StDetailPageComment,
  StDetailPageCommentItem,
  StDetailPageCommentList,
} from './Comments.styles';

interface CommentsProps {
  reviewId: string;
  $isCommentShow?: boolean;
}
export const Comments = ({
  reviewId,
  $isCommentShow = false,
}: CommentsProps) => {
  if (!reviewId) {
    throw new Error('Review ID is missing');
  }
  const loader = useRef(null);
  const useInfinityScroll = () => {
    const fetchComment = async ({ pageParam = 1 }) => {
      const response = await getComment(reviewId, pageParam);
      console.log(JSON.stringify(response));
      return {
        result: response.content,
        nextPage: pageParam + 1,
        isLast: response.last,
      };
    };

    const query = useInfiniteQuery(['comment', reviewId], fetchComment, {
      getNextPageParam: (lastPage) => {
        if (!lastPage.isLast) return lastPage.nextPage;
        return undefined;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
    });

    return query;
  };
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfinityScroll();

  const handleLoadMore = (info: IntersectionObserverEntry[]) => {
    console.log(info); //이벤트 정보 출력
    const target = info[0];
    if (target.isIntersecting && !isLoading) {
      fetchNextPage();
    }
  };
  useEffect(() => {
    // Intersection Observer를 설정
    const options = {
      root: null, // viewport를 기준으로 함
      rootMargin: '0px', //감지위치
      threshold: 0.1, // target이 viewport의 100% 경계선을 넘어가면 콜백 실행
    };

    const observer = new IntersectionObserver(handleLoadMore, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [isLoading, hasNextPage]);

  return (
    <StDetailPageComment $isCommentShow={$isCommentShow}>
      {data && (
        <StDetailPageCommentList>
          {data.pages
            .flatMap((page) => page.result)
            .map((comment) => {
              if (!comment) return null;
              return (
                <StDetailPageCommentItem key={comment.id}>
                  <section>
                    <img
                      src={comment.profileImgUrl || ''}
                      alt="프로필 이미지"
                    />
                    <div className="nickname">{comment.nickname}</div>
                    <div className="date">{timeAgo(comment.createdAt)}</div>
                  </section>
                  <div className="content">{comment.comment}</div>
                </StDetailPageCommentItem>
              );
            })}

          {isLoading && <div>로딩중...</div>}

          {hasNextPage && (
            <>
              <SkeletonUI ref={loader} width="100%" height="80px" />
              <SkeletonUI width="100%" height="80px" />
              <SkeletonUI width="100%" height="80px" />
              <SkeletonUI width="100%" height="80px" />
            </>
          )}
        </StDetailPageCommentList>
      )}
    </StDetailPageComment>
  );
};
