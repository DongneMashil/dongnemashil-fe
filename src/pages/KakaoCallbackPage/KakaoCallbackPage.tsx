import React, { useEffect } from 'react';

export const KakaoCallbackPage = () => {
  const code = new URL(window.location.href).searchParams.get('code'); // 카카오 인가 코드

  useEffect(() => {
    console.log(code);
    //await dispatch(userActions.loginKakaoCallback(code));
  }, []);

  return <div>카카오 인증중 ...</div>;
};
