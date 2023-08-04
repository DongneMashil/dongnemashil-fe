import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { getReviewDetail, ReviewDetail } from 'api/detailApi';
// import { useParams } from 'react-router-dom';
import { MyFavoriteTags } from 'components/common/Modal/MyFavoriteTags/MyFavoriteTags';
import { Tag } from 'components/common/Tag/Tag';
import { Input } from 'components/common';
import { CommonLayout } from 'components/layout';

export const DetailPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  // const { reviewId } = useParams<{ reviewId: string }>();
  // if (!reviewId) {wd
  //   throw new Error('Review ID is missing');
  // }
  // const { data, isLoading, isError, error } = useQuery<ReviewDetail, Error>({
  //   queryKey: ['reviewDetail', reviewId],
  //   queryFn: () => getReviewDetail(reviewId),
  //   enabled: !!reviewId,
  // });
  return (
    <CommonLayout>
      {/* {isLoading && <div>Loading...</div>}
      {isError && <div>{String(error)}</div>}

      {data && <div>{data.content}</div>} */}
      <MyFavoriteTags isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
      hihi
      <Tag text="hihi" onClick={() => setModalOpen(true)} />
      <Input name="hihi" label="hihi" placeholder="hihi" />
    </CommonLayout>
  );
};
