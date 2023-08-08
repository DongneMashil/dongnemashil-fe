import React, { useEffect, useState } from 'react';
import { loginKakaoCallback } from 'api/loginApi';
import { useMutation } from '@tanstack/react-query';
import { useVerifyUser } from 'hooks';

export const KakaoCallbackPage = () => {
  const [shouldVerify, setShouldVerify] = useState(false);
  const { data } = useVerifyUser(shouldVerify);
  const { mutate } = useMutation(loginKakaoCallback, {
    onSuccess: () => {
      setShouldVerify(true);
      window.location.href = '/';
    },
    onError: (err) => {
      console.log('Kakao login Error: ', err);
    },
  });

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code'); // 카카오 인가 코드
    code && mutate(code);

    if (data) {
      console.log('Common Login Success ', data);
    }
  }, []);

  return <div>카카오 인증중 ...</div>;
};
