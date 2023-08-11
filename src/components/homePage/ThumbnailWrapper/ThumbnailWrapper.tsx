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

export const ThumbnailWrapper = ({
  selectedTags,
}: {
  selectedTags: string[] | null;
}) => {
  const [type, setType] = useState('likes');

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

  const onClickSort = (type: string) => {
    type === 'likes' ? setType('likes') : setType('recent');
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
