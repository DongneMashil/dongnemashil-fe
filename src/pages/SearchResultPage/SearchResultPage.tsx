import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  selectedTagsState,
  sortTypeState,
} from 'recoil/reviewsQuery/reviewsQuery';
import { FixFooter, NavBar } from 'components/layout';
import { useFetchReviews } from 'api/reviewsApi';
import { SearchResultMapPage } from 'pages/SearchResultMapPage/SearchResultMapPage';
import { SearchResultListPage } from 'pages/SearchResultListPage/SearchResultListPage';
import { useLocation } from 'react-router-dom';
import { ToggleTagButton } from 'components/common/ToggleTag/ToggleTag';

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

  // const scrollToTopRef = useRef<HTMLDivElement>(null);

  // const handleGotoTop = () => {
  //   if (scrollToTopRef.current) {
  //     scrollToTopRef.current.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'start',
  //     });
  //   }
  // };
  // console.log(scrollToTopRef);

  const handleGotoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // const handleGotoTop = () => {
  //   window.scrollBy({
  //     top: -300,
  //     behavior: 'smooth',
  //   });
  // };

  return (
    <>
      <NavBar btnLeft={'logo'} btnSecondRight={'search'} btnRight={'mypage'}>
        <h1>{q}</h1>
      </NavBar>
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
