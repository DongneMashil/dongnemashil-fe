import { Button } from 'components/common';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as Heart } from 'assets/icons/Heart.svg';
import { ReactComponent as FilledHeart } from 'assets/icons/HeartFilled.svg';
import { ReactComponent as Comment } from 'assets/icons/Comment.svg';
import { ReactComponent as Content } from 'assets/icons/Content.svg';
interface FooterProps {
  reviewId: string;
  likeCnt: number;
  commentCnt: number;
  onClick?: () => void;
  isLiked?: boolean;
}
export const Footer = ({
  reviewId,
  likeCnt = 0,
  commentCnt = 0,
  onClick,
  isLiked = false,
}: FooterProps) => {
  const navigate = useNavigate();
  return (
    <StFooterContatiner>
      <StLike>
        {isLiked ? <FilledHeart /> : <Heart />}
        {likeCnt}
      </StLike>
      <StComment onClick={() => navigate(`/review/comments/${reviewId}`)}>
        <Comment /> {commentCnt}
      </StComment>
      <Button type={'onlytext'} onClick={onClick}>
        <Content /> 본문 보기
      </Button>
    </StFooterContatiner>
  );
};

export const StFooterContatiner = styled.footer`
  z-index: 100;
  background-color: #fff;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 10px;
`;

export const StLike = styled.div`
  gap: 0.5rem;
  display: flex;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;
`;

export const StComment = styled.div`
  margin-left: 2rem;
  margin-right: auto;
  gap: 0.5rem;
  display: flex;
  align-items: center;
  padding-right: 10px;
  cursor: pointer;
`;
