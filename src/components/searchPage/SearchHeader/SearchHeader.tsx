import React from 'react';
import { HeaderText } from 'components/common';
import { ReactComponent as Search } from 'assets/icons/Search.svg';
import { StSearchHeaderBox } from './SearchHeader.styles';

export const SearchHeader = React.memo(() => {
  return (
    <StSearchHeaderBox>
      <Search width={16} height={16} />
      <HeaderText type="h1">주소 키워드를 입력해주세요!</HeaderText>
    </StSearchHeaderBox>
  );
});

SearchHeader.displayName = 'SearchHeader';
