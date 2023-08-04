import { CommonLayout } from 'components/layout';
import { DetailPage, HomePage, WriteMapPage, DetailCommentPage } from 'pages';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <CommonLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/review/:reviewId" element={<DetailPage />} />
          <Route
            path="/review/comments/:reviewId"
            element={<DetailCommentPage />}
          />
          <Route path="/writemap" element={<WriteMapPage />} />
        </Routes>
      </BrowserRouter>
    </CommonLayout>
  );
};

export default Router;
