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
  MyProfilePage,
  SearchPage,
  WritePage,
  WriteMapSearchPage,
  SearchResultPage,
  MyCommentsPage,
  NotFoundPage,
  StableNavigateContextProvider,
  SearchMapNearbyPage,
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
          path="/writemap/search"
          element={<ProtectedRoute element={<WriteMapSearchPage />} />}
        />
        <Route
          path="/write"
          element={
            <ProtectedRoute
              element={
                <StableNavigateContextProvider>
                  <WritePage />
                </StableNavigateContextProvider>
              }
            />
          }
        />
        <Route
          path="/mypage"
          element={<ProtectedRoute element={<MyPage />} />}
        />
        <Route path="/userPage/:userNickname" element={<MyPage />} />
        <Route
          path="/mypage/profile"
          element={<ProtectedRoute element={<MyProfilePage />} />}
        />
        <Route
          path="/mypage/comments"
          element={<ProtectedRoute element={<MyCommentsPage />} />}
        />
        <Route path="/temp/mypage" element={<MyPage />} />
        <Route path="/temp/mypage/profile" element={<MyProfilePage />} />
        <Route path="/temp/mypage/comments" element={<MyCommentsPage />} />
        <Route
          path="/write"
          element={
            <ProtectedRoute
              element={
                <StableNavigateContextProvider>
                  <WritePage />
                </StableNavigateContextProvider>
              }
            />
          }
        />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/result" element={<SearchResultPage />} />
        <Route path="/search/nearby" element={<SearchMapNearbyPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
