import React from 'react';
import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { Thumbnail } from '../Thumbnail/Thumbnail';
import {
  StSort,
  StTarget,
  StThumbnailWrapper,
} from './ThumbnailWrapper.styles';
import { useIntersect } from 'hooks/useIntersect';
import { Button } from 'components/common';
import { ReviewsList } from 'api/reviewsApi';

export interface ReviewsProps {
  type: string;
  reviews: ReviewsList[];
  hasNextPage?: boolean;
  isFetching: boolean;
  fetchNextPage: UseInfiniteQueryResult['fetchNextPage'];
  onClickSort: (type: string) => void;
}

export const ThumbnailWrapper = ({
  type,
  reviews,
  hasNextPage,
  isFetching,
  fetchNextPage,
  onClickSort,
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
      {isFetching && <div>Loading...</div>}
      <StTarget ref={ref} />
    </StThumbnailWrapper>
  );
};
