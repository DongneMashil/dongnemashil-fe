import { Button } from 'components/common';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as Heart } from 'assets/icons/Heart.svg';
import { ReactComponent as FilledHeart } from 'assets/icons/HeartFilled.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/Comment.svg';
import { ReactComponent as ContentIcon } from 'assets/icons/Content.svg';
import { Comments } from '../Comments/Comments';
import { CommentInput } from '../CommentInput/CommentInput';
import { useLike } from 'hooks';

interface FooterProps {
  reviewId: string;
  likeCnt: number;
  commentCnt: number;
  onClick?: () => void;
  isLiked: boolean;
}
export const Footer = ({
  reviewId,
  likeCnt: initialLikeCnt,
  commentCnt = 0,
  onClick,
  isLiked: initialIsLiked,
}: FooterProps) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isCommentShow, setIsCommentShow] = useState(false);
  useEffect(() => {
    if (isCommentOpen) {
      console.log('reviewIdonFooter', reviewId); //완료후 제거
      setTimeout(() => {
        setIsCommentShow(true);
      }, 150);
    } else {
      setIsCommentShow(false);
    }
  }, [isCommentOpen]);

  const { isLiked, likeCnt, toggleLikeHandler } = useLike({
    reviewId,
    initialIsLiked,
    initialLikeCnt,
  });

  return (
    <StFooterContatiner $isCommentOpen={isCommentOpen}>
      <StFooterButtonWrapper>
        <StLike onClick={toggleLikeHandler}>
          {isLiked ? <FilledHeart /> : <Heart />}
          {likeCnt}
        </StLike>
        <StComment onClick={() => setIsCommentOpen(!isCommentOpen)}>
          <CommentIcon /> {commentCnt}
        </StComment>
        {isCommentOpen ? (
          <Button type={'onlytext'} onClick={() => setIsCommentOpen(false)}>
            ✕
          </Button>
        ) : (
          <Button type={'onlytext'} onClick={onClick}>
            <ContentIcon /> 본문 보기
          </Button>
        )}
      </StFooterButtonWrapper>

      {isCommentOpen && (
        <>
          <StFooterCommentSection>
            <Comments reviewId={reviewId} $isCommentShow={isCommentShow} />
          </StFooterCommentSection>
          <CommentInput reviewId={reviewId} $isCommentShow={isCommentShow} />
        </>
      )}
    </StFooterContatiner>
  );
};

export const StFooterContatiner = styled.footer<{ $isCommentOpen: boolean }>`
  z-index: 100;
  border-radius: 0.875rem 0.875rem 0rem 0rem;

  background-color: #fff;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  height: ${(props) => (props.$isCommentOpen ? '595px' : '50px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  transition: all 0.4s;
  @media (max-height: 850px) {
    height: ${(props) => (props.$isCommentOpen ? '75vh' : '50px')};
  }
`;

export const StFooterButtonWrapper = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
export const StFooterCommentSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  height: 100%;
  padding: 10px 10px;
  border-top: 1px solid #e9e9e9;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
