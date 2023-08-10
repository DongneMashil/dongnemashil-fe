import React, { useMemo, useState } from 'react';
import { Thumbnail } from '../Thumbnail/Thumbnail';
import { StTarget, StThumbnailWrapper } from './ThumbnailWrapper.styles';
import { useFetchReviews } from 'api/reviewsApi';
import { useIntersect } from 'hooks/useIntersect';

export const ThumbnailWrapper = ({
  selectedTags,
}: {
  selectedTags: string[] | null;
}) => {
  const type = 'likes';
  const [page] = useState(1);
  console.log(selectedTags);

  const { data, hasNextPage, isFetching, fetchNextPage } = useFetchReviews({
    type: type,
  });

  console.log(data);

  const reviews = useMemo(
    () => (data ? data.pages.flatMap(({ data }) => data.content) : []),
    [data]
  );

  console.log(page);
  console.log(isFetching);
  console.log(hasNextPage);

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
      {reviews?.map((review) => (
        <Thumbnail
          key={review.id}
          id={review.id}
          roadName={review.roadName}
          mainImgUrl={review.mainImgUrl}
          videoUrl={review.videoUrl}
          profileImgUrl={review.profileImgUrl}
          likeCnt={review.likeCnt}
          likebool={review.likebool}
        />
      ))}
      {isFetching && <div>Loading...</div>}
      <StTarget ref={ref} />
    </StThumbnailWrapper>
  );
};
