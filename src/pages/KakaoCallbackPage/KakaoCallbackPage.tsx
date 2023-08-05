import React, { useEffect } from 'react';
import { loginKakaoCallback } from 'api/loginApi';

export const KakaoCallbackPage = () => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code'); // 카카오 인가 코드
    console.log(code);
    code && loginKakaoCallback(code);
  }, []);

  return <div>카카오 인증중 ...</div>;
};
