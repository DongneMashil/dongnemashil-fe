import { CommonLayout, NavBar } from 'components/layout';
import React from 'react';
import { styled } from 'styled-components';

import { useRecoilValue } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';
import { Comment, getMyComments } from 'api/mypageApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useIntersect } from 'hooks/useIntersect';
import { ReactComponent as ChevronRight } from 'assets/icons/ChevronRight.svg';
import { ReactComponent as CommentS } from 'assets/icons/CommentS.svg';

export const MyCommentsPage = () => {
  const userState = useRecoilValue(userProfileSelector);
  // const { data } = useQuery<GetMyCommentResponse, Error>({
  //   queryKey: ['mycomments', userState.nickName],
  //   queryFn: () => getMyComments(),
  //   enabled: userState.isLoggedIn,
  //   onSuccess: (data: GetMyCommentResponse) => {
  //     console.log('🇨🇦' + data);
  //   },
  //   onError: (error: Error) => {
  //     console.log('🎁' + error);
  //   },
  // });

  const useInfinityScroll = () => {
    const fetchComment = async ({ pageParam = 1 }) => {
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
      fetchComment,
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
    <CommonLayout header={<NavBar />} backgroundColor="#f5f5f5">
      {data && (
        <StMyCommentCounter>
          {data.pages[0].totalElements}개의 댓글
        </StMyCommentCounter>
      )}
      <StMyCommentContainer>
        {' '}
        {data &&
          data.pages.map((page) =>
            page.content.map((item: Comment, index: number) => (
              <StButton key={index}>
                {' '}
                <CommentS className="CommentS" />
                <p className="comment">{item.comment}</p>
                <img src={item.profileImgUrl || ''} />
                <ChevronRight className="ChevronRight" />
              </StButton>
            ))
          )}
      </StMyCommentContainer>

      {hasNextPage && (
        <>
          <div ref={loaderRef} />
        </>
      )}
    </CommonLayout>
  );
};

const StMyCommentCounter = styled.div`
  color: rgb(131, 131, 131);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 1rem;
`;

const StButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
  width: 100%;
  border-bottom: 1px solid rgb(226, 226, 226);
  padding: 0.7rem 1.5rem;
  img {
    aspect-ratio: 1 / 1;
    margin-right: 0.2rem;
    margin-left: auto;
    width: 4.375rem;
    height: 4.375rem;
    border-radius: 0.5625rem;
  }
  .CommentS {
    width: 0.8125rem;
    height: 0.82806rem;
    flex-shrink: 0;
  }
  .ChevronRight {
    width: 0.47606rem;
    height: 1.0625rem;
    flex-shrink: 0;
  }
`;

const StMyCommentContainer = styled.div`
  width: 100%;
  background-color: white;
  margin-bottom: 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  border-radius: 0.8rem;
  padding: 0rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
