import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { deleteComment, editComment, getComment } from 'api/detailApi';
import noUser from 'assets/images/NoUser.jpg';
import React, { useEffect, useRef, useState } from 'react';
import timeAgo from 'utils/timeAgo';
import {
  StDetailPageComment,
  StDetailPageCommentItem,
  StDetailPageCommentList,
} from './Comments.styles';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userProfileSelector } from 'recoil/userInfo';
import { queryClient } from 'queries/queryClient';
import { commentCountAtom } from 'recoil/commentCount/commentCountAtom';
import { commentAddListenerAtom } from 'recoil/commentAddListener/commentAddListenerAtom';
import { useIntersect } from 'hooks/useIntersect';
import { Modal, StLoadingSpinner } from 'components/common';

interface CommentsProps {
  reviewId: string;
  $isCommentShow?: boolean;
}
export const Comments = ({
  reviewId,
  $isCommentShow = false,
}: CommentsProps) => {
  const userState = useRecoilValue(userProfileSelector);
  const setCommentCount = useSetRecoilState(commentCountAtom);
  const [commentAddListener, setCommentAddListener] = useRecoilState(
    commentAddListenerAtom
  );
  const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] =
    useState(false);
  const latestCommentRef = useRef(null);
  // const loader = useRef(null);
  const [deleteCommentId, setDeleteCommentId] = useState<number>(0);
  const useInfinityScroll = () => {
    const fetchComment = async ({ pageParam = 1 }) => {
      const response = await getComment({
        detailId: reviewId,
        page: pageParam,
      });
      setCommentCount(Number(response.totalElements)); // Recoil 상태 업데이트

      return {
        result: response.content,
        nextPage: pageParam + 1,
        isLast: response.last,
      };
    };

    const query = useInfiniteQuery(['comment', reviewId], fetchComment, {
      getNextPageParam: (lastPage) => {
        if (!lastPage.isLast) return lastPage.nextPage;
        return undefined;
      },
      refetchOnWindowFocus: true, // 예: 창에 포커스가 갔을 때만 재요청하도록 설정
      refetchOnMount: false,
      refetchOnReconnect: true,
      retry: false,
      staleTime: 10000, // 10초 동안 데이터는 fresh 상태를 유지, 무분별한 요청을 막기 위함.
      cacheTime: 600000, // 10분 동안 데이터를 캐시에 저장
    });
    return query;
  };
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } =
    useInfinityScroll();

  // useIntersect 콜백함수
  const onIntersectCallback = () => {
    if (!isLoading) {
      fetchNextPage();
    }
  };

  // 커스텀훅 사용
  const loaderRef = useIntersect(onIntersectCallback, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  });

  useEffect(() => {
    if (commentAddListener) {
      if (hasNextPage) {
        //다음 페이지가 있는경우, 마지막 항목에 있는 Ref가 없으므로
        fetchNextPage(); // 댓글이 새로 추가되었을 때, 마지막페이지까지 모두 불러오기
      } else if (!isFetching && latestCommentRef.current) {
        const element: HTMLElement = latestCommentRef.current as HTMLElement;
        element.scrollIntoView({ behavior: 'smooth' });
        setCommentAddListener(false); // 상태를 다시 초기화
      }
    }
  }, [commentAddListener, hasNextPage, isFetching, data]);

  const deleteCommentMutation = useMutation(deleteComment, {
    onSuccess: () => {
      // 성공적으로 댓글이 삭제된 후에는 다시 댓글 목록을 불러옵니다.
      // 이 때, 기존 댓글 목록 캐시를 무효화하여 새로 불러올 수 있습니다.
      queryClient.invalidateQueries(['comment', reviewId]);
    },
  });
  // const onDeleteCommentHandler = (commentId: number) => {
  //   deleteCommentMutation.mutate(String(commentId)); // API 요청을 발생시키기 위해 mutate를 호출합니다.
  // };
  const [isEdit, setIsEdit] = useState({ state: false, id: 0, comment: '' });
  const onEditCommentHandler = (commentId: number, comment: string) => {
    setIsEdit({ state: true, id: commentId, comment });
    console.log('commentId', commentId);
    console.log('comment', comment);
  };
  const onChangeCommentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEdit({ ...isEdit, comment: e.target.value });
  };
  const onEditEndHandler = () => {
    setIsEdit({ state: false, id: 0, comment: '' });
  };

  const onEditSubmitHandler = () => {
    if (!isEdit.comment) {
      alert('댓글을 입력해주세요');
      return;
    }
    editComment(isEdit.id.toString(), isEdit.comment).then(() => {
      onEditEndHandler();
      queryClient.invalidateQueries(['comment', reviewId]);
    });
  };

  const onDeleteCommentHandler = (commentId: number) => {
    setDeleteCommentId(commentId);
    setIsDeleteCommentModalOpen(true);
  };

  return (
    <StDetailPageComment $isCommentShow={$isCommentShow}>
      {data && (
        <StDetailPageCommentList>
          {data.pages
            .flatMap((page) => page.result)
            .map((comment, index, array) => {
              if (!comment) return null;
              const isLastComment = index === array.length - 1;

              return (
                <StDetailPageCommentItem
                  key={comment.id}
                  ref={isLastComment ? latestCommentRef : null}
                >
                  <section>
                    <img
                      src={comment.profileImgUrl || noUser}
                      alt="프로필 이미지"
                    />
                    <div className="nickname">{comment.nickname}</div>
                    <div className="date">{timeAgo(comment.createdAt)}</div>
                    {userState.nickName === comment.nickname && (
                      <>
                        {isEdit.state && isEdit.id === comment.id ? (
                          <>
                            <button
                              className="center"
                              onClick={onEditSubmitHandler}
                            >
                              수정 완료
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="left"
                              disabled={isEdit.state}
                              onClick={() =>
                                onEditCommentHandler(
                                  comment.id,
                                  comment.comment
                                )
                              }
                            >
                              수정
                            </button>
                            <div className="divider">|</div>
                            <button
                              className="right"
                              disabled={isEdit.state}
                              onClick={() => onDeleteCommentHandler(comment.id)}
                            >
                              삭제
                            </button>
                            <Modal
                              isOpen={isDeleteCommentModalOpen}
                              onSubmitText="삭제"
                              title="삭제"
                              firstLine="삭제된 댓글은 복구할 수 없습니다."
                              secondLine="삭제하시겠습니까?"
                              onSubmitHandler={() => {
                                deleteCommentMutation.mutate(
                                  String(deleteCommentId)
                                );
                                setIsDeleteCommentModalOpen(false);
                              }}
                              onCloseHandler={() =>
                                setIsDeleteCommentModalOpen(false)
                              }
                            />
                          </>
                        )}
                      </>
                    )}
                  </section>
                  {userState.nickName === comment.nickname &&
                  isEdit.state &&
                  isEdit.id === comment.id ? (
                    <input
                      type="text"
                      value={isEdit.comment}
                      onChange={onChangeCommentHandler}
                    />
                  ) : (
                    <div className="content">{comment.comment}</div>
                  )}
                </StDetailPageCommentItem>
              );
            })}

          {isLoading && <div>로딩중...</div>}

          {hasNextPage && <StLoadingSpinner ref={loaderRef} />}
        </StDetailPageCommentList>
      )}
    </StDetailPageComment>
  );
};
export default Comments;
