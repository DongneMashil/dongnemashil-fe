import React from 'react';
import { useNavigate } from 'react-router';
import { loginKakao } from 'api/loginApi';
import { CommonLayout } from 'components/layout';
import { Button } from 'components/common';
import {
  StLoginContainer,
  StLoginTag,
  StLoginButtonWrapper,
} from './LoginPage.styles';
import { ReactComponent as LogoImage } from 'assets/images/Logo.svg';
import { ReactComponent as Lightning } from 'assets/icons/Lightning.svg';
import { ReactComponent as KakaoIcon } from 'assets/icons/KakaoIcon.svg';

export const LoginPage = () => {
  const navigate = useNavigate();

  const onKakaoHandler = () => {
    loginKakao();
  };
  const onLoginHandler = () => {
    navigate('/login/common');
  };
  const onRegisterHandler = () => {
    navigate('/register');
  };

  return (
    <CommonLayout>
      <StLoginContainer>
        <LogoImage width={190} height={214} />
        <StLoginButtonWrapper>
          <StLoginTag>
            3초만에 시작하기
            <Lightning />
          </StLoginTag>
          <Button type="authKakao" onClick={onKakaoHandler}>
            <KakaoIcon />
            카카오로 로그인
          </Button>
          <Button type="authNormal" onClick={onLoginHandler}>
            회원 아이디로 로그인
          </Button>
          <Button type="authOutline" onClick={onRegisterHandler}>
            회원가입
          </Button>
        </StLoginButtonWrapper>
      </StLoginContainer>
    </CommonLayout>
  );
};
