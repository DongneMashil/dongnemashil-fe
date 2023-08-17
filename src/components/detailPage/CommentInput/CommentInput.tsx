import { useMutation } from '@tanstack/react-query';
import { postComment } from 'api/detailApi';
import { Button, Input } from 'components/common';
import { queryClient } from 'queries/queryClient';
import React, { useState } from 'react';
import { StFooterContatiner, StFooterWrapper } from './CommentInput.styles';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';
import { commentAddListenerAtom } from 'recoil/commentAddListener/commentAddListenerAtom';

interface FooterProps {
  reviewId: string;
  $isCommentShow?: boolean;
}
export const CommentInput = ({
  reviewId,
  $isCommentShow = false,
}: FooterProps) => {
  const [comment, setComment] = useState('');
  const setCommentAddListener = useSetRecoilState(commentAddListenerAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userState = useRecoilValue(userProfileSelector);

  // 댓글 등록 함수
  const commentMutation = useMutation(
    (newComment: string) => postComment(reviewId, newComment),
    {
      onSuccess: () => {
        setComment('');
        queryClient.invalidateQueries(['comment', reviewId]);
        setCommentAddListener(true); // 댓글 추가된것을 감지 -> 스크롤 이벤트
      },
      onError: (err) => {
        console.log(err);
        setComment('');
        alert('댓글 등록에 실패했습니다.');
      },
    }
  );

  // 댓글 입력
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // 댓글 등록
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || !comment) {
      console.log('🟥댓글은 1초에 1개만 등록 가능합니다.');
      return;
    }

    setIsSubmitting(true);
    commentMutation.mutate(comment);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <StFooterContatiner $isCommentShow={$isCommentShow}>
      <StFooterWrapper onSubmit={onSubmitHandler}>
        {userState?.isLoggedIn ? (
          <>
            {' '}
            <Input
              placeholder="댓글을 입력해주세요"
              onChange={onChangeHandler}
              value={comment}
            />
            <Button
              inputType="submit"
              type={'authOutline'}
              value="등록"
              $height="2.5rem"
            />
          </>
        ) : (
          <>
            {' '}
            <Input
              type=""
              placeholder="로그인 후 댓글 입력이 가능합니다."
              disabled={true}
            />
            <Button
              inputType="button"
              type={'authOutline'}
              url="/login"
              $height="2.5rem"
            >
              로그인
            </Button>
          </>
        )}
      </StFooterWrapper>
    </StFooterContatiner>
  );
};
