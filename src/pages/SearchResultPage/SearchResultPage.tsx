import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  selectedTagsState,
  sortTypeState,
} from 'recoil/reviewsQuery/reviewsQuery';
import { CommonLayout, FixFooter, NavBar } from 'components/layout';
import { useFetchReviews } from 'api/reviewsApi';
import { SearchResultMapPage } from 'pages/SearchResultMapPage/SearchResultMapPage';
import { SearchResultListPage } from 'pages/SearchResultListPage/SearchResultListPage';
import { ReactComponent as Search } from 'assets/icons/Search.svg';
import { useLocation } from 'react-router-dom';
import { ToggleTagButton } from 'components/common/ToggleTag/ToggleTag';
import { useScrollToTop } from 'hooks/useScrollToTop';

export const SearchResultPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get('q');
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);

  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);
  const [type, setType] = useRecoilState(sortTypeState);

  const { data, hasNextPage, isFetching, fetchNextPage, refetch } =
    useFetchReviews({ q });

  const reviews = useMemo(
    () => (data ? data.pages.flatMap(({ data }) => data.content) : []),
    [data]
  );

  const totalElements = useMemo(
    () => (data ? data.pages[0].data.totalElements : 0),
    [data]
  );

  console.log(data, totalElements);

  console.log(isFetching);
  console.log(hasNextPage);

  useEffect(() => {
    refetch();
    console.log('data ', data);
    console.log('isMapOpen ', isMapOpen);
  }, [type, selectedTags]);

  const onClickSort = (type: string) => {
    if (type === 'likes' || type === 'recent') {
      setType(type);
    }
  };

  const handleTagChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const toggleMapOpen = () => {
    setIsMapOpen(!isMapOpen);
  };

  const { scrollToTop } = useScrollToTop();

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
          onClickCenter={toggleMapOpen}
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
        totalElements={totalElements}
      />
      <button id="scroll-to-top-button" onClick={scrollToTop}>
        Scroll to Top
      </button>
      {isMapOpen && (
        <SearchResultMapPage reviewList={reviews} onToggle={toggleMapOpen} />
      )}
    </CommonLayout>
  );
};
