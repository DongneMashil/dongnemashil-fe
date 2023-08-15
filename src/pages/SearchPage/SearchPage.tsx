import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/common';
import { ReactComponent as Search } from 'assets/icons/Search.svg';
import { StSearchInput, StSearchHeader } from './SearchPage.styles';
import { HeaderText } from 'components/common/HeaderText/HeaderText';
import { CommonLayout } from 'components/layout';

export const SearchPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onSubmitHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    console.log('onSubmitHandler');
    navigate(`/search/result?q=${value}`);
  };
  return (
    <CommonLayout backgroundColor="#ffffff">
      <StSearchHeader>
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
          placeholder="예) 강남구"
        />
      </StSearchHeader>
      <Button onClick={onSubmitHandler}>test용 전송버튼</Button>
    </CommonLayout>
  );
};
