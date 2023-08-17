import React, { useState } from 'react';
import { TabButton } from '../TabButton/TabButton';
import { getMyReviews } from 'api/mypageApi';
import { useNavigate } from 'react-router-dom';
import {
  StCounter,
  StRefBox,
  StReviewBox,
  StTabButtonBox,
  StTabButtonWrapper,
  StTabContainer,
  StTabContentBox,
} from './TabMenu.styles';
import { timeFormatWithoutTime } from 'utils';
import { useIntersect } from 'hooks/useIntersect';
import { useInfiniteQuery } from '@tanstack/react-query';
export const TabMenu = ({ nickName }: { nickName: string | undefined }) => {
  const [selectedTab, setSelectedTab] = useState('reviews');
  const navigate = useNavigate();

  const useInfinityScroll = () => {
    const fetchItems = async ({ pageParam = 1 }) => {
      const response = await getMyReviews(selectedTab, pageParam);
      console.log(JSON.stringify(response));
      return {
        ...response,
        isLast: response.last,
        nextPage: pageParam + 1,
      };
    };

    const query = useInfiniteQuery(
      ['myPage', nickName, selectedTab],
      fetchItems,
      {
        getNextPageParam: (currentPage) => {
          if (!currentPage.isLast) return currentPage.nextPage;
          return undefined;
        },
      }
    );
    return query;
  };
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfinityScroll();

  // useIntersect 콜백함수
  const onIntersectCallback = () => {
    if (!isLoading) {
      fetchNextPage();
    }
  };

  // 커스텀훅 사용
  const loaderRef = useIntersect(onIntersectCallback, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  });
  return (
    <StTabContainer>
      <StTabButtonWrapper>
        <StCounter>
          {data ? data.pages[0].totalElements : '0'}개의 게시물
        </StCounter>
        <StTabButtonBox>
          <TabButton
            selected={selectedTab === 'reviews'}
            onClick={() => setSelectedTab('reviews')}
          >
            내가 쓴
          </TabButton>
          <TabButton
            selected={selectedTab === 'likes'}
            onClick={() => setSelectedTab('likes')}
          >
            좋아요 한
          </TabButton>
        </StTabButtonBox>
      </StTabButtonWrapper>
      <StTabContentBox>
        {data ? (
          data.pages.map((page) =>
            page.content.map(
              (item, index) =>
                item.imgUrl && (
                  <StReviewBox
                    key={index}
                    onClick={() => navigate(`/review/${item.reviewId}`)}
                  >
                    <img src={item.imgUrl} alt="img" />
                    <div className="contentWrapper">
                      <div className="title">{item.roadName}</div>
                      {selectedTab === 'reviews' && (
                        <div className="date">
                          {timeFormatWithoutTime(item.createdAt)}
                        </div>
                      )}
                    </div>

                    {isLoading && <div>로딩중...</div>}
                  </StReviewBox>
                )
            )
          )
        ) : (
          <div>👀 게시글이 없습니다!</div>
        )}{' '}
        {hasNextPage && (
          <>
            <StRefBox ref={loaderRef} />
          </>
        )}
      </StTabContentBox>
    </StTabContainer>
  );
};
