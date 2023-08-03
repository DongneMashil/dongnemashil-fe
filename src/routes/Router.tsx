import { HomePage, LoginPage, DetailPage } from 'pages';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/review/:reviewId" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
