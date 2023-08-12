import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { deleteComment, getComment } from 'api/detailApi';
import SkeletonUI from 'components/common/SkeletonUI/SkeletonUI';
import noUser from 'assets/images/NoUser.gif';
import React, { useEffect, useRef } from 'react';
import timeAgo from 'utils/timeAgo';
import {
  StDetailPageComment,
  StDetailPageCommentItem,
  StDetailPageCommentList,
} from './Comments.styles';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';
import { queryClient } from 'queries/queryClient';
import { commentCountAtom } from 'recoil/commentCount/commentCountAtom';
import { commentAddListenerAtom } from 'recoil/commentAddListener/commentAddListenerAtom';

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
  if (!reviewId) {
    throw new Error('Review ID is missing');
  }
  const latestCommentRef = useRef(null);
  const loader = useRef(null);
  const useInfinityScroll = () => {
    const fetchComment = async ({ pageParam = 1 }) => {
      const response = await getComment(reviewId, pageParam);
      setCommentCount(Number(response.totalElements)); // Recoil 상태 업데이트

      console.log(JSON.stringify(response));
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
      staleTime: 3000, // 3초 동안 데이터는 fresh 상태를 유지, 무분별한 요청을 막기 위함.
    });
    return query;
  };
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } =
    useInfinityScroll();

  const handleLoadMore = (info: IntersectionObserverEntry[]) => {
    console.log(info); //이벤트 정보 출력
    const target = info[0];
    if (target.isIntersecting && !isLoading) {
      fetchNextPage();
    }
  };
  useEffect(() => {
    // Intersection Observer를 설정
    const options = {
      root: null, // viewport를 기준으로 함
      rootMargin: '0px', //감지위치
      threshold: 0.1, // target이 viewport의 100% 경계선을 넘어가면 콜백 실행
    };

    const observer = new IntersectionObserver(handleLoadMore, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [isLoading, hasNextPage]);

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

  // useEffect(() => {
  //   if (commentAddListener && latestCommentRef.current && !isFetching) {
  //     // ref가 DOM을 가르키는지 확인시켜줌
  //     const element: HTMLElement = latestCommentRef.current as HTMLElement;
  //     element.scrollIntoView({ behavior: 'smooth' });
  //     setCommentAddListener(false); // 상태를 다시 초기화
  //   }
  // }, [data, commentAddListener]);

  const deleteCommentMutation = useMutation(deleteComment, {
    onSuccess: () => {
      // 성공적으로 댓글이 삭제된 후에는 다시 댓글 목록을 불러옵니다.
      // 이 때, 기존 댓글 목록 캐시를 무효화하여 새로 불러올 수 있습니다.
      queryClient.invalidateQueries(['comment', reviewId]);
    },
  });
  const onDeleteCommentHandler = (commentId: number) => {
    deleteCommentMutation.mutate(String(commentId)); // API 요청을 발생시키기 위해 mutate를 호출합니다.
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
                  </section>
                  <div className="content">{comment.comment}</div>
                  {userState.nickName === comment.nickname && (
                    <button onClick={() => onDeleteCommentHandler(comment.id)}>
                      삭제
                    </button>
                  )}
                </StDetailPageCommentItem>
              );
            })}

          {isLoading && <div>로딩중...</div>}

          {hasNextPage && (
            <>
              <SkeletonUI ref={loader} width="100%" height="80px" />
              <SkeletonUI width="100%" height="80px" />
              <SkeletonUI width="100%" height="80px" />
              <SkeletonUI width="100%" height="80px" />
            </>
          )}
        </StDetailPageCommentList>
      )}
    </StDetailPageComment>
  );
};
