import { queryClient } from 'queries/queryClient';
import React, { useState } from 'react';
import noUser from 'assets/images/NoUser.jpg';
import { editComment } from 'api/detailApi';
import {
  StCommentButton,
  StCommentHeader,
  StDetailPageCommentItem,
} from './CommentItem.styles';
import timeAgo from 'utils/timeAgo';

type CommentItemProps = {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  isEdit: { state: boolean; id: number };
  comment: {
    id: number;
    comment: string;
    nickname: string;
    profileImgUrl: string | null;
    createdAt: string;
  };
  userState: {
    nickName: string;
  };
  onEditStartHandler: (commentId: number) => void;
  onEditEndHandler: () => void;
  reviewId: string;
  setErrorMsg: (msg: string) => void;
  onDeleteCommentHandler: (commentId: number) => void;
};

export const CommentItem = React.forwardRef<HTMLDivElement, CommentItemProps>(
  (
    {
      isEdit,
      comment,
      userState,
      onEditStartHandler,
      onEditEndHandler,
      reviewId,
      setErrorMsg,
      onDeleteCommentHandler,
    },
    ref
  ) => {
    const [commentEdit, setCommentEdit] = useState<string>('');

    const onEditCommentHandler = (commentId: number) => {
      onEditStartHandler(commentId);
      setCommentEdit(comment.comment);
    };
    const onChangeCommentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCommentEdit(e.target.value);
    };

    const onEditSubmitHandler = () => {
      if (!commentEdit) {
        setErrorMsg('댓글 내용을 입력해주세요.');
        return;
      }
      editComment(isEdit.id.toString(), commentEdit).then(() => {
        onEditEndHandler();
        queryClient.invalidateQueries(['comment', reviewId]);
      });
    };

    return (
      <>
        <StDetailPageCommentItem>
          <StCommentHeader>
            <img src={comment.profileImgUrl || noUser} alt="프로필 이미지" />
            <div className="nickname">{comment.nickname}</div>
            <div className="date">{timeAgo(comment.createdAt)}</div>
            {userState.nickName === comment.nickname && (
              <>
                {isEdit.state && isEdit.id === comment.id ? (
                  <>
                    <StCommentButton
                      className="left"
                      onClick={onEditEndHandler}
                    >
                      취소
                    </StCommentButton>
                    <div className="divider">|</div>
                    <StCommentButton
                      className="done"
                      onClick={onEditSubmitHandler}
                      disabled={commentEdit === comment.comment}
                    >
                      완료
                    </StCommentButton>
                  </>
                ) : (
                  <>
                    <StCommentButton
                      className="left"
                      disabled={isEdit.state}
                      onClick={() => onEditCommentHandler(comment.id)}
                    >
                      수정
                    </StCommentButton>
                    <div className="divider">|</div>
                    <StCommentButton
                      className="right"
                      disabled={isEdit.state}
                      onClick={() => onDeleteCommentHandler(comment.id)}
                    >
                      삭제
                    </StCommentButton>
                  </>
                )}
              </>
            )}
          </StCommentHeader>
          {userState.nickName === comment.nickname &&
          isEdit.state &&
          isEdit.id === comment.id ? (
            <input
              type="text"
              value={commentEdit}
              onChange={onChangeCommentHandler}
            />
          ) : (
            <div className="content">{comment.comment}</div>
          )}
          {ref ? <div ref={ref}></div> : null}
        </StDetailPageCommentItem>
      </>
    );
  }
);

CommentItem.displayName = 'CommentItem';
