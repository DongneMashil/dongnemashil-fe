import React from 'react';
import { useNavigate } from 'react-router';
import { loginKakao } from 'api/loginApi';
import { CommonLayout } from 'components/layout';
import { Button } from 'components/common';
import {
  StLoginContainer,
  StLogoWrapper,
  StLoginTag,
  StLoginButtonWrapper,
} from './LoginPage.styles';
import { ReactComponent as Lightning } from 'assets/icons/Lightning.svg';
import { ReactComponent as KakaoIcon } from 'assets/icons/KakaoIcon.svg';
import { ReactComponent as BackButton } from 'assets/icons/ChevronLeft.svg';
import { ReactComponent as LogoText } from 'assets/images/LogoText.svg';
import { ReactComponent as Logo } from 'assets/images/Dongdong.svg';

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
  // const onBackHandler = () => {
  //   navigate(-1);
  // };

  return (
    <CommonLayout>
      <StLoginContainer>
        <Button type="icon" url="/">
          <BackButton />
        </Button>
        <StLoginButtonWrapper>
          <StLogoWrapper>
            <LogoText />
            <Logo />
          </StLogoWrapper>
          <StLoginTag>
            3초만에 시작하기
            <Lightning />
          </StLoginTag>
          <Button type="authKakao" $active={true} onClick={onKakaoHandler}>
            <KakaoIcon />
            카카오로 로그인
          </Button>
          <Button type="authNormal" $active={true} onClick={onLoginHandler}>
            회원 아이디로 로그인
          </Button>
          <hr />
          <Button type="authOutline" $active={true} onClick={onRegisterHandler}>
            회원가입
          </Button>
        </StLoginButtonWrapper>
      </StLoginContainer>
    </CommonLayout>
  );
};
