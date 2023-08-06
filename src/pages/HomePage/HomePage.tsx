import React from 'react';
import { Button } from 'components/common';
import { NavBar } from 'components/layout';
import { ThumbnailWrapper } from 'components/homePage';
import { verifyUser, getNewAccessToken } from 'api/loginApi';

export const HomePage = () => {
  return (
    <div>
      <NavBar btnLeft={'logo'} btnRight={'myPage'}>
        동네마실
      </NavBar>
      <Button onClick={verifyUser}>verify user</Button>
      <Button onClick={getNewAccessToken}>refresh token</Button>
      <ThumbnailWrapper />
    </div>
  );
};
