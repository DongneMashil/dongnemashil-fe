import { NavBar } from 'components/layout';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { userProfileSelector } from 'recoil/userInfo';
import { Comment, getMyComments } from 'api/mypageApi';
import { ReactComponent as ChevronRight } from 'assets/icons/ChevronRight.svg';
import { ReactComponent as CommentS } from 'assets/icons/CommentS.svg';
import {
  StButton,
  StCounterWrapper,
  StMyCommentContainer,
  StMyCommentCounter,
  StMyCommentsLayout,
  StTarget,
} from './MyCommentsPage.styles';
import { useNavigate } from 'react-router-dom';
import { useIntersect } from 'hooks/useIntersect';
import { useInfiniteQuery } from '@tanstack/react-query';
import noUser from 'assets/images/NoUser.jpg';

export const MyCommentsPage = () => {
  const userState = useRecoilValue(userProfileSelector);
  const navigate = useNavigate();

  const useInfinityScroll = () => {
    const fetchItems = async ({ pageParam = 1 }) => {
      const response = await getMyComments(pageParam);
      console.log(JSON.stringify(response));
      return {
        ...response,
        isLast: response.last,
        nextPage: pageParam + 1,
      };
    };
    const query = useInfiniteQuery(
      ['myComment', userState.nickName],
      fetchItems,
      {
        getNextPageParam: (currentPage) => {
          if (!currentPage.isLast) return currentPage.nextPage;
          return undefined;
        },
      }
    );
    return query;
  };
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfinityScroll();
  // useIntersect 콜백함수
  const onIntersectCallback = () => {
    if (!isLoading) {
      fetchNextPage();
    }
  };
  // 커스텀훅 사용
  const loaderRef = useIntersect(onIntersectCallback, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  });

  return (
    <StMyCommentsLayout>
      <NavBar btnLeft="back" />
      {data ? (
        <StCounterWrapper>
          {' '}
          <StMyCommentCounter>
            {data.pages[0].totalElements}개의 댓글
          </StMyCommentCounter>
        </StCounterWrapper>
      ) : (
        <StMyCommentCounter>댓글이 없습니다🫥</StMyCommentCounter>
      )}
      <StMyCommentContainer>
        {data &&
          data.pages.map((page) =>
            page.content.map((item: Comment, index: number) => (
              <StButton
                key={index}
                onClick={() => navigate(`/review/${item.reviewId}`)}
              >
                <CommentS className="CommentS" />
                <p className="comment">{item.comment}</p>
                <img src={item.profileImgUrl || noUser} />
                <ChevronRight className="ChevronRight" />
              </StButton>
            ))
          )}
        {isLoading && <div>로딩중...</div>}
        {hasNextPage ? (
          <>
            <StTarget ref={loaderRef} />
          </>
        ) : (
          data && <StMyCommentCounter>마지막 댓글입니다.</StMyCommentCounter>
        )}
      </StMyCommentContainer>
    </StMyCommentsLayout>
  );
};
