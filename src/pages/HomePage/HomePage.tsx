import MapWrapper from 'components/common/Map/MapWrapper';
import NavBar from 'components/layout/NavBar/NavBar';
import React from 'react';

export const HomePage = () => {
  return (
    <>
      <NavBar btnLeft={'logo'} btnRight={'myPage'}>
        동네마실
      </NavBar>
      <MapWrapper />
      HomePage
    </>
  );
};
