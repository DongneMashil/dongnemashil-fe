import React from 'react';
import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { Thumbnail } from '../Thumbnail/Thumbnail';
import {
  StNoReviews,
  StSort,
  StTarget,
  StThumbnailWrapper,
  StTopWrapper,
} from './ThumbnailWrapper.styles';
import { useIntersect } from 'hooks/useIntersect';
import { Button } from 'components/common';
import { ReviewsList } from 'api/reviewsApi';
import { StLoadingSpinner } from 'components/common/LoadingSpinner/LoadingSpinner.styles';

export interface ReviewsProps {
  type: string;
  reviews: ReviewsList[];
  hasNextPage?: boolean;
  isFetching: boolean;
  fetchNextPage: UseInfiniteQueryResult['fetchNextPage'];
  onClickSort: (type: string) => void;
  totalElements?: number | null;
}

export const ThumbnailWrapper = ({
  type,
  reviews,
  hasNextPage,
  isFetching,
  fetchNextPage,
  onClickSort,
  totalElements,
}: ReviewsProps) => {
  console.log(type);

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

  return (
    <StThumbnailWrapper>
      <StTopWrapper>
        <span>
          <strong>{totalElements || 0}</strong> 개
        </span>

        <StSort>
          <Button
            onClick={() => onClickSort('likes')}
            type="onlyTextToggle"
            $active={type === 'likes'}
          >
            인기순
          </Button>
          <Button
            onClick={() => onClickSort('recent')}
            type="onlyTextToggle"
            $active={type === 'recent'}
          >
            최신순
          </Button>
        </StSort>
      </StTopWrapper>
      {reviews?.map((review) => (
        <Thumbnail
          key={review.id}
          id={review.id}
          roadName={review.roadName}
          mainImgUrl={review.mainImgUrl}
          profileImgUrl={review.profileImgUrl}
          createdAt={review.createdAt}
          likeCnt={review.likeCnt}
          likebool={review.likebool}
        />
      ))}
      {isFetching && (
        <StNoReviews>
          <StLoadingSpinner />
        </StNoReviews>
      )}
      <StTarget ref={ref} />
    </StThumbnailWrapper>
  );
};
