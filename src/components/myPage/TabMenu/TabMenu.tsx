import React, { useState } from 'react';
import { TabButton } from '../TabButton/TabButton';
import { GetMyReviewsResponse, getMyReviews } from 'api/mypageApi';
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
import { useInfinityScroll } from 'hooks';
export const TabMenu = ({ nickName }: { nickName: string | undefined }) => {
  const [selectedTab, setSelectedTab] = useState('reviews');
  const navigate = useNavigate();

  //무한스크롤 커스텀훅
  const { data, hasNextPage, loaderRef, isLoading } =
    useInfinityScroll<GetMyReviewsResponse>({
      getAPI: getMyReviews,
      queryKey: ['myPage', nickName!, selectedTab],
      qValue: selectedTab,
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
