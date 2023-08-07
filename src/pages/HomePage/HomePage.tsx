import React from 'react';
import { Input, TempButton } from 'components/common';
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
      <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
        <TempButton colorType="black">까망 버튼 :)</TempButton>
        <TempButton colorType="blue">파랑 버튼 :)</TempButton>
      </div>
    </CommonLayout>
  );
};
