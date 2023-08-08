import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import { TabButton } from '../TabButton/TabButton';
export const TabMenu = () => {
  const [isLeftSelected, setIsLeftSelected] = useState(true);
  const onTabClickHandler = useCallback(() => {
    setIsLeftSelected(!isLeftSelected);
  }, [isLeftSelected]);

  return (
    <StTabContainer>
      <StTabWrapper>
        <TabButton
          selected={isLeftSelected}
          onClick={!isLeftSelected ? onTabClickHandler : undefined}
        >
          내가 쓴 글
        </TabButton>
        <TabButton
          selected={!isLeftSelected}
          onClick={isLeftSelected ? onTabClickHandler : undefined}
        >
          내가 쓴 댓글
        </TabButton>
      </StTabWrapper>
      <StTabContentBox></StTabContentBox>
    </StTabContainer>
  );
};

export const StTabContentBox = styled.div`
  width: 100%;
  background-color: red;
  height: 100%;
  top: 0;
  z-index: 10;
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
