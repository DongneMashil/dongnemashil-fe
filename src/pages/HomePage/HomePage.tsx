import MapWrapper from 'components/common/Map/MapWrapper';
import React, { useCallback, useState, useEffect } from 'react';
import { Button, Input } from 'components/common';
import { CommonLayout, NavBar } from 'components/layout';
import { ThumbnailWrapper } from 'components/homePage';
import { getNewAccessToken } from 'api/loginApi';
import { useVerifyUser } from 'hooks';

export const HomePage = () => {
  const [shouldVerify, setShouldVerify] = useState(false);

  const { data } = useVerifyUser(shouldVerify);

  const onVerifyHandler = useCallback(() => {
    setShouldVerify(true);
  }, []);

  useEffect(() => {
    if (data) console.log(data);
  }, []);

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
        <Button onClick={onVerifyHandler}>Verify User</Button>
        <Button onClick={getNewAccessToken}>Get New Access Token</Button>
      </div>
      <MapWrapper />
    </CommonLayout>
  );
};
