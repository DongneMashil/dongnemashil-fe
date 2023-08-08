import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import { TabButton } from '../TabButton/TabButton';
export const TabMenu = () => {
  const [isMyReviewSelected, setIsMyReviewSelected] = useState(true);
  const onTabClickHandler = useCallback(() => {
    setIsMyReviewSelected(!isMyReviewSelected);
  }, [isMyReviewSelected]);

  return (
    <StTabContainer>
      <StTabWrapper>
        <TabButton
          selected={isMyReviewSelected}
          onClick={!isMyReviewSelected ? onTabClickHandler : undefined}
        >
          내가 쓴 글
        </TabButton>
        <TabButton
          selected={!isMyReviewSelected}
          onClick={isMyReviewSelected ? onTabClickHandler : undefined}
        >
          내가 쓴 댓글
        </TabButton>
      </StTabWrapper>
      <StTabContentBox>
        {isMyReviewSelected ? (
          <>
            <img src="https://picsum.photos/200/300" alt="img" />
            <img src="https://picsum.photos/200/300" alt="img" />
            <img src="https://picsum.photos/200/300" alt="img" />
            <img src="https://picsum.photos/200/300" alt="img" />
            <img src="https://picsum.photos/200/300" alt="img" />
            <img src="https://picsum.photos/200/300" alt="img" />
            <img src="https://picsum.photos/200/300" alt="img" />
            <img src="https://picsum.photos/200/300" alt="img" />
            <img src="https://picsum.photos/200/300" alt="img" />
            <img src="https://picsum.photos/200/300" alt="img" />
          </>
        ) : (
          <>
            <img src="https://source.unsplash.com/random" alt="img" />
            <img src="https://source.unsplash.com/random" alt="img" />
            <img src="https://source.unsplash.com/random" alt="img" />
            <img src="https://source.unsplash.com/random" alt="img" />
            <img src="https://source.unsplash.com/random" alt="img" />
            <img src="https://source.unsplash.com/random" alt="img" />
          </>
        )}
      </StTabContentBox>
    </StTabContainer>
  );
};

export const StTabContentBox = styled.div`
  width: 100%;
  background-color: #fff;
  padding-top: 1rem;
  top: 0;
  z-index: 100;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 5px;

  @media (min-width: 300px) {
    grid-template-columns: repeat(3, 1fr);
  }

  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
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
export const StTabWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
