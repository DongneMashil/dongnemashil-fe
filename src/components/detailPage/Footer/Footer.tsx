import { Button } from 'components/common';
import React, { useCallback, useEffect, useState, Suspense } from 'react';
import { ReactComponent as Heart } from 'assets/icons/Heart.svg';
import { ReactComponent as FilledHeart } from 'assets/icons/HeartFilled.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/CommentS.svg';
import { ReactComponent as ChevronTop } from 'assets/icons/ChevronTop.svg';
import { ReactComponent as Close } from 'assets/icons/Close.svg';
// import { Comments } from '../Comments/Comments';
const Comments = React.lazy(() => import('../Comments/Comments'));
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
  //
  const pageShowHandler = useCallback(
    (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    },
    [location]
  );

  useEffect(() => {
    window.addEventListener('pageshow', pageShowHandler);
    return () => {
      window.removeEventListener('pageshow', pageShowHandler);
    };
  }, [pageShowHandler]);

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
        <StLike onClick={() => toggleLikeHandler()} aria-label="좋아요">
          {isLiked ? <FilledHeart /> : <Heart />}
          <p aria-label="좋아요수">{likeCnt}</p>
        </StLike>
        <StComment
          onClick={() => setIsCommentOpen(!isCommentOpen)}
          aria-label="댓글"
        >
          <CommentIcon className="CommentIcon" />{' '}
          <p aria-label="댓글수">{commentCount}</p>
        </StComment>
        {isCommentOpen ? (
          <Button
            type={'onlyText'}
            onClick={() => setIsCommentOpen(false)}
            aria-label="댓글닫기"
          >
            <Close />
          </Button>
        ) : (
          <Button
            type={'onlyText'}
            onClick={onClickHandler}
            aria-label="댓글보기"
          >
            <ChevronTop /> 댓글보기
          </Button>
        )}
      </StFooterButtonWrapper>

      {isCommentOpen && (
        <>
          <StFooterCommentSection>
            <Suspense fallback={<div>loading...</div>}>
              <Comments reviewId={reviewId} $isCommentShow={isCommentShow} />
            </Suspense>
          </StFooterCommentSection>
          <CommentInput reviewId={reviewId} $isCommentShow={isCommentShow} />
        </>
      )}
    </StFooterContatiner>
  );
};
