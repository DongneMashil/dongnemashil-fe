import React, { useState } from 'react';
import { Input, Button } from 'components/common';
import { CommonLayout } from 'components/layout';
import { login } from 'api/loginApi';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useVerifyUser } from 'hooks';
import { StCommonLoginLayout } from './CommonLoginPage.styles';

interface CommonLoginProps {
  id: string;
  password: string;
}

export const CommonLoginPage = () => {
  const navigate = useNavigate();
  const [shouldVerify, setShouldVerify] = useState(false);
  const { isSuccess } = useVerifyUser(shouldVerify);
  const { mutate } = useMutation(login, {
    onSuccess: () => {
      console.log('Common Login Success');
      setShouldVerify(true);
    },
    onError: (err) => {
      console.log('Common Login Error:', err);
    },
  });

  const [loginValues, setLoginValues] = useState<CommonLoginProps>({
    id: '',
    password: '',
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData: CommonLoginProps = {
      ...loginValues,
      [e.target.name]: e.target.value,
    };
    setLoginValues(newData);
  };

  const onSubmitHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    mutate({
      email: loginValues.id,
      password: loginValues.password,
    });
  };

  if (isSuccess) {
    console.log('로그인 성공');
    navigate({
      pathname: `/`,
    });
  }
  console.log('loginValues', loginValues);
  return (
    <CommonLayout>
      <StCommonLoginLayout>
        <h3>회원 아이디로 로그인</h3>
        <h4>아이디</h4>
        <Input
          type="email"
          name="id"
          id="id"
          value={loginValues.id}
          onChange={onChangeHandler}
        />
        <h4>password</h4>
        <Input
          type="password"
          name="password"
          id="password"
          value={loginValues.password}
          onChange={onChangeHandler}
        />
        <Button onClick={onSubmitHandler}>로그인</Button>
      </StCommonLoginLayout>
    </CommonLayout>
  );
};
