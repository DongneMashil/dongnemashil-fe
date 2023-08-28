import React, { useMemo, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  selectedTagsState,
  sortTypeState,
} from 'recoil/reviewsQuery/reviewsQuery';
import { FixFooter, NavBar } from 'components/layout';
import { ReviewsContainer } from 'components/homePage';
import { ToggleTagButton } from 'components/common/ToggleTag/ToggleTag';
import { useFetchReviews } from 'api/reviewsApi';

export const HomePage = () => {
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);
  const [type, setType] = useRecoilState(sortTypeState);

  const { data, hasNextPage, isFetching, fetchNextPage, refetch } =
    useFetchReviews();

  const reviews = useMemo(
    () => (data ? data.pages.flatMap(({ data }) => data.content) : []),
    [data]
  );

  useEffect(() => {
    refetch();
  }, [type, selectedTags]);

  const onClickSort = (type: string) => {
    if (type === 'likes' || type === 'recent') {
      setType(type);
    }
  };

  const handleTagChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  return (
    <>
      <NavBar btnLeft={'logo'} btnSecondRight={'search'} btnRight={'mypage'}>
        <h1>서울 전체</h1>
      </NavBar>
      <ToggleTagButton onTagChange={handleTagChange} />
      <ReviewsContainer
        type={type}
        reviews={reviews}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
        onClickSort={onClickSort}
      />
      <FixFooter rightButtons={'write'} />
    </>
  );
};
