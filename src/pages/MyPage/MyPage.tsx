import React, { useCallback, useState } from 'react';
import { Button } from 'components/common';
import { logout } from 'api/loginApi';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { UserState, userProfileSelector } from 'recoil/userExample';

export const MyPage = () => {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userProfileSelector);
  const [shouldLogout, setShouldLogout] = useState(false);
  const logoutHook = useQuery({
    queryKey: ['logout'],
    queryFn: () => logout(),
    enabled: shouldLogout,
    onSuccess: (data) => {
      console.log('logout, ', data);
    },
  });

  const onLogoutHandler = useCallback(() => {
    setShouldLogout(true);
  }, []);

  if (logoutHook.isLoading) {
    console.log('로그아웃 시도중');
  }
  if (logoutHook.isError) {
    console.log('로그아웃 실패 ', logoutHook.error);
  }
  if (logoutHook.isSuccess) {
    console.log('로그아웃 완료', logoutHook.data);
    const newData: UserState = {
      userId: '',
      nickName: '',
      profileImage: '',
      isLoggedIn: false,
    };
    setUserState(newData);
    navigate(`/`);
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
