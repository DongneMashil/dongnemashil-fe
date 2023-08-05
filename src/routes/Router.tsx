import ProtectedRoute from './ProtectedRoute';
import { CommonLayout } from 'components/layout';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  DetailPage,
  KakaoCallbackPage,
  WriteMapPage,
  DetailCommentPage,
} from 'pages';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <CommonLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/kakao" element={<KakaoCallbackPage />} />
          <Route path="/review/:reviewId" element={<DetailPage />} />
          <Route
            path="/review/comments/:reviewId"
            element={<DetailCommentPage />}
          />
          <Route
            path="/writemap"
            element={<ProtectedRoute element={<WriteMapPage />} />}
          />
        </Routes>
      </BrowserRouter>
    </CommonLayout>
  );
};

export default Router;
