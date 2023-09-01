import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthNavButton, Modal } from 'components/common';
import { SearchHeader } from 'components/searchPage/SearchHeader/SearchHeader';
import { ReactComponent as InputIcon } from 'assets/icons/SearchPageIcon.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/DeleteXMark.svg';
import {
  StSearchWrapper,
  StSearchInput,
  StSearchContainer,
  StSearchBox,
  StSearchInputBox,
  StRecentKeywordsWrapper,
  StRecentKeywordsBox,
} from './SearchPage.styles';

const STORAGE_KEY = 'searchedList';

export const SearchPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [keywordList, setKeywordList] = useState<string[]>(
    JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  );
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const search = () => {
    if (value === '') {
      setIsModalOpen(true);
    } else {
      onAddKeyword(value);
      navigate(`/search/result?q=${value}`);
    }
  };
  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      search();
    }
  };
  const onCloseModalHandler = () => {
    setIsModalOpen(false);
  };

  const onKeywordSearch = (keyword: string) => {
    setValue(keyword);
    search();
  };
  const onDeleteKeyword = (idx: number) => {
    const newList = [...keywordList];
    newList.splice(idx, 1);
    updateKeywordStorage(newList);
  };
  const onAddKeyword = (keyword: string) => {
    const newList = [...keywordList];
    newList.unshift(keyword);
    updateKeywordStorage(newList);
  };
  const updateKeywordStorage = (newList: string[]) => {
    setKeywordList(newList);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
  };

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
          {keywordList.length === 0 ? (
            <li>최근 검색어가 없습니다.</li>
          ) : (
            keywordList.map((data, idx) => {
              return (
                <li key={idx}>
                  <button
                    onClick={() => {
                      onKeywordSearch(data);
                    }}
                  >
                    {data}
                  </button>
                  <button
                    onClick={() => {
                      onDeleteKeyword(idx);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </li>
              );
            })
          )}
        </StRecentKeywordsBox>
      </StRecentKeywordsWrapper>
      <Modal
        isOpen={isModalOpen}
        onCloseHandler={onCloseModalHandler}
        title="검색어를 입력해주세요."
      />
    </StSearchContainer>
  );
};
