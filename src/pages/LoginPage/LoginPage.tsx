import React, { useState } from 'react';
import { Input } from 'components/common';

interface LoginValue {
  email: string;
  nickname: string;
  password: string;
  passwordVerify: string;
}

export const LoginPage = () => {
  const [loginValue, setLoginValue] = useState<LoginValue>({
    email: '',
    nickname: '',
    password: '',
    passwordVerify: '',
  });

  const handleValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    const newData: LoginValue = {
      ...loginValue,
      [e.target.name]: e.target.value,
    };
    console.log(newData);
    setLoginValue(newData);
  };

  return (
    <>
      <Input
        type="email"
        name="email"
        id="email"
        value={loginValue.email}
        onChange={handleValues}
      />
      <p>{loginValue.email}</p>
      <Input
        type="text"
        name="nickname"
        id="nickname"
        value={loginValue.nickname}
        onChange={handleValues}
      />
      <p>{loginValue.nickname}</p>
      <Input
        type="password"
        name="password"
        id="password"
        value={loginValue.password}
        onChange={handleValues}
      />
      <p>{loginValue.password}</p>
      <Input
        type="password"
        name="passwordVerify"
        id="passwordVerify"
        value={loginValue.passwordVerify}
        onChange={handleValues}
      />
      <p>{loginValue.passwordVerify}</p>
    </>
  );
};
