import React, { useState } from 'react';
import { Input, Button } from 'components/common';
import { login } from 'api/loginApi';

interface CommonLoginProps {
  id: string;
  password: string;
}

export const CommonLoginPage = () => {
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
    login(loginValues.id, loginValues.password);
  };

  console.log('loginValues', loginValues);
  return (
    <div>
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
    </div>
  );
};
