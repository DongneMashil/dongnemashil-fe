import React, { useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import {
  selectedTagsState,
  sortTypeState,
} from 'recoil/reviewsQuery/reviewsQuery';

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
  // const [isMapOpen, setIsMapOpen] = useState(false);

  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);
  const [type, setType] = useRecoilState(sortTypeState);

  const { data, hasNextPage, isFetching, fetchNextPage, refetch } =
    useFetchSearchReviews({ q });

  const reviews = useMemo(
    () => (data ? data.pages.flatMap(({ data }) => data.content) : []),
    [data]
  );

  console.log(isFetching);
  console.log(hasNextPage);

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

  // const onClickMapOpen = () => {
  //   setIsMapOpen(true);
  // };

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
      footer={
        <FixFooter
          centerButtons={'map'}
          rightButtons={'goTop'}
          // onClickCenter={onClickMapOpen}
        />
      }
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
