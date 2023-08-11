import React, { useMemo, useState } from 'react';
import { Thumbnail } from '../Thumbnail/Thumbnail';
import {
  StSort,
  StTarget,
  StThumbnailWrapper,
} from './ThumbnailWrapper.styles';
import { useFetchReviews } from 'api/reviewsApi';
import { useIntersect } from 'hooks/useIntersect';
import { Button } from 'components/common';

export const ThumbnailWrapper = ({ tag }: { tag: string | null }) => {
  const [type, setType] = useState('likes');

  console.log(tag);

  const { data, hasNextPage, isFetching, fetchNextPage, refetch } =
    useFetchReviews({
      type,
      tag,
    });

  console.log(type, data);

  const reviews = useMemo(
    () => (data ? data.pages.flatMap(({ data }) => data.content) : []),
    [data]
  );

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

  const onClickSort = (type: string) => {
    if (type === 'likes') {
      setType('likes');
      refetch();
    } else {
      setType('recent');
      refetch();
    }
  };

  return (
    <StThumbnailWrapper>
      <StSort>
        <Button
          onClick={() => onClickSort('likes')}
          type="onlytexttoggle"
          $active={type === 'likes'}
        >
          인기순
        </Button>{' '}
        |{' '}
        <Button
          onClick={() => onClickSort('recent')}
          type="onlytexttoggle"
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
