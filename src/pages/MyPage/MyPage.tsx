import React, { useCallback, useState } from 'react';
import { Button } from 'components/common';
import { logout } from 'api/loginApi';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const MyPage = () => {
  const navigate = useNavigate();
  const [shouldLogout, setShouldLogout] = useState(false);
  const { data, isLoading, isError, isSuccess, error } = useQuery({
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

  if (isLoading) {
    console.log('로그아웃 시도중');
  }
  if (isError) {
    console.log('로그아웃 실패 ', error);
  }
  if (isSuccess) {
    console.log('로그아웃 완료', data);
    setShouldLogout(false);
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
