import React from 'react';
import { useNavigate } from 'react-router';
import { loginKakao } from 'api/loginApi';
import { CommonLayout } from 'components/layout';
import {
  StLoginContainer,
  StLoginButton,
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
        <LogoImage />
        <StLoginButtonWrapper>
          <StLoginTag>
            3초만에 시작하기
            <Lightning />
          </StLoginTag>
          <StLoginButton $type="kakao" onClick={onKakaoHandler}>
            <KakaoIcon />
            카카오로 로그인
          </StLoginButton>
          <StLoginButton onClick={onLoginHandler}>
            회원 아이디로 로그인
          </StLoginButton>
          <StLoginButton $type="register" onClick={onRegisterHandler}>
            회원가입
          </StLoginButton>
        </StLoginButtonWrapper>
      </StLoginContainer>
    </CommonLayout>
  );
};
