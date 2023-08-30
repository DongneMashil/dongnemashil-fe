import React, { useState } from 'react';
import { TabButton } from '../TabButton/TabButton';
import { getMyReviews } from 'api/mypageApi';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowDown } from 'assets/icons/ArrowDown.svg';
import {
  StText,
  StRefBox,
  StReviewBox,
  StTabButtonBox,
  StTabButtonWrapper,
  StTabContainer,
  StTabContentBox,
  StEmptyBox,
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
        <StText>
          <span>{data ? data.pages[0].totalElements : '0'}</span>&nbsp;개의
          게시물
        </StText>
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
      <StTabContentBox $empty={!(data && data.pages[0].content.length > 0)}>
        {data && data.pages[0].content.length > 0 ? (
          data.pages.map(
            (page) =>
              page.content &&
              page.content.map(
                (item) =>
                  item.imgUrl && (
                    <StReviewBox
                      key={item.reviewId}
                      onClick={() => navigate(`/review/${item.reviewId}`)}
                      $imgUrl={item.imgUrl}
                      area-label={`${item.roadName}의 ${item.reviewId}번 리뷰로 이동하기`}
                    >
                      <div
                        className="imgWrapper"
                        role="img"
                        aria-label={`${item.roadName}의 ${item.reviewId}번 리뷰 이미지`}
                      />
                      <div className="contentWrapper">
                        <h2 className="title">{item.roadName}</h2>
                        {selectedTab === 'reviews' && (
                          <time className="date">
                            {timeFormatWithoutTime(item.createdAt)}
                          </time>
                        )}
                      </div>

                      {isLoading && <h2>로딩중...</h2>}
                    </StReviewBox>
                  )
              )
          )
        ) : (
          <StEmptyBox>
            {selectedTab === 'reviews' ? (
              <>
                <StText>
                  하단 글쓰기 버튼을 눌러
                  <br />
                  오늘의 산책을 기록할 수 있어요
                </StText>
                <ArrowDown />
              </>
            ) : (
              <StText>아직 좋아요를 누른 게시물이 없으시네요!</StText>
            )}
          </StEmptyBox>
        )}
        {hasNextPage && <StRefBox ref={loaderRef} />}
      </StTabContentBox>
    </StTabContainer>
  );
};
