import React from 'react';
import { TempButton } from 'components/common';
import { NavBar } from 'components/layout';
import { ThumbnailWrapper } from 'components/homePage';

export const HomePage = () => {
  return (
    <div>
      <NavBar btnLeft={'logo'} btnRight={'myPage'}>
        동네마실
      </NavBar>
      <ThumbnailWrapper />
      <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
        <TempButton colorType="black">까망 버튼 :)</TempButton>
        <TempButton colorType="blue">파랑 버튼 :)</TempButton>
      </div>
    </div>
  );
};
