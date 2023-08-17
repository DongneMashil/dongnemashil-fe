import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userIsLoggedInSelector } from 'recoil/userExample';
import { useVerifyUser } from 'hooks';

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const isLoggedIn = useRecoilValue(userIsLoggedInSelector);
  const { data, isLoading, isError } = useVerifyUser(!isLoggedIn);

  useEffect(() => {
    if (!isLoading && isError) {
      window.alert('로그인이 필요합니다.');
    }
  }, [isLoading, isError]);
  return isLoggedIn || (data && data.nickname) ? (
    element
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
