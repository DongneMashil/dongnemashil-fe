import React from 'react';
import { useRecoilState } from 'recoil';
import { userState } from 'recoil/userExample';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const [user] = useRecoilState(userState);
  const isLoggedIn = user.isLogin;
  console.log('isLoggedIn', isLoggedIn);
  return isLoggedIn ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
