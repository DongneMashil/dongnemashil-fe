import React from 'react';
import NavBar from 'components/layout/NavBar/NavBar';
import { TempButton } from 'components/common';

export const HomePage = () => {
  return (
    <div>
      <NavBar btnLeft={'logo'} btnRight={'myPage'}>
        동네마실
      </NavBar>
      HomePage
      <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
        <TempButton colorType="black">까망 버튼 :)</TempButton>
        <TempButton colorType="blue">파랑 버튼 :)</TempButton>
      </div>
    </div>
  );
};
