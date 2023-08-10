import React, { useCallback, useState } from 'react';
import { Button } from 'components/common';
// import { useNavigate } from 'react-router-dom';
import { useLogout } from 'hooks';

export const MyPage = () => {
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
