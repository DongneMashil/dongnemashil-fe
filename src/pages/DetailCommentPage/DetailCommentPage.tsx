// import { Button } from 'components/common';
import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { CommonLayout, NavBar } from 'components/layout';
import { Footer } from 'components/detailCommentPage';
import { useParams } from 'react-router-dom';
// import { ReviewDetailComment, getReviewDetailComment } from 'api/detailApi';
// import { useQuery } from '@tanstack/react-query';
export const DetailCommentPage = () => {
  const { reviewId } = useParams<{ reviewId: string | undefined }>();
  if (!reviewId) {
    throw new Error('Review ID is missing');
  }
  // const { data } = useQuery<ReviewDetailComment, Error>({
  //   queryKey: ['reviewDetailComment', reviewId],
  //   queryFn: () => getReviewDetailComment(reviewId),
  //   enabled: !!reviewId,
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  // });

  return (
    <>
      <CommonLayout
        footer={
          <Footer reviewId={reviewId!} />

          // <Footer>
          //   <StDetailPageCommentInput>
          //     <input placeholder="댓글을 입력해주세요" />
          //   </StDetailPageCommentInput>
          // </Footer>
        }
        header={
          <NavBar btnLeft={'back'} btnRight={'myPage'}>
            글 댓글 11개
          </NavBar>
        }
      >
        <StDetailPageComment>
          <StDetailPageCommentTitle>댓글</StDetailPageCommentTitle>

          <StDetailPageCommentList>
            {/* {data.comments.map((comment: Comment) => (
              <StDetailPageCommentItem key={comment.id}>
                <img src={comment.profileImgUrl} alt="프로필 이미지" />
                <div className="nickname">{comment.nickname}</div>
                <div className="content">{comment.comment}</div>
              </StDetailPageCommentItem>
            ))} */}
            <img src="https://source.unsplash.com/random" />
            <img src="https://source.unsplash.com/random" />
            <img src="https://source.unsplash.com/random" />{' '}
            <img src="https://source.unsplash.com/random" />
            <img src="https://source.unsplash.com/random" />
            <img src="https://source.unsplash.com/random" />{' '}
            <img src="https://source.unsplash.com/random" />
            <img src="https://source.unsplash.com/random" />
            <img src="https://source.unsplash.com/random" />
            <StFooterSpacer />
          </StDetailPageCommentList>
        </StDetailPageComment>
      </CommonLayout>
    </>
  );
};

export const StDetailPageCommentTitle = styled.div`
  width: 100%;
  height: 50px;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StDetailPageCommentInput = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StDetailPageCommentList = styled.div`
  width: 100%;
  // height: 4rem;
  display: flex;
  flex-direction: column;
`;
export const StDetailPageComment = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: calc(850px);
`;

export const StDetailPageCommentItem = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #000;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .nickname {
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
  }

  .content {
    font-size: 16px;
  }
`;

export const StFooterSpacer = styled.div`
  height: 50px;
`;
