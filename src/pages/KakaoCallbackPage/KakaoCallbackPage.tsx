import React, { useEffect, useState } from 'react';
import { loginKakaoCallback } from 'api/loginApi';
import { useMutation } from '@tanstack/react-query';
import { useVerifyUser } from 'hooks';
import { useNavigate } from 'react-router-dom';

export const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const [shouldVerify, setShouldVerify] = useState(false);
  const { data, isSuccess } = useVerifyUser(shouldVerify);
  const { mutate } = useMutation(loginKakaoCallback, {
    onSuccess: () => {
      setShouldVerify(true);
    },
    onError: (err) => {
      console.log('Kakao login Error: ', err);
    },
  });

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code'); // 카카오 인가 코드
    code && mutate(code);
  }, []);

  if (isSuccess) {
    console.log('Kakao Login Success ', data);
    navigate({
      pathname: `/`,
    });
  }

  return <div>카카오 인증중 ...</div>;
};
