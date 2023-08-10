import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';
// import { userIsLoggedInSelector } from 'recoil/userExample';
import { useVerifyUser } from 'hooks';

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isSuccess } = useVerifyUser(true);
  return isSuccess ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
