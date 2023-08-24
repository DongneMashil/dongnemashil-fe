import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useVerifyUser } from 'hooks';
import { LoadingPage } from 'pages';

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isLoading, isError, isSuccess } = useVerifyUser(true);

  useEffect(() => {
    if (!isLoading && isError) {
      window.alert('로그인이 필요합니다.');
    }
  }, [isLoading, isError]);

  if (isLoading) {
    console.log('useVerifyUser Loading');
    return <LoadingPage />;
  }

  if (isError) {
    console.log('useVerifyUser Error');
    return <Navigate to="/login" replace />;
  }

  if (isSuccess) {
    console.log('useVerifyUser Success');
    return element;
  }
};

export default ProtectedRoute;
