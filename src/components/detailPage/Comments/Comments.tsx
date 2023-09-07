import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { deleteComment, getComment } from 'api/detailApi';
import React, { useEffect, useRef, useState } from 'react';
import {
  StDetailPageComment,
  StDetailPageCommentList,
  StEmptyComment,
} from './Comments.styles';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userProfileSelector } from 'recoil/userInfo';
import { queryClient } from 'queries/queryClient';
import { commentCountAtom } from 'recoil/commentCount/commentCountAtom';
import { commentAddListenerAtom } from 'recoil/commentAddListener/commentAddListenerAtom';
import { useIntersect } from 'hooks/useIntersect';
import { Modal, StLoadingSpinner } from 'components/common';
import { ReactComponent as DongDong } from 'assets/logo/DongDong.svg';
import { CommentItem } from '../CommentItem/CommentItem';

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
  const [errorMsg, setErrorMsg] = useState(''); // 에러 메시지를 저장하는 상태
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
        empty: response.empty,
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

  const [isEdit, setIsEdit] = useState({ state: false, id: 0 });

  const onEditEndHandler = () => {
    setIsEdit({ state: false, id: 0 });
  };

  const onEditStartHandler = (commentId: number) => {
    setIsEdit({ state: true, id: commentId });
  };

  const onCloseErrorModalHandler = () => {
    setErrorMsg('');
  };
  const onDeleteCommentHandler = (commentId: number) => {
    setDeleteCommentId(commentId);
    setIsDeleteCommentModalOpen(true);
  };

  return (
    <div>
      <StDetailPageComment $isCommentShow={$isCommentShow}>
        {data && (
          <StDetailPageCommentList className="scrollable">
            {data.pages[0].empty && (
              <StEmptyComment>
                <DongDong className="dongdong" />
                <p className="text">첫 댓글을 남겨주세요!</p>
              </StEmptyComment>
            )}
            {data.pages
              .flatMap((page) => page.result)
              .map((comment, index, array) => {
                if (!comment) return null;
                const isLastComment = index === array.length - 1; // 마지막 댓글인지 확인

                return (
                  <CommentItem
                    key={comment.id}
                    ref={isLastComment ? latestCommentRef : null}
                    isEdit={isEdit}
                    comment={comment}
                    userState={userState}
                    onEditStartHandler={onEditStartHandler}
                    onEditEndHandler={onEditEndHandler}
                    reviewId={reviewId}
                    setErrorMsg={setErrorMsg}
                    onDeleteCommentHandler={onDeleteCommentHandler}
                  ></CommentItem>
                );
              })}
            <Modal
              isOpen={isDeleteCommentModalOpen}
              onSubmitText="삭제"
              title="삭제"
              firstLine="삭제된 댓글은 복구할 수 없습니다."
              secondLine="삭제하시겠습니까?"
              onSubmitHandler={() => {
                deleteCommentMutation.mutate(String(deleteCommentId));
                setIsDeleteCommentModalOpen(false);
              }}
              onCloseHandler={() => setIsDeleteCommentModalOpen(false)}
            />{' '}
            <Modal
              isOpen={!!errorMsg}
              title="알림"
              firstLine={errorMsg}
              onCloseHandler={onCloseErrorModalHandler}
            />
            {isLoading && <div>로딩중...</div>}
            {hasNextPage && <StLoadingSpinner ref={loaderRef} />}
          </StDetailPageCommentList>
        )}
      </StDetailPageComment>
    </div>
  );
};
export default Comments;
