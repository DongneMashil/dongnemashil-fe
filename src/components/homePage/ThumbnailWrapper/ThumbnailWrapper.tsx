import React, { useState, useEffect, useCallback } from 'react';
import { Thumbnail } from '../Thumbnail/Thumbnail';
import { StThumbnailWrapper } from './ThumbnailWrapper.styles';
import { ResponseData, ReviewsList } from 'api/reviewsApi';
import { axiosInstance } from 'api/api';

// const PAGE_SIZE = 1000;

export const ThumbnailWrapper = () => {
  const type = 'likes';
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<ReviewsList[]>([]);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  const fetchReviews = useCallback(async () => {
    const { data } = await axiosInstance.get<ResponseData>('/reviews', {
      params: { type, page },
    });
    setReviews(reviews.concat(data.content));
    setPage(page + 1);
    setNextPage(!data.last);
    setFetching(false);
    console.log(data.content);
  }, [page]);

  console.log(page);
  console.log(isFetching);
  console.log(hasNextPage);
  console.log('innerHeight :', window.innerHeight);
  console.log('scrollTop :', document.documentElement.scrollTop);
  console.log('offsetHeight :', document.documentElement.offsetHeight);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        setFetching(true);
      }
    };
    setFetching(true);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && hasNextPage) fetchReviews();
    else if (!hasNextPage) setFetching(false);
  }, [isFetching]);

  return (
    <StThumbnailWrapper>
      {reviews?.map((review) => (
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
      {isFetching && <div>Loading...</div>}
      <div style={{ position: 'fixed', bottom: 10, right: 10 }}></div>
    </StThumbnailWrapper>
  );
};
