import React, { useMemo, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  selectedTagsState,
  sortTypeState,
} from 'recoil/reviewsQuery/reviewsQuery';
import { CommonLayout, FixFooter, NavBar } from 'components/layout';
import { ThumbnailWrapper } from 'components/homePage';
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
  console.log(selectedTags);

  return (
    <CommonLayout
      header={
        <>
          <NavBar
            btnLeft={'logo'}
            btnSecondRight={'search'}
            btnRight={'mypage'}
          >
            <h1>서울 전체</h1>
          </NavBar>
        </>
      }
      footer={<FixFooter rightButtons={'write'} />}
    >
      <ToggleTagButton onTagChange={handleTagChange} />
      <ThumbnailWrapper
        type={type}
        reviews={reviews}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
        onClickSort={onClickSort}
      />
    </CommonLayout>
  );
};
