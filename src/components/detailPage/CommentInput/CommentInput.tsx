import { useMutation } from '@tanstack/react-query';
import { postComment } from 'api/detailApi';
import { Button, Input } from 'components/common';
import { queryClient } from 'queries/queryClient';
import React, { useState } from 'react';
import { StFooterContatiner, StFooterWrapper } from './CommentInput.styles';

import { useRecoilValue } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';

interface FooterProps {
  reviewId: string;
  $isCommentShow?: boolean;
}
export const CommentInput = ({
  reviewId,
  $isCommentShow = false,
}: FooterProps) => {
  const [comment, setComment] = useState('');

  const commentMutation = useMutation(
    (newComment: string) => postComment(reviewId, newComment),
    {
      onSuccess: (data) => {
        console.log(data);
        setComment('');
        queryClient.invalidateQueries(['comment', reviewId]);
      },
      onError: (err) => {
        console.log(err);
        setComment('');
        alert('댓글 등록에 실패했습니다.');
      },
    }
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  // useQuery(['comment', reviewId], () => postComment(reviewId, comment), {
  //   enabled: isCommentPost,
  //   onSuccess: (data) => {
  //     console.log(data);
  //     setComment('');
  //     setIsCommentPost(false);
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //     setComment('');
  //     setIsCommentPost(false);
  //     alert('댓글 등록에 실패했습니다.');
  //   },
  // });
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(comment);
    commentMutation.mutate(comment);
  };
  const userState = useRecoilValue(userProfileSelector);
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
            <Button inputType="submit" type={'normal'} value="등록" />
          </>
        ) : (
          <>
            {' '}
            <Input
              placeholder="로그인 후 댓글 입력이 가능합니다."
              disabled={true}
            />
            <Button inputType="button" type={'normal'} url="/login">
              로그인
            </Button>
          </>
        )}
      </StFooterWrapper>
    </StFooterContatiner>
  );
};
