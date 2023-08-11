import React, { useState } from 'react';
import { styled } from 'styled-components';
import { TabButton } from '../TabButton/TabButton';
import { GetMyReviewsResponse, getMyReviews } from 'api/mypageApi';
import { useQuery } from '@tanstack/react-query';
export const TabMenu = ({ nickName }: { nickName: string | undefined }) => {
  const [selectedTab, setSelectedTab] = useState('reviews');

  const { data } = useQuery<GetMyReviewsResponse, Error>({
    queryKey: ['myPage', nickName, selectedTab],
    queryFn: () => getMyReviews(selectedTab),
    enabled: !!nickName,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log('🟢' + error);
    },
  });
  console.log(data);
  return (
    <StTabContainer>
      <StTabButtonWrapper>
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
      </StTabButtonWrapper>
      <StTabContentBox>
        {selectedTab === 'reviews' ? (
          <>
            {Array(10)
              .fill(null)
              .map((_, index) => (
                <StReviewBox key={index}>
                  <img
                    src={`https://picsum.photos/200/300?random=${index}`}
                    alt="img"
                  />
                  <div className="contentWrapper">
                    <div className="title">잠원로{index}</div>
                    <div className="date">9월 {index}일</div>
                  </div>
                </StReviewBox>
              ))}
          </>
        ) : (
          <>
            {Array(20)
              .fill(null)
              .map((_, index) => (
                <StReviewBox key={index}>
                  <img
                    src={`https://picsum.photos/200/300?random=${index + 20}`}
                    alt="img"
                  />
                  <div className="contentWrapper">
                    <div className="title">한강대로{index}</div>
                    <div className="date">9월 {index}일</div>
                  </div>
                </StReviewBox>
              ))}
          </>
        )}
      </StTabContentBox>
    </StTabContainer>
  );
};

export const StReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 0.875rem;
  }
  .contentWrapper {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.7rem;
    gap: 0.2rem;
    .title {
      font-size: 1rem;
      font-weight: 600;
    }
    .date {
      font-size: 0.875rem;
      font-weight: 400;
      color: #828282;
    }
  }
`;

export const StTabContentBox = styled.div`
  width: 100%;
  // height: 100%;

  background-color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.03);
  border-radius: 0.875rem;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-items: center;
  gap: 5px;

  @media (min-width: 300px) {
    grid-template-columns: repeat(2, 1fr);
  }

  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 0.875rem;
  }
`;

export const StTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //   margin-top: 2rem;
  width: 100%;
  height: 100%;
`;
export const StTabButtonWrapper = styled.div`
  display: flex;
  margin-right: 0.3rem;
  margin-left: auto;
`;
