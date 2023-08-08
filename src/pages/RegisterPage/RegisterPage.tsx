import React, { useState, useEffect } from 'react';
//import { CommonLayout, NavBar } from 'components/layout';
import { Input, Button } from 'components/common';
import { register } from 'api/loginApi';
import { StVerifyMsg } from './Registerpage.styles';
import { useMutation } from '@tanstack/react-query';
import { useVerifyUser } from 'hooks';

interface RegitserProps {
  email: string;
  nickname: string;
  password: string;
  passwordVerify: string;
}

interface VerifyMsgProps {
  email: {
    msg: string;
    isValid: boolean;
  };
  nickname: {
    msg: string;
    isValid: boolean;
  };
  password: {
    msg: string;
    isValid: boolean;
  };
  passwordVerify: {
    msg: string;
    isValid: boolean;
  };
}

export const RegisterPage = () => {
  const [shouldVerify, setShouldVerify] = useState(false);
  const { data } = useVerifyUser(shouldVerify);

  const [RegitserProps, setRegitserProps] = useState<RegitserProps>({
    email: '',
    nickname: '',
    password: '',
    passwordVerify: '',
  });

  const [verifyMsg, setVerifyMsg] = useState<VerifyMsgProps>({
    email: {
      msg: '',
      isValid: false,
    },
    nickname: {
      msg: '',
      isValid: false,
    },
    password: {
      msg: '',
      isValid: false,
    },
    passwordVerify: {
      msg: '',
      isValid: false,
    },
  });

  const emailRegex = new RegExp(`[a-z0-9]+@[a-z]+\\.[a-z]{2,3}`);

  const { mutate } = useMutation(register, {
    onSuccess: () => {
      setShouldVerify(true);
    },
    onError: (err) => {
      console.log('Register Error: ', err);
    },
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    const newData: RegitserProps = {
      ...RegitserProps,
      [e.target.name]: e.target.value,
    };
    const newVerifyMsg: VerifyMsgProps = {
      ...verifyMsg,
    };
    console.log('newVerifyMsg', newVerifyMsg);
    console.log(newData);
    setRegitserProps(newData);

    switch (e.target.type) {
      case 'email':
        newVerifyMsg.email = emailRegex.test(e.target.value)
          ? {
              msg: '조건 충족',
              isValid: true,
            }
          : {
              msg: '조건 미충족',
              isValid: false,
            };
        break;
      case 'nickname':
        break;
      case 'password':
        break;
      case 'passwordVerify':
        break;
      default:
        break;
    }
    setVerifyMsg(newVerifyMsg);
  };

  const onSubmitHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    mutate({
      email: RegitserProps.email,
      nickname: RegitserProps.nickname,
      password: RegitserProps.password,
    });
  };

  useEffect(() => {
    if (data) {
      console.log('Register Success ', data);
      window.location.href = '/';
    }
  }, []);

  return (
    <div>
      <h3>동네마실 환영합니다!</h3>
      <h4>이메일</h4>
      <Input
        type="email"
        name="email"
        id="email"
        value={RegitserProps.email}
        onChange={onChangeHandler}
      />
      <StVerifyMsg $isValid={verifyMsg.email.isValid}>
        {verifyMsg.email.msg}
      </StVerifyMsg>
      <h4>닉네임</h4>
      <Input
        type="text"
        name="nickname"
        id="nickname"
        value={RegitserProps.nickname}
        onChange={onChangeHandler}
      />
      <p>{verifyMsg.nickname.msg}</p>
      <h4>비밀번호</h4>
      <Input
        type="password"
        name="password"
        id="password"
        value={RegitserProps.password}
        onChange={onChangeHandler}
      />
      <p>{verifyMsg.password.msg}</p>
      <Input
        type="password"
        name="passwordVerify"
        id="passwordVerify"
        value={RegitserProps.passwordVerify}
        onChange={onChangeHandler}
      />
      <p>{verifyMsg.passwordVerify.msg}</p>
      <Button onClick={onSubmitHandler}>회원가입</Button>
    </div>
  );
};
