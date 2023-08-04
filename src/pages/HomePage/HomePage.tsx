import NavBar from 'components/layout/NavBar/NavBar';
import React from 'react';

export const HomePage = () => {
  return (
    <div>
      <NavBar btnLeft={'logo'} btnRight={'myPage'}>
        동네마실
      </NavBar>
      HomePage
    </div>
  );
};
