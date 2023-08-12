import { CommonLayout, NavBar } from 'components/layout';
import React, { ChangeEvent, useState } from 'react';
import {
  StMarker,
  StPlaceName,
  StRoadName,
  StSeacrhResultWrapper,
  StSearchBox,
  StSearchInput,
  StSearchResult,
  StSearchWrapper,
} from './WriteMapSearch.styles';
import { searchAddress } from 'api/kakaoSearch';
import { useQuery } from '@tanstack/react-query';

interface ApiResponse {
  documents: Document[];
}

interface Document {
  road_address_name: string;
  address_name: string;
  place_name?: string;
}

export const WriteMapSearch = () => {
  const [search, setSearch] = useState('');

  const {
    data: responseData,
    isError,
    error,
    isLoading,
  } = useQuery<ApiResponse>(
    ['searchAddress', search],
    () => searchAddress(search).then((res) => res.data),
    {
      enabled: !!search,
    }
  );

  const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const highlightSearchText = (text: string, searchText: string) => {
    const splitText = text.split(new RegExp(`(${searchText})`, 'i'));
    return splitText.map((part, index) =>
      part.toLowerCase() === searchText.toLowerCase() ? (
        <span key={index} style={{ color: '#598EFF' }}>
          {part}
        </span>
      ) : (
        <span key={index} style={{ color: '#333' }}>
          {part}
        </span>
      )
    );
  };

  return (
    <CommonLayout
      header={
        <NavBar btnLeft={'back'} btnRight={null}>
          위치 검색
        </NavBar>
      }
    >
      <StSearchWrapper>
        <StSearchBox>
          <StMarker />
          <StSearchInput
            value={search}
            type="text"
            placeholder="주소"
            onChange={onInputChangeHandler}
          />
        </StSearchBox>
        <StSeacrhResultWrapper>
          {responseData?.documents.map((result: Document, index: number) => (
            <StSearchResult key={index}>
              <StPlaceName>
                {highlightSearchText(result.place_name || '', search)}
              </StPlaceName>
              <StRoadName>
                {result.road_address_name || result.address_name}
              </StRoadName>
              {isError && <div>Error: {(error as Error).message}</div>}
              {isLoading && <div>Loading...</div>}
            </StSearchResult>
          ))}
        </StSeacrhResultWrapper>
      </StSearchWrapper>
    </CommonLayout>
  );
};