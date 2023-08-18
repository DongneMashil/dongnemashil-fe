import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, HeaderText } from 'components/common';
import { ReactComponent as Search } from 'assets/icons/Search.svg';
import { ReactComponent as BackButton } from 'assets/icons/ChevronLeft.svg';
import { StSearchInput, StSearchHeader } from './SearchPage.styles';
import { CommonLayout } from 'components/layout';

export const SearchPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const search = () => {
    console.log('Searching... 검색어: ', value);
    navigate(`/search/result?q=${value}`);
  };
  // const onSubmitHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  //   e.preventDefault();
  //   console.log('onSubmitHandler');
  //   search();
  // };
  const onKeyPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('onKeyPressHandler');
      search();
    }
  };
  const onBackHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    console.log('onBackHandler');
    navigate(-1);
  };
  return (
    <CommonLayout backgroundColor="#ffffff">
      <StSearchHeader>
        <Button type="icon" onClick={onBackHandler}>
          <BackButton />
        </Button>
        <div>
          <Search width={16} height={16} />
          <HeaderText type="h1">구를 입력해주세요!</HeaderText>
        </div>
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
      {/* <Button onClick={onSubmitHandler}>test용 전송버튼</Button> */}
    </CommonLayout>
  );
};
