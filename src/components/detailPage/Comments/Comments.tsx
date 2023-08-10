// import { Button } from 'components/common';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getComment } from 'api/detailApi';
import SkeletonUI from 'components/common/SkeletonUI/SkeletonUI';
import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

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
    // useInfiniteQuery에서 쓸 함수
    const fetchComment = async ({ pageParam = 1 }) => {
      const response = await getComment(reviewId, pageParam);

      console.log('👀' + JSON.stringify(response));

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
    console.log('data.pages👁️' + JSON.stringify(data?.pages));

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
            .map((comment, index) => {
              if (!comment) return null; // 만약 comment가 null이라면, null을 반환합니다.
              return (
                <StDetailPageCommentItem key={comment.id}>
                  <section>
                    <img
                      src={comment.profileImgUrl || ''}
                      alt="프로필 이미지"
                    />
                    <div className="nickname">
                      {comment.nickname}
                      {index}
                    </div>
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
export const StDetailPageComment = styled.div<{ $isCommentShow: boolean }>`
  opacity: ${({ $isCommentShow }) => ($isCommentShow ? 1 : 0)};
  transition: all 0.1s ease-in-out;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: calc(850px);
`;
export const StDetailPageCommentList = styled.div`
  width: 100%;
  // height: 100%;  이거 넣으면 이상하게 레이아웃 깨짐(최하단 spacer가 높이가 0이됨)
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StDetailPageCommentInput = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StDetailPageCommentItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 1rem;
  border-radius: 0.875rem;
  background: #fbfbfb;

  section {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  img {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .nickname {
    font-size: 1rem;
    font-weight: 600;
    margin-right: 10px;
  }

  .content {
    line-height: 1.3;
  }
`;

export const StFooterSpacer = styled.div`
  height: 50px;
`;
