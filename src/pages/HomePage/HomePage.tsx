import React from 'react';
// import React, { useCallback, useState, useEffect } from 'react';
import { CommonLayout, NavBar } from 'components/layout';
import { ThumbnailWrapper } from 'components/homePage';
// import { useVerifyUser } from 'hooks';

export const HomePage = () => {
  // const [shouldVerify, setShouldVerify] = useState(false);

  // const { data } = useVerifyUser(shouldVerify);

  // const onVerifyHandler = useCallback(() => {
  //   setShouldVerify(true);
  // }, []);

  // useEffect(() => {
  //   if (data) console.log(data);
  // }, []);

  return (
    <CommonLayout
      header={
        <NavBar
          btnLeft={'logo'}
          btnSecondRight={'search'}
          btnRight={'mypage'}
        ></NavBar>
      }
    >
      <ThumbnailWrapper />
    </CommonLayout>
  );
};
