import React from 'react';
import { Input } from 'components/common';
import { CommonLayout, NavBar } from 'components/layout';
import { ThumbnailWrapper } from 'components/homePage';

export const HomePage = () => {
  return (
    <CommonLayout
      header={
        <NavBar btnLeft={'logo'} btnRight={'mypage'}>
          <Input />
        </NavBar>
      }
    >
      <ThumbnailWrapper />
    </CommonLayout>
  );
};
