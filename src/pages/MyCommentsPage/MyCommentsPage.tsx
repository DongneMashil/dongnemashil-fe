import { CommonLayout, NavBar } from 'components/layout';
import React from 'react';
import { styled } from 'styled-components';

import { useRecoilValue } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';
import { Comment, getMyComments } from 'api/mypageApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useIntersect } from 'hooks/useIntersect';

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
      <StMyPageContainer>
        {data &&
          data.pages.map((page) =>
            page.content.map((item: Comment, index: number) => (
              <StButton key={index}>
                <p>{item.id}</p>
                <p>{item.nickname}</p>
                <p>{item.comment}</p>
                <p>{item.createdAt}</p>
                <img src={item.profileImgUrl || ''} />
              </StButton>
            ))
          )}
        {hasNextPage && (
          <>
            <div ref={loaderRef} />
          </>
        )}
      </StMyPageContainer>
    </CommonLayout>
  );
};

const StButton = styled.button`
  ${(props) => props.theme.floatingBox}
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  cursor: pointer;
  width: 95%;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  .title {
    font-size: 1.125rem;
    font-weight: 600;
  }
`;

const StMyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
  height: 100%;
`;
