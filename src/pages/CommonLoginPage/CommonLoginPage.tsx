import React, { useState, useCallback, useMemo } from 'react';
import { AuthNavButton } from 'components/common';
import { AuthInputBox, AuthLogoBox } from 'components/common';
import { login } from 'api/loginApi';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useVerifyUser } from 'hooks';
import { LoginErrorMsgBox } from 'components/commonLoginPage/LoginErrorMsgBox/LoginErrorMsgBox';
import {
  StCommonLoginLayout,
  StCommonLoginContainer,
} from './CommonLoginPage.styles';
import { LoginBtnWrapper } from 'components/commonLoginPage/LoginBtnWrapper/LoginBtnWrapper';

export const CommonLoginPage = () => {
  const navigate = useNavigate();
  const [shouldVerify, setShouldVerify] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { isSuccess } = useVerifyUser(shouldVerify);
  const { mutate: loginMutate } = useMutation(login, {
    onSuccess: () => {
      // console.log('Common Login Success');
      setShouldVerify(true);
    },
    onError: (err: Error) => {
      // console.log('Common Login Error:', err);
      setErrorMsg(err.message);
    },
  });

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isButtonActive = useMemo(() => {
    return email !== '' && password !== '';
  }, [email, password]);

  const onEmailHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    [email]
  );
  const onPasswordHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    [password]
  );

  const onSubmitHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    loginHandler();
  };

  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isButtonActive) {
      e.preventDefault();
      loginHandler();
    }
  };

  const loginHandler = useCallback(() => {
    loginMutate({
      email,
      password,
    });
  }, [email, password]);

  if (isSuccess) {
    // console.log('로그인 성공');
    navigate({
      pathname: `/`,
    });
  }
  // console.log('errmsg', errorMsg);
  return (
    <StCommonLoginLayout>
      <AuthNavButton type="exit" page="commonLogin" />
      <StCommonLoginContainer>
        <AuthLogoBox align="center" />
        <AuthInputBox
          type="email"
          name="id"
          id="id"
          value={email}
          onChange={onEmailHandler}
          placeholder="아이디"
        />
        <AuthInputBox
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={onPasswordHandler}
          onKeyDown={onKeyDownHandler}
          placeholder="비밀번호"
        />
        <LoginErrorMsgBox errorMsg={errorMsg} />
        <LoginBtnWrapper
          type="authNormal"
          onClick={onSubmitHandler}
          $active={isButtonActive}
          label="로그인"
        />
      </StCommonLoginContainer>
    </StCommonLoginLayout>
  );
};

export default CommonLoginPage;
