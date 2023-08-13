import React, { useState, useEffect } from 'react';
import { AuthInputBox } from 'components/common/AuthInputBox/AuthInputBox';
import { Button } from 'components/common';
import { register } from 'api/loginApi';
import { StVerifyMsg } from './Registerpage.styles';
import { useMutation } from '@tanstack/react-query';
import { useVerifyUser } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { HeaderText } from 'components/common/HeaderText/HeaderText';
import { AuthLogoBox } from 'components/common';
import { CommonLayout } from 'components/layout';
import { StLoginContainer, StLoginWrapper } from './Registerpage.styles';

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
  const navigate = useNavigate();

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
      navigate(`/`);
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
    <CommonLayout>
      <StLoginContainer>
        <AuthLogoBox />
        <HeaderText type="h1">회원가입</HeaderText>
        <StLoginWrapper>
          <h4>이메일</h4>
          <AuthInputBox
            type="email"
            name="email"
            id="email"
            value={RegitserProps.email}
            placeholder="이메일을 입력해주세요"
            onChange={onChangeHandler}
            onClick={() => console.log('이메일 중복확인 클릭!')}
            btnText="중복 확인"
          />
          <StVerifyMsg $isValid={verifyMsg.email.isValid}>
            {verifyMsg.email.msg}
          </StVerifyMsg>
          <h4>닉네임</h4>
          <AuthInputBox
            type="text"
            name="nickname"
            id="nickname"
            value={RegitserProps.nickname}
            onChange={onChangeHandler}
            placeholder="한글 또는 영문 대소문자 4자리 이상"
            onClick={() => console.log('닉네임 중복확인 클릭!')}
            btnText="중복 확인"
          />
          <p>{verifyMsg.nickname.msg}</p>
          <h4>비밀번호</h4>
          <AuthInputBox
            type="password"
            name="password"
            id="password"
            value={RegitserProps.password}
            onChange={onChangeHandler}
            placeholder="영문, 숫자, 특수문자(!@#$%^&*) 포함 8~15자리"
          />
          <p>{verifyMsg.password.msg}</p>
          <AuthInputBox
            type="password"
            name="passwordVerify"
            id="passwordVerify"
            value={RegitserProps.passwordVerify}
            onChange={onChangeHandler}
          />
          <p>{verifyMsg.passwordVerify.msg}</p>
        </StLoginWrapper>
        <Button type="authNormal" onClick={onSubmitHandler} $active={false}>
          회원가입
        </Button>
      </StLoginContainer>
    </CommonLayout>
  );
};
