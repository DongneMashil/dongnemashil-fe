import { Button } from 'components/common';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as Heart } from 'assets/icons/Heart.svg';
import { ReactComponent as FilledHeart } from 'assets/icons/HeartFilled.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/Comment.svg';
import { ReactComponent as ContentIcon } from 'assets/icons/Content.svg';
import { Comments } from '../Comments/Comments';
import { CommentInput } from '../CommentInput/CommentInput';
import { postLikeWithOptimisticUpdate } from 'api/detailApi';

interface FooterProps {
  reviewId: string;
  likeCnt: number;
  commentCnt: number;
  onClick?: () => void;
  isLiked?: boolean;
  // isCommentOpen?: boolean;
}
export const Footer = ({
  reviewId,
  likeCnt: initialLikeCnt = 0,
  commentCnt = 0,
  onClick,
  isLiked: initialIsLiked = false, // isCommentOpen = false,
}: FooterProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCnt, setLikeCnt] = useState(initialLikeCnt);
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

  const onLikeClickHandler = async () => {
    const previousIsLiked = isLiked; // 이전 좋아요 상태
    const optimisticLikeCnt = isLiked ? likeCnt - 1 : likeCnt + 1; // 낙관적 업데이트 값
    setIsLiked(!isLiked); // 낙관적 업데이트 실행
    setLikeCnt(optimisticLikeCnt); // 낙관적 업데이트 실행

    try {
      const result = await postLikeWithOptimisticUpdate(
        reviewId,
        previousIsLiked
      );
      if (result !== !previousIsLiked) {
        // API 응답과 낙관적 업데이트의 결과가 다르면 api기준으로 업데이트
        setIsLiked(result);
        setLikeCnt(result ? optimisticLikeCnt : likeCnt);
      }
    } catch (error) {
      setTimeout(() => {
        console.log('좋아요 처리 중 오류가 발생했습니다.'); // 오류 처리
        setIsLiked(previousIsLiked);
        setLikeCnt(likeCnt); // 원래의 좋아요 수로 되돌립니다.
      }, 1000); // 1초 후에 실행 (테스트시 너무 안보여서)
    }
  };

  return (
    <StFooterContatiner $isCommentOpen={isCommentOpen}>
      <StFooterButtonWrapper>
        <StLike onClick={onLikeClickHandler}>
          {isLiked ? <FilledHeart /> : <Heart />}
          {likeCnt}
        </StLike>
        <StComment onClick={() => setIsCommentOpen(!isCommentOpen)}>
          <CommentIcon /> {commentCnt}
        </StComment>
        {isCommentOpen ? (
          <Button type={'onlytext'} onClick={() => setIsCommentOpen(false)}>
            <ContentIcon /> 댓글 닫기
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
  padding: 0 10px;
  border-top: 1px solid #e9e9e9;
  overflow: scroll;
`;
