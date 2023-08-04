import React, { useState } from 'react';
import { Input, Button } from 'components/common';

interface LoginValue {
  email: string;
  nickname: string;
  password: string;
  passwordVerify: string;
}

export const RegisterPage = () => {
  const [loginValue, setLoginValue] = useState<LoginValue>({
    email: '',
    nickname: '',
    password: '',
    passwordVerify: '',
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    const newData: LoginValue = {
      ...loginValue,
      [e.target.name]: e.target.value,
    };
    console.log(newData);
    setLoginValue(newData);
  };
  const onSubmitHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log('click!');
  };

  return (
    <div>
      <h3>동네마실 환영합니다!</h3>

      <h4>닉네임</h4>
      <Input
        type="email"
        name="email"
        id="email"
        value={loginValue.email}
        onChange={onChangeHandler}
      />
      <p>{loginValue.email}</p>
      <h4>아이디</h4>
      <Input
        type="text"
        name="nickname"
        id="nickname"
        value={loginValue.nickname}
        onChange={onChangeHandler}
      />
      <p>{loginValue.nickname}</p>
      <h4>비밀번호</h4>
      <Input
        type="password"
        name="password"
        id="password"
        value={loginValue.password}
        onChange={onChangeHandler}
      />
      <p>{loginValue.password}</p>
      <Input
        type="password"
        name="passwordVerify"
        id="passwordVerify"
        value={loginValue.passwordVerify}
        onChange={onChangeHandler}
      />
      <p>{loginValue.passwordVerify}</p>
      <Button onClick={onSubmitHandler} label="회원가입" />
    </div>
  );
};
