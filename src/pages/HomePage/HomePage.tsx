import MapWrapper from 'components/common/Map/MapWrapper';
import React, { useEffect } from 'react';
import { Input } from 'components/common';
import { CommonLayout, NavBar } from 'components/layout';
import { ThumbnailWrapper } from 'components/homePage';
import { useVerifyUser } from 'hooks';
import { useRecoilValue } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';

export const HomePage = () => {
  const userState = useRecoilValue(userProfileSelector);
  const { data } = useVerifyUser(true);

  useEffect(() => {
    console.log('current user state: ', userState);
    if (data) {
      console.log('useVerifyUser data: ', data);
    }
  }, [userState]);

  return (
    <CommonLayout
      header={
        <NavBar btnLeft={'logo'} btnRight={'mypage'}>
          <Input />
        </NavBar>
      }
    >
      <ThumbnailWrapper />
      <MapWrapper />
    </CommonLayout>
  );
};
