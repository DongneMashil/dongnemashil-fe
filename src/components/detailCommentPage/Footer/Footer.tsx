import { Button, Input } from 'components/common';
import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

interface FooterProps {
  reviewId: string;
}
export const Footer = ({ reviewId }: FooterProps) => {
  const [comment, setComment] = React.useState('');
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  return (
    <StFooterContatiner>
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

export const StFooterContatiner = styled.footer`
  background-color: #fff;
  height: 75px;
  display: flex;
  justify-content: space-between;
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
