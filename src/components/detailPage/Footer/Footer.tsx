import { Button } from 'components/common';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

interface FooterProps {
  reviewId: string;
  likeCnt: number;
  commentCnt: number;
  onClick?: () => void;
}
export const Footer = ({
  reviewId,
  likeCnt = 0,
  commentCnt = 0,
  onClick,
}: FooterProps) => {
  const navigate = useNavigate();
  return (
    <StFooterContatiner>
      <StLike>👍 {likeCnt}</StLike>
      <StComment onClick={() => navigate(`/review/comments/${reviewId}`)}>
        💬{commentCnt}
      </StComment>
      <Button type={'normal'} onClick={onClick}>
        본문보기
      </Button>
    </StFooterContatiner>
  );
};

export const StFooterContatiner = styled.footer`
  z-index: 100;
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
