import React, { useState } from 'react';
import { TabButton } from '../TabButton/TabButton';
import {
  GetMyReviewsResponse,
  getMyComments,
  getMyReviews,
} from 'api/mypageApi';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  StCounter,
  StReviewBox,
  StTabButtonBox,
  StTabButtonWrapper,
  StTabContainer,
  StTabContentBox,
} from './TabMenu.styles';
export const TabMenu = ({ nickName }: { nickName: string | undefined }) => {
  const [selectedTab, setSelectedTab] = useState('reviews');
  const navigate = useNavigate();
  const { data } = useQuery<GetMyReviewsResponse, Error>({
    queryKey: ['myPage', nickName, selectedTab],
    queryFn: () => getMyReviews(selectedTab),
    enabled: !!nickName,
    onSuccess: (data) => {
      console.log('🥶' + JSON.stringify(data));
      getMyComments().then((res) => {
        console.log('🤬' + JSON.stringify(res));
      });
    },
    onError: (error) => {
      console.log('🟢' + error);
    },
  });
  console.log(data);
  return (
    <StTabContainer>
      <StTabButtonWrapper>
        <StCounter>3개의 게시물</StCounter>
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
          data.content.map((item, index) => (
            <StReviewBox
              key={index}
              onClick={() => navigate(`/review/${item.reviewId}`)}
            >
              <img src={item.imgUrl || ''} alt="img" />
              <div className="contentWrapper">
                <div className="title">{item.address}</div>
                <div className="date">{item.createdAt}</div>
              </div>
            </StReviewBox>
          ))
        ) : (
          <div>👀 데이터가 없습니다!</div>
        )}
      </StTabContentBox>
    </StTabContainer>
  );
};
