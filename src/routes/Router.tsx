import {
  HomePage,
  LoginPage,
  RegisterPage,
  DetailPage,
  KakaoCallbackPage,
  WriteMapPage,
  MyPage,
} from 'pages';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/kakao" element={<KakaoCallbackPage />} />
        <Route path="/review/:reviewId" element={<DetailPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/writemap" element={<WriteMapPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
