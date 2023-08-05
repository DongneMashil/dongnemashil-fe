import { Button, Input } from 'components/common';
import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

interface FooterProps {
  reviewId: string;
}
export const Footer = ({ reviewId }: FooterProps) => {
  return (
    <StFooterContatiner>
      <Input placeholder="댓글을 입력해주세요" />
      <Button type={'normal'} onClick={() => {}}>
        본문보기{reviewId}
      </Button>
    </StFooterContatiner>
  );
};

export const StFooterContatiner = styled.footer`
  background-color: #fff;
  border-top: 1px solid #ccc;
  height: 50px;
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
