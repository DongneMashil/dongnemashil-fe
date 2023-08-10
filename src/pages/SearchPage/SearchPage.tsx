import React, { useState } from 'react';
import { Button } from 'components/common';
import { ReactComponent as SearchFlat } from 'assets/icons/SearchFlat.svg';
import { StSearchInput, StSearchHeader } from './SearchPage.styles';
import { CommonLayout } from 'components/layout';
import { HeaderText } from 'components/layout/HeaderText/HeaderText';

export const SearchPage = () => {
  const [value, setValue] = useState('');
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onSubmitHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    console.log('onSubmitHandler');
  };
  return (
    <CommonLayout>
      <StSearchHeader>
        <div>
          <SearchFlat width={16} height={16} />
          <HeaderText type="h1">구를 입력해주세요!</HeaderText>
        </div>
        <StSearchInput
          type="text"
          name="searchQuery"
          id="searchQuery"
          value={value}
          onChange={onChangeHandler}
          placeholder="예) 강남구"
        />
      </StSearchHeader>
      <Button onClick={onSubmitHandler}>test용 전송버튼</Button>
    </CommonLayout>
  );
};
