import { CommonLayout, NavBar } from 'components/layout';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';
import { Comment, GetMyCommentResponse, getMyComments } from 'api/mypageApi';
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

  //useInfinityScroll 커스텀훅 사용
  const { data, hasNextPage, loaderRef, isLoading } =
    useInfinityScroll<GetMyCommentResponse>({
      getAPI: (params) => getMyComments(params?.page),
      queryKey: ['myComment', userState.nickName],
    });

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
        {isLoading && <div>로딩중...</div>}
        {hasNextPage ? (
          <>
            <div style={{ height: '300px' }} ref={loaderRef} />
          </>
        ) : (
          <div>마지막 댓글입니다.</div>
        )}
      </StMyCommentContainer>
    </CommonLayout>
  );
};
