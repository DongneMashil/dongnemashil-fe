import React, { useState } from 'react';
import { Input, Button } from 'components/common';
import { login, verifyUser } from 'api/loginApi';
import { useMutation } from 'react-query';
import { UserState, userProfileSelector } from 'recoil/userExample';
import { useSetRecoilState } from 'recoil';

interface CommonLoginProps {
  id: string;
  password: string;
}

export const CommonLoginPage = () => {
  const setLoginState = useSetRecoilState(userProfileSelector);
  const { mutate } = useMutation(login, {
    onSuccess: () => {
      const data = verifyUser();
      console.log('CommonLogin ', data);
      const newData: UserState = {
        userId: '성공!',
        nickName: '',
        profileImage: '',
        isLoggedIn: true,
      }; // 체크 필요
      setLoginState(newData);
    },
    onError: (err) => {
      console.log('Common Login Error: ', err);
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
