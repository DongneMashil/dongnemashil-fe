import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthNavButton } from 'components/common';
import { SearchHeader } from 'components/searchPage/SearchHeader/SearchHeader';
import { StSearchInput, StSearchHeader } from './SearchPage.styles';

export const SearchPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const search = () => {
    // console.log('Searching... 검색어: ', value);
    navigate(`/search/result?q=${value}`);
  };
  const onKeyPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // console.log('onKeyPressHandler');
      search();
    }
  };
  return (
    <StSearchHeader>
      <AuthNavButton type="back" />
      <SearchHeader />
      <StSearchInput
        type="text"
        name="searchQuery"
        id="searchQuery"
        value={value}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        placeholder="예) 강남구"
      />
    </StSearchHeader>
  );
};
