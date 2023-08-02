import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getReviewDetail, ReviewDetail } from 'api/detailApi';
import { useParams } from 'react-router-dom';

export const DetailPage = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  if (!reviewId) {
    throw new Error('Review ID is missing');
  }
  const { data, isLoading, isError, error } = useQuery<ReviewDetail, Error>({
    queryKey: ['reviewDetail', reviewId],
    queryFn: () => getReviewDetail(reviewId),
    enabled: !!reviewId,
  });
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>{String(error)}</div>}

      {data && <div>{data.content}</div>}
    </div>
  );
};
