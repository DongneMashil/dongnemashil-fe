// import { Button } from 'components/common';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useRef } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

// import { useParams } from 'react-router-dom';
// import { ReviewDetailComment, getReviewDetailComment } from 'api/detailApi';
// import { useQuery } from '@tanstack/react-query';
interface CommentsProps {
  reviewId: string;
  $isCommentShow?: boolean;
}
export const Comments = ({
  reviewId = '1',
  $isCommentShow = false,
}: CommentsProps) => {
  if (!reviewId) {
    throw new Error('Review ID is missing');
  }
  const loader = useRef(null);
  interface Comment {
    id: number;
    profileImgUrl: string;
    nickname: string;
    comment: string;
  }

  const useBlacklistQuery = () => {
    // useInfiniteQuery에서 쓸 함수
    const fetchBlacklist = async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `/api/reviews/1/comments?page=${pageParam}`
      );
      const result = response.data;
      // axios로 받아온 데이터를 다음과 같이 변경!
      console.log('👀' + JSON.stringify(result));
      return {
        result: result.content,
        nextPage: pageParam + 1,
        isLast: result.last,
      };
    };

    const query = useInfiniteQuery(['blacklist'], fetchBlacklist, {
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
  const { data, fetchNextPage, hasNextPage, isLoading } = useBlacklistQuery();

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
      rootMargin: '0px', //나영님꺼 보고 수정함.
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
            .map((comment: Comment) => (
              <StDetailPageCommentItem key={comment.id}>
                <section>
                  <img src={comment.profileImgUrl} alt="프로필 이미지" />
                  <div className="nickname">{comment.nickname}</div>
                </section>
                <div className="content">{comment.comment}</div>
              </StDetailPageCommentItem>
            ))}
          {isLoading && <div>로딩중...</div>}

          {!hasNextPage && <div>마지막 페이지입니다.</div>}
          <button ref={loader}>reef</button>
          <StFooterSpacer />
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
  height: 100%;
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
