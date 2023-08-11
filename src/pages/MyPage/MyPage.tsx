import { Footer, TabMenu, UserInfo } from 'components/common/myPage';
import { CommonLayout, NavBar } from 'components/layout';
// import React from 'react';
import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import { Button } from 'components/common';
// import { useNavigate } from 'react-router-dom';
import { useLogout } from 'hooks';

export const MyPage = () => {
  const [shouldLogout, setShouldLogout] = useState(false);
  const { isError } = useLogout(shouldLogout);
  const onLogoutHandler = useCallback(() => {
    setShouldLogout(true);
  }, []);

  if (isError) {
    console.log('로그아웃 실패');
  }
  return (
    <CommonLayout
      header={
        <NavBar btnLeft="logo" btnRight="submit">
          <Button onClick={onLogoutHandler}>Logout</Button>
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
