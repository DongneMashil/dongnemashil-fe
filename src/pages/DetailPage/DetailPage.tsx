import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { getReviewDetail, ReviewDetail } from 'api/detailApi';
// import { useParams } from 'react-router-dom';
import { MyFavoriteTags } from 'components/common/Modal/MyFavoriteTags/MyFavoriteTags';
import { Tag } from 'components/common/Tag/Tag';

export const DetailPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  // const { reviewId } = useParams<{ reviewId: string }>();
  // if (!reviewId) {
  //   throw new Error('Review ID is missing');
  // }
  // const { data, isLoading, isError, error } = useQuery<ReviewDetail, Error>({
  //   queryKey: ['reviewDetail', reviewId],
  //   queryFn: () => getReviewDetail(reviewId),
  //   enabled: !!reviewId,
  // });
  return (
    <div>
      {/* {isLoading && <div>Loading...</div>}
      {isError && <div>{String(error)}</div>}

      {data && <div>{data.content}</div>} */}
      <MyFavoriteTags isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
      hihi
      <Tag text="hihi" onClick={() => setModalOpen(true)} />
    </div>
  );
};
