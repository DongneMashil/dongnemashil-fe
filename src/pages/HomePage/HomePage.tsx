import MapWrapper from 'components/common/Map/MapWrapper';
import React, { useCallback, useState, useEffect } from 'react';
import { Button, Input } from 'components/common';
import { CommonLayout, NavBar } from 'components/layout';
import { ThumbnailWrapper } from 'components/homePage';
import { getNewAccessToken } from 'api/loginApi';
import { useVerifyUser } from 'hooks';

export const HomePage = () => {
  const [shouldVerify, setShouldVerify] = useState(false);
  // const [shouldLogout, setShouldLogout] = useState(false);

  const { data } = useVerifyUser(shouldVerify);
  // const { dataLogout } = useVerifyUser(shouldLogout);

  const onVerifyHandler = useCallback(() => {
    setShouldVerify(true);
  }, []);

  const onLogoutHandler = useCallback(() => {
    // setShouldLogout(true);
  }, []);

  useEffect(() => {
    if (data) console.log(data);
    // if (dataLogout) console.log(dataLogout);
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
        <Button onClick={onLogoutHandler}>Logout</Button>
      </div>
      <MapWrapper />
    </CommonLayout>
  );
};
