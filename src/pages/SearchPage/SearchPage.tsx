import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtParser } from 'utils/jwtParser';
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
  StRecentKeywordsHeader,
} from './SearchPage.styles';

const STORAGE_KEY = 'searchedList';

interface Ikeyword {
  id: number;
  user: string | null;
  keyword: string;
}

export const SearchPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [keywordList, setKeywordList] = useState<Ikeyword[]>([]);

  console.log(window.localStorage.getItem(STORAGE_KEY));
  const userInfo = useRef<string>('');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const search = () => {
    if (value === '') {
      setIsModalOpen(true);
    } else {
      onAddKeyword(value, userInfo.current);
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
  const onDeleteKeyword = (id: number) => {
    console.log('id', id);
    const newList = [...keywordList].filter((data) => data.id !== id);
    updateKeywordStorage(newList);
  };
  const onAddKeyword = (keyword: string, user: string) => {
    const newList = [...keywordList];
    if (user) {
      newList.unshift({
        id: Date.now(),
        user,
        keyword,
      });
      console.log('onAddKeyword', newList);
    }
    updateKeywordStorage(newList);
  };
  const updateKeywordStorage = (newList: Ikeyword[]) => {
    console.log('updateKeywordStorage', newList);
    setKeywordList(newList);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
  };

  useEffect(() => {
    const decodedName = jwtParser().sub;
    const storage = window.localStorage.getItem(STORAGE_KEY);
    if (decodedName) {
      userInfo.current = decodedName;
      console.log(userInfo.current);
    }
    if (storage) {
      setKeywordList(JSON.parse(storage));
    }
  }, []);

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
        <StRecentKeywordsHeader>최근 검색어</StRecentKeywordsHeader>
        <StRecentKeywordsBox>
          {(() => {
            const filteredKeywords = keywordList.filter(
              (data) => data.user === userInfo.current
            );

            if (filteredKeywords.length === 0) {
              return <li>최근 검색어가 없습니다.</li>;
            } else {
              return filteredKeywords.map((data) => (
                <li key={data.id}>
                  <button onClick={() => onKeywordSearch(data.keyword)}>
                    {data.keyword}
                  </button>
                  <button onClick={() => onDeleteKeyword(data.id)}>
                    <DeleteIcon />
                  </button>
                </li>
              ));
            }
          })()}
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
