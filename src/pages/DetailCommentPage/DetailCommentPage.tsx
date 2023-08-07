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

  interface Comment {
    id: number;
    profileImgUrl: string;
    nickname: string;
    comment: string;
  }

  const data = {
    comments: [
      {
        id: 1,
        profileImgUrl: 'https://picsum.photos/200',
        nickname: '닉네임',
        comment:
          '댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.댓글입니다.',
      },
      {
        id: 2,
        profileImgUrl: 'https://picsum.photos/200',
        nickname: '닉네임',
        comment: '댓글입니다.',
      },
      {
        id: 3,
        profileImgUrl: 'https://picsum.photos/200',
        nickname: '닉네임',
        comment: '댓글입니다.',
      },
      {
        id: 4,
        profileImgUrl: 'https://picsum.photos/200',
        nickname: '닉네임',
        comment: '댓글입니다.',
      },
      {
        id: 5,
        profileImgUrl: 'https://picsum.photos/200',
        nickname: '닉네임',
        comment: '댓글입니다.',
      },
      {
        id: 6,
        profileImgUrl: 'https://picsum.photos/200',
        nickname: '닉네임',
        comment: '댓글입니다.',
      },
    ],
  };
  return (
    <CommonLayout
      footer={<Footer reviewId={reviewId!} />}
      header={
        <NavBar btnLeft={'back'} btnRight={'mypage'}>
          글 댓글 11개
        </NavBar>
      }
      hideHeader={false}
      backgroundColor="#f0f0f0"
    >
      <StDetailPageComment>
        <StDetailPageCommentList>
          {data.comments.map((comment: Comment) => (
            <StDetailPageCommentItem key={comment.id}>
              <section>
                <img src={comment.profileImgUrl} alt="프로필 이미지" />
                <div className="nickname">{comment.nickname}</div>
              </section>
              <div className="content">{comment.comment}</div>
            </StDetailPageCommentItem>
          ))}

          <StFooterSpacer />
        </StDetailPageCommentList>
      </StDetailPageComment>
    </CommonLayout>
  );
};

export const StDetailPageCommentInput = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StDetailPageCommentList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
