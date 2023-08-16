import { CommonLayout, NavBar } from 'components/layout';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';
import { Comment, GetMyCommentResponse, getMyComments } from 'api/mypageApi';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { useIntersect } from 'hooks/useIntersect';
import { ReactComponent as ChevronRight } from 'assets/icons/ChevronRight.svg';
import { ReactComponent as CommentS } from 'assets/icons/CommentS.svg';
import {
  StButton,
  StMyCommentContainer,
  StMyCommentCounter,
} from './MyCommentsPage.styles';
import { useInfinityScroll } from 'hooks';

export const MyCommentsPage = () => {
  const userState = useRecoilValue(userProfileSelector);

  const { data, hasNextPage, loaderRef } =
    useInfinityScroll<GetMyCommentResponse>({
      getAPI: getMyComments,
      queryKey: ['myComment', userState.nickName],
    });

  // const useInfinityScroll = () => {
  //   const fetchComment = async ({ pageParam = 1 }) => {
  //     const response = await getMyComments(pageParam);

  //     console.log(JSON.stringify(response));
  //     return {
  //       ...response,
  //       isLast: response.last,
  //       nextPage: pageParam + 1,
  //     };
  //   };

  //   const query = useInfiniteQuery(
  //     ['myComment', userState.nickName],
  //     fetchComment,
  //     {
  //       getNextPageParam: (currentPage) => {
  //         if (!currentPage.isLast) return currentPage.nextPage;
  //         return undefined;
  //       },
  //     }
  //   );
  //   return query;
  // };
  // const { data, fetchNextPage, hasNextPage, isLoading } = useInfinityScroll();

  // // useIntersect 콜백함수 (무한스크롤)
  // const onIntersectCallback = () => {
  //   if (!isLoading) {
  //     fetchNextPage();
  //   }
  // };

  // // 커스텀훅 사용
  // const loaderRef = useIntersect(onIntersectCallback, {
  //   root: null,
  //   rootMargin: '0px',
  //   threshold: 0.1,
  // });
  return (
    <CommonLayout header={<NavBar btnLeft="back" />} backgroundColor="#f5f5f5">
      {data ? (
        <StMyCommentCounter>
          {data.pages[0].totalElements}개의 댓글
        </StMyCommentCounter>
      ) : (
        <StMyCommentCounter>댓글이 없습니다🫥</StMyCommentCounter>
      )}
      <StMyCommentContainer>
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
