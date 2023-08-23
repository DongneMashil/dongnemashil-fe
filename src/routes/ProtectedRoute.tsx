import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useVerifyUser } from 'hooks';
import { StLoadingSpinner } from 'components/common';

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isLoading, isError, isSuccess } = useVerifyUser(true);

  useEffect(() => {
    if (!isLoading && isError) {
      window.alert('로그인이 필요합니다.');
    }
  }, [isLoading, isError]);

  if (isLoading) {
    return <StLoadingSpinner />;
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  if (isSuccess) {
    return element;
  }
};

export default ProtectedRoute;
