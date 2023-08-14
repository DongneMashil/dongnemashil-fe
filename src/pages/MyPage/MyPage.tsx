import { Footer, TabMenu, UserInfo } from 'components/common/myPage';
import { CommonLayout, NavBar } from 'components/layout';
// import React from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Button } from 'components/common';
// import { useNavigate } from 'react-router-dom';
import { useLogout, useVerifyUser } from 'hooks';
import { MyProfile, getMyProfile } from 'api/mypageApi';
import { useRecoilValue } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';
import { useQuery } from '@tanstack/react-query';

export const MyPage = () => {
  const [shouldLogout, setShouldLogout] = useState(false);
  const { isError } = useLogout(shouldLogout);

  const userState = useRecoilValue(userProfileSelector);
  const { data: userData } = useVerifyUser(true);
  useEffect(() => {
    console.log('current user state: ', userState);
    if (userData) {
      console.log('useVerifyUser data: ', userData);
    }
  }, [userState]);

  const onLogoutHandler = useCallback(() => {
    setShouldLogout(true);
  }, []);

  if (isError) {
    console.log('로그아웃 실패');
  }

  const { data } = useQuery<MyProfile, Error>({
    queryKey: ['myPage', userData?.nickname],
    queryFn: () => getMyProfile(),
    // enabled: !!userData?.nickname,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log('🔴' + error);
    },
  });

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
        <UserInfo
          profileImgUrl={data?.profileImgUrl}
          nickName={data?.nickname}
          email={data?.email}
        />

        <TabMenu nickName={userData?.nickname} />
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
