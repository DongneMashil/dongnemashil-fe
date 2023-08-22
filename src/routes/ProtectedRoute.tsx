import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useVerifyUser } from 'hooks';
import { StLoadingSpinner } from 'components/common';

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { data, isLoading, isError } = useVerifyUser(true);

  useEffect(() => {
    if (!isLoading && isError) {
      window.alert('로그인이 필요합니다.');
    }
  }, [isLoading, isError]);

  if (isLoading) {
    return <StLoadingSpinner />;
  }

  return data && data.nickname ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
