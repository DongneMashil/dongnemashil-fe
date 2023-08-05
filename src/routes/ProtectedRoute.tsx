import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userIsLoggedInSelector } from 'recoil/userExample';

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const isLoggedIn = useRecoilValue(userIsLoggedInSelector);
  return isLoggedIn ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
