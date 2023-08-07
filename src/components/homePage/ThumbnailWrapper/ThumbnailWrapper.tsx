import React from 'react';
import { Thumbnail } from '../Thumbnail/Thumbnail';
import { StThumbnailWrapper } from './ThumbnailWrapper.styles';
import { useQuery } from '@tanstack/react-query';
import { getReviews, ReviewsList } from 'api/reviewsApi';

export const ThumbnailWrapper = () => {
  const type = 'likes';
  const page = 1;
  const { data, isLoading, error } = useQuery<ReviewsList[], Error>(
    ['reviews', type, page],
    () => getReviews(type, page)
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

  return (
    <StThumbnailWrapper>
      {data.map((review) => (
        <Thumbnail
          key={review.id}
          id={review.id}
          roadName={review.roadName}
          img_url={review.img_url}
          likeCnt={review.likeCnt}
          tag={review.tag}
          profileImg_url={review.profileImg_url}
        />
      ))}
    </StThumbnailWrapper>
  );
};
