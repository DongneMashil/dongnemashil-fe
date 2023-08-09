import { Footer, TabMenu, UserInfo } from 'components/common/myPage';
import { CommonLayout, NavBar } from 'components/layout';
import React from 'react';
import { styled } from 'styled-components';
export const MyPage = () => {
  return (
    <CommonLayout
      header={
        <NavBar btnLeft="logo" btnRight="submit">
          마이페이지
        </NavBar>
      }
      footer={<Footer />}
      hideHeader={false}
      backgroundColor="#f5f5f5"
    >
      <StMyPageContainer>
        <UserInfo />
        <TabMenu />
      </StMyPageContainer>
    </CommonLayout>
  );
};

export const StMyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
  height: 100%;
`;
