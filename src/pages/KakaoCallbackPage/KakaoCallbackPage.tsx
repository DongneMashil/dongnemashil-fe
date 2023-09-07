import React, { useEffect, useState } from 'react';
import { loginKakaoCallback } from 'api/loginApi';
import { useMutation } from '@tanstack/react-query';
import { useVerifyUser } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { StLoginContainer } from './KakaoCalbackPage.styles';
import { StLoadingSpinner } from 'components/common';
import { ReactComponent as Logo } from 'assets/images/Dongdong.svg';

export const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const [shouldVerify, setShouldVerify] = useState(false);
  const { isSuccess } = useVerifyUser(shouldVerify);
  const { mutate } = useMutation(loginKakaoCallback, {
    onSuccess: () => {
      setShouldVerify(true);
    },
  });

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code'); // 카카오 인가 코드
    code && mutate(code);
  }, []);

  if (isSuccess) {
    navigate({
      pathname: `/`,
    });
  }

  return (
    <StLoginContainer>
      <Logo />
      <StLoadingSpinner />
    </StLoginContainer>
  );
};

export default KakaoCallbackPage;
