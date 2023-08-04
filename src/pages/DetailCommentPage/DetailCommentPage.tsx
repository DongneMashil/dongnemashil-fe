import { Button } from 'components/common';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
export const DetailCommentPage = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const navigate = useNavigate();
  const data = {
    id: 1,
    content: '본문본문이요본민잉본문이요본문ㅇ본문',
    img_url:
      'https://images.unsplash.com/photo-1690463230075-ce79152c2c1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    title: '제목이요제목제목제목',
    video_url: null,
    createdAt: '2021-03-21T14:48:00.000Z',
    nickname: '닉네임',
    profileImg_url:
      'https://media.suara.com/suara-partners/semarang/thumbs/336x189/2022/11/22/1-cat-g497210635-1920.jpg',
    address: '서울시 마포구 매봉산로 18',
    comments: [
      {
        comment_id: 1,
        username: '닉네11임',
        profile_img:
          'https://media.suara.com/suara-partners/semarang/thumbs/336x189/2022/11/22/1-cat-g497210635-1920.jpg',
        comment: '댓글입11니다',
      },
      {
        comment_id: 2,
        username: '닉네22임',
        profile_img:
          'https://media.suara.com/suara-partners/semarang/thumbs/336x189/2022/11/22/1-cat-g497210635-1920.jpg',
        comment: '댓글입니22다',
      },
      {
        comment_id: 3,
        username: '닉네33임',
        profile_img:
          'https://media.suara.com/suara-partners/semarang/thumbs/336x189/2022/11/22/1-cat-g497210635-1920.jpg',
        comment: '댓글입33니다',
      },
      {
        comment_id: 4,
        username: '닉네44임',
        profile_img:
          'https://media.suara.com/suara-partners/semarang/thumbs/336x189/2022/11/22/1-cat-g497210635-1920.jpg',
        comment: '댓글입니다44',
      },
    ],
  };
  return (
    <>
      <StDetailPageComment>
        <StDetailPageCommentTitle>댓글</StDetailPageCommentTitle>
        <StDetailPageCommentInput>
          <input placeholder="댓글을 입력해주세요" />
        </StDetailPageCommentInput>
        <StDetailPageCommentList>
          {data.comments.map((comment) => (
            <StDetailPageCommentItem key={comment.comment_id}>
              <StDetailPageCommentProfileImg
                src={comment.profile_img}
                alt="프로필 이미지"
              />
              <StDetailPageCommentNickname>
                {comment.username}
              </StDetailPageCommentNickname>
              <StDetailPageCommentContent>
                {comment.comment}
              </StDetailPageCommentContent>
            </StDetailPageCommentItem>
          ))}
          <Button
            type={'normal'}
            onClick={() => navigate(`/review/${reviewId}`)}
          >
            본문
          </Button>
        </StDetailPageCommentList>
      </StDetailPageComment>
    </>
  );
};

export const StDetailPageComment = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

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
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StDetailPageCommentItem = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #000;
`;

export const StDetailPageCommentProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const StDetailPageCommentNickname = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

export const StDetailPageCommentContent = styled.div`
  font-size: 16px;
`;
