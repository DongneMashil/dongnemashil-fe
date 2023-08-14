import React, { useEffect, useMemo, useState } from 'react';
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

  console.log(type, data?.pages[0].data.content);

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

  useEffect(() => {
    refetch();
  }, [type, tag]);

  const onClickSort = (type: string) => {
    if (type === 'likes' || type === 'recent') {
      setType(type);
    }
  };

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
