// import React, { Suspense } from 'react';
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

// import { StableNavigateContextProvider } from 'pages/WritePage/WritePage';

// const HomePage = React.lazy(() => import('pages/HomePage/HomePage'));
// const LoginPage = React.lazy(() => import('pages/LoginPage/LoginPage'));
// const RegisterPage = React.lazy(
//   () => import('pages/RegisterPage/RegisterPage')
// );
// const DetailPage = React.lazy(() => import('pages/DetailPage/DetailPage'));
// const KakaoCallbackPage = React.lazy(
//   () => import('pages/KakaoCallbackPage/KakaoCallbackPage')
// );
// const WriteMapPage = React.lazy(
//   () => import('pages/WriteMapPage/WriteMapPage')
// );
// const CommonLoginPage = React.lazy(
//   () => import('pages/CommonLoginPage/CommonLoginPage')
// );
// const MyPage = React.lazy(() => import('pages/MyPage/MyPage'));
// const MyProfilePage = React.lazy(
//   () => import('pages/MyProfilePage/MyProfilePage')
// );
// const SearchPage = React.lazy(() => import('pages/SearchPage/SearchPage'));
// const WritePage = React.lazy(() => import('pages/WritePage/WritePage'));
// const WriteMapSearchPage = React.lazy(
//   () => import('pages/WriteMapSearchPage/WriteMapSearchPage')
// );
// const SearchResultPage = React.lazy(
//   () => import('pages/SearchResultPage/SearchResultPage')
// );
// const MyCommentsPage = React.lazy(
//   () => import('pages/MyCommentsPage/MyCommentsPage')
// );
// const NotFoundPage = React.lazy(
//   () => import('pages/NotFoundPage/NotFoundPage')
// );
// const SearchMapNearbyPage = React.lazy(
//   () => import('pages/SearchMapNearbyPage/SearchMapNearbyPage')
// );
// import { LoadingPage } from 'pages';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const Router = () => {
  return (
    <BrowserRouter>
      {/* <Suspense fallback={<LoadingPage />}> */}
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
      {/* </Suspense> */}
    </BrowserRouter>
  );
};

export default Router;
