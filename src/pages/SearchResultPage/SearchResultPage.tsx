import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  selectedTagsState,
  sortTypeState,
} from 'recoil/reviewsQuery/reviewsQuery';
import { FixFooter, NavBar } from 'components/layout';
import { useFetchReviews } from 'api/reviewsApi';
import { SearchResultMapPage } from 'pages/SearchResultMapPage/SearchResultMapPage';
import { useLocation } from 'react-router-dom';
import { ToggleTagButton } from 'components/common/ToggleTag/ToggleTag';
import { ReviewsContainer } from 'components/homePage';

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

  useEffect(() => {
    if (!isFetching) refetch();
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

  const handleGotoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <NavBar btnLeft={'logo'} btnSecondRight={'search'} btnRight={'mypage'}>
        <h1>{q}</h1>
      </NavBar>
      <ToggleTagButton
        initialSelectedTags={selectedTags}
        onTagChange={handleTagChange}
      />
      <ReviewsContainer
        type={type}
        reviews={reviews}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
        onClickSort={onClickSort}
        totalElements={totalElements}
      />
      {isMapOpen && (
        <SearchResultMapPage reviewList={reviews} onToggle={toggleMapOpen} />
      )}
      <FixFooter
        centerButtons={'map'}
        rightButtons={'goTop'}
        onClickCenter={toggleMapOpen}
        onClickRight={handleGotoTop}
      />
    </>
  );
};
