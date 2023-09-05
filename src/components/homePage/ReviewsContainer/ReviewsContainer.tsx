import React, { useState, useLayoutEffect } from 'react';
import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { Thumbnail } from '../Thumbnail/Thumbnail';
import {
  StLine,
  StNoReviews,
  StReviewsContainer,
  StSort,
  StTarget,
  StTopWrapper,
} from './ReviewsContainer.styles';
import { useIntersect } from 'hooks/useIntersect';
import { Button } from 'components/common';
import { ReviewsList } from 'api/reviewsApi';
import { MasonryGrid } from '@egjs/react-grid';
import { MasonryGridOptions } from '@egjs/grid';
import { useLocation } from 'react-router-dom';
import { throttle } from 'lodash';
import Skeleton from '../Skeleton/Skeleton';

export interface ReviewsProps {
  type: string;
  reviews: ReviewsList[];
  hasNextPage?: boolean;
  isLoading?: boolean;
  isFetching: boolean;
  fetchNextPage: UseInfiniteQueryResult['fetchNextPage'];
  onClickSort: (type: string) => void;
  totalElements?: number | null;
}

export const ReviewsContainer = ({
  type,
  reviews,
  hasNextPage,
  isLoading,
  isFetching,
  fetchNextPage,
  onClickSort,
  totalElements,
}: ReviewsProps) => {
  const ref = useIntersect(
    (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    {
      threshold: 0.1,
    }
  );

  const [columns, setColumns] = useState(window.innerWidth < 768 ? 1 : 2);

  const throttledHandleResize = throttle(() => {
    if (window.innerWidth < 768) {
      setColumns(1);
    } else {
      setColumns(2);
    }
  }, 200);

  useLayoutEffect(() => {
    throttledHandleResize();
    window.addEventListener('resize', throttledHandleResize);

    return () => {
      window.removeEventListener('resize', throttledHandleResize);
    };
  }, [window.innerWidth]);

  const masonryGridOptions: MasonryGridOptions = {
    column: columns,
    gap: 14,
    defaultDirection: 'end',
    align: 'stretch',
  };

  const location = useLocation();

  return (
    <StReviewsContainer>
      <StTopWrapper>
        {totalElements && totalElements !== 0 ? (
          <span>
            <strong>{totalElements}</strong> 개
          </span>
        ) : location.pathname === '/search/result' ? (
          <span>
            <strong>0</strong> 개
          </span>
        ) : null}

        <StSort>
          <Button
            onClick={() => onClickSort('likes')}
            type="onlyTextToggle"
            $active={type === 'likes'}
          >
            인기순
          </Button>
          <StLine />
          <Button
            onClick={() => onClickSort('recent')}
            type="onlyTextToggle"
            $active={type === 'recent'}
          >
            최신순
          </Button>
        </StSort>
      </StTopWrapper>
      {isLoading ? (
        <MasonryGrid {...masonryGridOptions}>
          {new Array(6).fill('').map((_, i) => (
            <Skeleton key={i} />
          ))}
        </MasonryGrid>
      ) : (
        <MasonryGrid {...masonryGridOptions}>
          {reviews?.map((review) => (
            <Thumbnail
              key={review.id}
              id={review.id}
              roadName={review.roadName}
              middleMainImgUrl={review.middleMainImgUrl}
              smallMainImgUrl={review.smallMainImgUrl}
              profileImgUrl={review.profileImgUrl}
              nickname={review.nickname}
              createdAt={review.createdAt}
              likeCnt={review.likeCnt}
              likebool={review.likebool}
            />
          ))}
        </MasonryGrid>
      )}
      {!isFetching && reviews.length === 0 && (
        <StNoReviews>검색된 글이 없습니다.</StNoReviews>
      )}
      {!isLoading && <StTarget ref={ref} />}
    </StReviewsContainer>
  );
};
