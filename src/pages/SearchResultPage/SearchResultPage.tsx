import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CommonLayout } from 'components/layout';
import { ReviewsList } from 'api/reviewsApi';
import { SearchResultMapPage } from 'pages/SearchResultMapPage/SearchResultMapPage';

export interface ReviewResultsProps extends ReviewsList {
  // id: number;
  // roadName: string;
  // mainImgUrl: string;
  // videoUrl: string | null;
  // profileImgUrl: string | null;
  // likeCnt: number;
  // likebool: boolean;
  createdAt: string;
  address: string;
}

//! 더미 데이터. 이후에 지울 예정입니다
export const data: ReviewResultsProps[] = [
  {
    id: 1,
    roadName: '왕십리로31가길',
    mainImgUrl:
      'https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    profileImgUrl:
      'https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    likeCnt: 2,
    likebool: false,
    createdAt: '2023-10-15',
    address: '서울특별시 성동구 왕십리로31가길 10-12',
  },
  {
    id: 2,
    roadName: '왕십리로31가길',
    mainImgUrl:
      'https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    profileImgUrl:
      'https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    likeCnt: 2,
    likebool: false,
    createdAt: '2023-11-12',
    address: '서울특별시 성동구 왕십리로31가길 3',
  },
  {
    id: 3,
    roadName: '서울숲길',
    mainImgUrl:
      'https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    profileImgUrl:
      'https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    likeCnt: 2,
    likebool: false,
    createdAt: '2023-10-15',
    address: '서울특별시 성동구 서울숲길 17',
  },
];

// SearchPage에서 param으로 지역 검색어가 전달됩니다!
export const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const [isMapOpen] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const locationParam = searchParams.get('q'); // SearchPage에서 전달한 값
    console.log('검색한 주소 : ', searchValue);
    locationParam && setSearchValue(locationParam);
  }, []);

  return (
    <CommonLayout backgroundColor="#ffffff">
      {/* 수진님이 뿌려줄 리스트 컴포넌트 */}
      {isMapOpen && <SearchResultMapPage reviewList={data} />}
    </CommonLayout>
  );
};
