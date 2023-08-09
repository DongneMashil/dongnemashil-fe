import React, { useState } from 'react';
import { Button } from 'components/common';
import { ReactComponent as Search } from 'assets/icons/Search.svg';
import { StSearchInput, StSearchHeader } from './SearchPage.styles';

export const SearchPage = () => {
  const [value, setValue] = useState('');
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <StSearchHeader>
        <div>
          <Search width={16} height={16} fill="none" />
          <h3>구를 입력해주세요!</h3>
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
      <Button>test용 전송버튼</Button>
    </div>
  );
};
