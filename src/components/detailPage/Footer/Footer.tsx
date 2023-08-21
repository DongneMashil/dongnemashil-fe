import { Button } from 'components/common';
import React, { useCallback, useEffect, useState } from 'react';
import { ReactComponent as Heart } from 'assets/icons/Heart.svg';
import { ReactComponent as FilledHeart } from 'assets/icons/HeartFilled.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/CommentS.svg';
import { ReactComponent as ChevronTop } from 'assets/icons/ChevronTop.svg';
import { ReactComponent as Close } from 'assets/icons/Close.svg';
import { Comments } from '../Comments/Comments';
import { CommentInput } from '../CommentInput/CommentInput';
import { useLike } from 'hooks';
import { useRecoilValue } from 'recoil';
import { commentCountAtom } from 'recoil/commentCount/commentCountAtom';
import {
  StComment,
  StFooterButtonWrapper,
  StFooterCommentSection,
  StFooterContatiner,
  StLike,
} from './Footer.styles';

interface FooterProps {
  reviewId: string;
  likeCnt: number;
  isLiked: boolean;
}
export const Footer = ({
  reviewId,
  likeCnt: initialLikeCnt,
  isLiked: initialIsLiked,
}: FooterProps) => {
  const commentCount = useRecoilValue(commentCountAtom);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isCommentShow, setIsCommentShow] = useState(false);

  // 댓글창 보이는 애니메이션
  useEffect(() => {
    if (isCommentOpen) {
      setTimeout(() => {
        setIsCommentShow(true);
      }, 150); // 애니메이션 시간 (겹쳐지게 보이는 부분 막기 위함)
    } else {
      setIsCommentShow(false);
    }
  }, [isCommentOpen]);

  const onClickHandler = useCallback(() => {
    if (isCommentOpen) {
      setIsCommentOpen(false);
    } else {
      setIsCommentOpen(true);
    }
  }, []);

  const { isLiked, likeCnt, toggleLikeHandler } = useLike({
    reviewId,
    initialIsLiked,
    initialLikeCnt,
  });

  return (
    <StFooterContatiner $isCommentOpen={isCommentOpen}>
      <StFooterButtonWrapper>
        <StLike onClick={() => toggleLikeHandler()}>
          {isLiked ? <FilledHeart /> : <Heart />}
          {likeCnt}
        </StLike>
        <StComment onClick={() => setIsCommentOpen(!isCommentOpen)}>
          <CommentIcon className="CommentIcon" /> {commentCount}
        </StComment>
        {isCommentOpen ? (
          <Button type={'onlyText'} onClick={() => setIsCommentOpen(false)}>
            <Close />
          </Button>
        ) : (
          <Button type={'onlyText'} onClick={onClickHandler}>
            <ChevronTop /> 댓글보기
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
