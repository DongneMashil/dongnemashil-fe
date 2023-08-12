import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CommonLayout } from 'components/layout';

// SearchPage에서 param으로 지역 검색어가 전달됩니다!
export const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const locationParam = searchParams.get('q'); // SearchPage에서 전달한 값
    locationParam && setSearchValue(locationParam);
  }, []);

  return <CommonLayout backgroundColor="#ffffff">{searchValue}</CommonLayout>;
};
