import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthNavButton } from 'components/common';
import { SearchHeader } from 'components/searchPage/SearchHeader/SearchHeader';
import { ReactComponent as DeleteIcon } from 'assets/icons/DeleteXMark.svg';
import { ReactComponent as InputIcon } from 'assets/icons/SearchPageIcon.svg';
import {
  StSearchWrapper,
  StSearchInput,
  StSearchContainer,
  StSearchBox,
  StSearchInputBox,
  StRecentKeywordsWrapper,
  StRecentKeywordsBox,
} from './SearchPage.styles';

export const SearchPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const search = () => {
    navigate(`/search/result?q=${value}`);
  };
  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      search();
    }
  };

  //e : React.MouseEvent<HTMLHtmlElement>
  return (
    <StSearchContainer>
      <StSearchWrapper>
        <StSearchBox>
          <AuthNavButton type="back" />
          <SearchHeader />
          <StSearchInputBox>
            <StSearchInput
              type="text"
              name="searchQuery"
              id="searchQuery"
              value={value}
              onChange={onChangeHandler}
              onKeyDown={onKeyPressHandler}
              placeholder="예) 강남구"
            />
            <InputIcon />
          </StSearchInputBox>
        </StSearchBox>
      </StSearchWrapper>
      <StRecentKeywordsWrapper>
        <p>최근 검색어</p>
        <StRecentKeywordsBox>
          <li>
            한강대로 <DeleteIcon />
          </li>
          <li>
            한강대로 <DeleteIcon />
          </li>
          <li>
            한강대로 <DeleteIcon />
          </li>
        </StRecentKeywordsBox>
      </StRecentKeywordsWrapper>
    </StSearchContainer>
  );
};
