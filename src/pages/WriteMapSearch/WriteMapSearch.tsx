import { CommonLayout, NavBar } from 'components/layout';
import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  StMarker,
  StSearchBox,
  StSearchInput,
  StSearchResult,
  StSearchWrapper,
} from './WriteMapSearch.styles';
import { searchAddress } from 'api/kakaoSearch';

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
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (search) {
      setIsLoading(true);
      searchAddress(search)
        .then((response) => {
          setData(response.data);
          setError(null);
        })
        .catch((err) => {
          setError(err);
          setData(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [search]);

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
          {data?.documents.map((result, index) => (
            <StSearchResult key={index}>
              {result.road_address_name || result.address_name}
              {result.place_name ? `(${result.place_name})` : ''}
            </StSearchResult>
          ))}
        </div>
        {error && <div>Error: {error.message}</div>}
        {isLoading && <div>Loading...</div>}
      </StSearchWrapper>
    </CommonLayout>
  );
};
