import React, { useState, useCallback } from 'react';
import { Button, AuthNavButton } from 'components/common';
import { AuthInputBox, AuthLogoBox, AuthErrorMsg } from 'components/common';
import { login } from 'api/loginApi';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useVerifyUser } from 'hooks';
import {
  StCommonLoginLayout,
  StLoginErrorMsgBox,
  StLoginButtonWrapper,
} from './CommonLoginPage.styles';

interface CommonLoginProps {
  id: string;
  password: string;
}

export const CommonLoginPage = () => {
  const navigate = useNavigate();
  const [shouldVerify, setShouldVerify] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { isSuccess } = useVerifyUser(shouldVerify);
  const { mutate } = useMutation(login, {
    onSuccess: () => {
      console.log('Common Login Success');
      setShouldVerify(true);
    },
    onError: (err: Error) => {
      console.log('Common Login Error:', err);
      setErrorMsg(err.message);
    },
  });

  const [loginValues, setLoginValues] = useState<CommonLoginProps>({
    id: '',
    password: '',
  });

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newData: CommonLoginProps = {
        ...loginValues,
        [e.target.name]: e.target.value,
      };
      setLoginValues(newData);
    },
    []
  );

  const onSubmitHandler = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    mutate({
      email: loginValues.id,
      password: loginValues.password,
    });
  }, []);

  if (isSuccess) {
    console.log('로그인 성공');
    navigate({
      pathname: `/`,
    });
  }
  console.log('loginValues', loginValues);
  console.log('errmsg', errorMsg);
  return (
    <>
      <AuthNavButton type="exit" />
      <StCommonLoginLayout>
        <AuthLogoBox align="center" />
        <AuthInputBox
          type="email"
          name="id"
          id="id"
          value={loginValues.id}
          onChange={onChangeHandler}
          placeholder="아이디"
        />
        <AuthInputBox
          type="password"
          name="password"
          id="password"
          value={loginValues.password}
          onChange={onChangeHandler}
          placeholder="비밀번호"
        />
        <StLoginErrorMsgBox>
          {errorMsg && <AuthErrorMsg isValid={false}>{errorMsg}</AuthErrorMsg>}
        </StLoginErrorMsgBox>
        <StLoginButtonWrapper>
          <Button
            type="authNormal"
            onClick={onSubmitHandler}
            $active={loginValues.id !== '' && loginValues.password !== ''}
          >
            로그인
          </Button>
        </StLoginButtonWrapper>
      </StCommonLoginLayout>
    </>
  );
};
