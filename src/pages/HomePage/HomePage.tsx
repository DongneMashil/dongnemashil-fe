import React, { useState, useMemo, useEffect } from 'react';
import { CommonLayout, FixFooter, NavBar } from 'components/layout';
import { ThumbnailWrapper } from 'components/homePage';
import { ToggleTagButton } from 'components/common/ToggleTag/ToggleTag';
import { useFetchReviews } from 'api/reviewsApi';

export const HomePage = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [type, setType] = useState('likes');
  const tag = selectedTags.length > 0 ? selectedTags.join(',') : null;
  const { data, hasNextPage, isFetching, fetchNextPage, refetch } =
    useFetchReviews({
      type,
      tag,
    });

  const reviews = useMemo(
    () => (data ? data.pages.flatMap(({ data }) => data.content) : []),
    [data]
  );

  console.log(isFetching);
  console.log(hasNextPage);

  useEffect(() => {
    refetch();
  }, [type, tag]);

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
