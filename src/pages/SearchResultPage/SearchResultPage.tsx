import React, { useEffect, useMemo, useState } from 'react';
import { CommonLayout, FixFooter, NavBar } from 'components/layout';
import { useFetchSearchReviews } from 'api/reviewsApi';
// import { SearchResultMapPage } from 'pages/SearchResultMapPage/SearchResultMapPage';
import { SearchResultListPage } from 'pages/SearchResultListPage/SearchResultListPage';
import { ReactComponent as Search } from 'assets/icons/Search.svg';
import { useLocation } from 'react-router-dom';
import { ToggleTagButton } from 'components/common/ToggleTag/ToggleTag';

export const SearchResultPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get('q');
  console.log(q);
  // const [isMapOpen] = useState(false);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [type, setType] = useState('likes');
  const tag = selectedTags.length > 0 ? selectedTags.join(',') : null;
  const { data, hasNextPage, isFetching, fetchNextPage, refetch } =
    useFetchSearchReviews({
      type,
      tag,
      q,
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

  return (
    <CommonLayout
      header={
        <>
          <NavBar btnLeft={'logo'} btnRight={'mypage'}>
            <h1>
              <Search width="18" height="18" />
              {q}
            </h1>
          </NavBar>
        </>
      }
      footer={<FixFooter centerButtons={'map'} rightButtons={'goTop'} />}
    >
      <ToggleTagButton onTagChange={handleTagChange} />

      <SearchResultListPage
        type={type}
        reviews={reviews}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
        onClickSort={onClickSort}
      />
      {/* {isMapOpen && <SearchResultMapPage reviewList={reviews} />} */}
    </CommonLayout>
  );
};
