import React from 'react';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  DetailPage,
  KakaoCallbackPage,
  WriteMapPage,
  CommonLoginPage,
  MyPage,
  SearchPage,
  WritePage,
  SearchResultMapPage,
} from 'pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/common" element={<CommonLoginPage />} />
        <Route path="/login/kakao" element={<KakaoCallbackPage />} />
        <Route path="/review/:reviewId" element={<DetailPage />} />
        <Route
          path="/writemap"
          element={<ProtectedRoute element={<WriteMapPage />} />}
        />
        <Route
          path="/mypage"
          element={<ProtectedRoute element={<MyPage />} />}
        />
        <Route path="write" element={<WritePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="search/map" element={<SearchResultMapPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
