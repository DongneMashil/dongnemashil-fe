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
import { StLoadingSpinner } from 'components/common/LoadingSpinner/LoadingSpinner.styles';
import { MasonryGrid } from '@egjs/react-grid';
import { MasonryGridOptions } from '@egjs/grid';

export interface ReviewsProps {
  type: string;
  reviews: ReviewsList[];
  hasNextPage?: boolean;
  isFetching: boolean;
  fetchNextPage: UseInfiniteQueryResult['fetchNextPage'];
  onClickSort: (type: string) => void;
  totalElements?: number | null;
}

export const ReviewsContainer = ({
  type,
  reviews,
  hasNextPage,
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

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const masonryGridOptions: MasonryGridOptions = {
    column: columns,
    gap: 14,
    defaultDirection: 'end',
    align: 'stretch',
  };

  return (
    <StReviewsContainer>
      <StTopWrapper>
        {totalElements && totalElements !== 0 ? (
          <span>
            <strong>{totalElements}</strong> 개
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
      {!isFetching && reviews.length === 0 ? (
        <StNoReviews>검색된 글이 없습니다.</StNoReviews>
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
              createdAt={review.createdAt}
              likeCnt={review.likeCnt}
              likebool={review.likebool}
            />
          ))}
        </MasonryGrid>
      )}
      {isFetching && (
        <StNoReviews>
          <StLoadingSpinner />
        </StNoReviews>
      )}
      <StTarget ref={ref} />
    </StReviewsContainer>
  );
};
