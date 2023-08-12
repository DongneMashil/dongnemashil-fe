import { CommonLayout, NavBar } from 'components/layout';
import React, { ChangeEvent, useState } from 'react';
import {
  StMarker,
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
        <div>
          {responseData?.documents.map((result: Document, index: number) => (
            <StSearchResult key={index}>
              {result.road_address_name || result.address_name}
              {result.place_name ? `(${result.place_name})` : ''}
            </StSearchResult>
          ))}
        </div>
        {isError && <div>Error: {(error as Error).message}</div>}
        {isLoading && <div>Loading...</div>}
      </StSearchWrapper>
    </CommonLayout>
  );
};
