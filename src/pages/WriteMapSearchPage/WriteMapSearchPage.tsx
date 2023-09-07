import { NavBar } from 'components/layout';
import React, { ChangeEvent, useState } from 'react';
import {
  StChooseButton,
  StLayout,
  StLayoutContainer,
  StMarker,
  StPlaceName,
  StRoadBox,
  StRoadName,
  StSearchResultWrapper,
  StSearchBox,
  StSearchInput,
  StSearchResult,
  StSearchWrapper,
} from './WriteMapSearchPage.styles';
import { searchAddress } from 'api/kakaoSearch';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { selectedAddressAtom } from 'recoil/address/selectedAddressAtom';

interface ApiResponse {
  documents: Document[];
}

interface Document {
  road_address_name: string;
  address_name: string;
  place_name?: string;
}

export const WriteMapSearchPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const setSelectedAddress = useSetRecoilState(selectedAddressAtom);
  const location = useLocation();
  const reviewId = location.state?.reviewId;

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

  const onSelectAddressHandler = (selectedAddress: string) => {
    if (reviewId) {
      setSelectedAddress(selectedAddress);
      navigate('/writemap', {
        state: { fromSearch: true, reviewId: reviewId },
      });
    } else {
      setSelectedAddress(selectedAddress);
      navigate('/writemap', { state: { fromSearch: true } });
    }
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
    <StLayout>
      <NavBar btnLeft={'back'} btnRight={null}>
        위치 검색
      </NavBar>
      <StLayoutContainer>
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
          <StSearchResultWrapper>
            {responseData?.documents.map((result: Document, index: number) => (
              <StSearchResult key={index}>
                <StRoadBox>
                  <StPlaceName>
                    {highlightSearchText(result.place_name || '', search)}
                  </StPlaceName>
                  <StRoadName>
                    {result.road_address_name || result.address_name}
                  </StRoadName>
                </StRoadBox>
                <StChooseButton
                  onClick={() =>
                    onSelectAddressHandler(
                      result.road_address_name || result.address_name
                    )
                  }
                >
                  선택
                </StChooseButton>
                {isError && <div>Error: {(error as Error).message}</div>}
                {isLoading && <div>Loading...</div>}
              </StSearchResult>
            ))}
          </StSearchResultWrapper>
        </StSearchWrapper>
      </StLayoutContainer>
    </StLayout>
  );
};

export default WriteMapSearchPage;
