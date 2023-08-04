import { DetailPage, HomePage, WriteMapPage } from 'pages';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/review/:reviewId" element={<DetailPage />} />
        <Route path="/writemap" element={<WriteMapPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
