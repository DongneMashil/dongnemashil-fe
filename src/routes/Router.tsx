import { DetailPage, HomePage, PostMapPage } from 'pages';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/review/:reviewId" element={<DetailPage />} />
        <Route path="/postmap" element={<PostMapPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
