import { Button, Input } from 'components/common';
import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

interface FooterProps {
  reviewId: string;
  $isCommentShow?: boolean;
}
export const CommentInput = ({
  reviewId,
  $isCommentShow = false,
}: FooterProps) => {
  const [comment, setComment] = React.useState('');
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  return (
    <StFooterContatiner $isCommentShow={$isCommentShow}>
      <StFooterWrapper>
        {' '}
        <Input
          placeholder="댓글을 입력해주세요"
          onChange={onChangeHandler}
          value={comment}
        />
        <Button
          type={'normal'}
          onClick={() => {
            console.log({ reviewId });
          }}
        >
          등록
        </Button>
      </StFooterWrapper>
    </StFooterContatiner>
  );
};

export const StFooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

export const StFooterContatiner = styled.footer<{ $isCommentShow: boolean }>`
  opacity: ${({ $isCommentShow }) => ($isCommentShow ? 1 : 0)};
  transition: all 0.1s ease-in-out;
  background-color: #fff;
  height: 75px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const StLike = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;
`;

export const StComment = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;
  cursor: pointer;
`;
