import { Footer, TabMenu, UserInfo } from 'components/common/myPage';
import { CommonLayout, NavBar } from 'components/layout';
import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import { Button } from 'components/common';
// import { useNavigate } from 'react-router-dom';
import { useLogout } from 'hooks';

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
  // const navigate = useNavigate();
  const [shouldLogout, setShouldLogout] = useState(false);
  const { isError } = useLogout(shouldLogout);

  const onLogoutHandler = useCallback(() => {
    setShouldLogout(true);
  }, []);

  if (isError) {
    console.log('로그아웃 실패');
  }
  return (
    <div>
      <h3>Mypage</h3>
      <div style={{ padding: '80px 0' }}>
        <Button onClick={onLogoutHandler}>Logout</Button>
      </div>
    </div>
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
