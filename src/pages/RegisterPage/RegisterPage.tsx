import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { AuthInputBox } from 'components/common/AuthInputBox/AuthInputBox';
import { Button } from 'components/common';
import { register, confirmId, confirmNickname } from 'api/loginApi';
import { useMutation } from '@tanstack/react-query';
import { useVerifyUser } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { HeaderText } from 'components/common/HeaderText/HeaderText';
import { AuthLogoBox } from 'components/common';
import { CommonLayout } from 'components/layout';
import {
  StLoginContainer,
  StLoginWrapper,
  StErrorMsgBox,
  StInputLabel,
  StButtonWrapper,
} from './Registerpage.styles';
import { AuthErrorMsg } from 'components/common/AuthErrorMsg/AuthErrorMsg';

interface registerValues {
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

const initialVerifyMsg = {
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
};

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [shouldVerify, setShouldVerify] = useState<boolean>(false);
  const [isNotDuplicated, setIsNotDuplicated] = useState({
    email: false,
    nickname: false,
  });
  const [registerValues, setRegisterValues] = useState<registerValues>({
    email: '',
    nickname: '',
    password: '',
    passwordVerify: '',
  });
  const [verifyMsg, setVerifyMsg] = useState<VerifyMsgProps>(initialVerifyMsg);

  const emailRegex = new RegExp(`[a-z0-9]+@[a-z]+\\.[a-z]{2,3}`);
  const nicknameRegex = new RegExp(`^(?=.*[A-Za-z0-9가-힣]).{4,}$`);
  const pwRegex = new RegExp(
    `^(?=.*[a-zA-Z])(?=.*[!@#$%^*])(?=.*[0-9]).{8,15}$`
  );

  const { data } = useVerifyUser(shouldVerify);
  const { mutate: registerMutate } = useMutation(register, {
    onSuccess: () => {
      setShouldVerify(true);
      navigate(`/`);
    },
    onError: (err: AxiosError) => {
      console.log('Register Error: ', err);
      window.alert(err);
    },
  });

  const { mutate: confirmIdMutate } = useMutation(confirmId, {
    onSuccess: () => {
      const newData = {
        ...verifyMsg,
        email: {
          msg: `사용가능한 아이디 입니다.`,
          isValid: true,
        },
      };
      setVerifyMsg(newData);
      setIsNotDuplicated({
        ...isNotDuplicated,
        email: true,
      });
      console.log(`confirm id success`, newData);
    },
    onError: (err: Error) => {
      console.log('confirmIdMutate error', err);
      const newData = {
        ...verifyMsg,
        email: {
          msg: err.message,
          isValid: false,
        },
      };
      setVerifyMsg(newData);
      console.log(`confirm id failed`, newData);
    },
  });

  const { mutate: confirmNicknameMutate } = useMutation(confirmNickname, {
    onSuccess: () => {
      const newData = {
        ...verifyMsg,
        nickname: {
          msg: `사용가능한 닉네임 입니다.`,
          isValid: true,
        },
      };
      setVerifyMsg(newData);
      setIsNotDuplicated({
        ...isNotDuplicated,
        nickname: true,
      });
      console.log(`confirm nickname success`, newData);
    },
    onError: (err: Error) => {
      console.log('confirmNicknameMutate error', err);
      const newData = {
        ...verifyMsg,
        nickname: {
          msg: err.message,
          isValid: false,
        },
      };
      setVerifyMsg(newData);
      console.log(`confirm nickname failed`, newData);
    },
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData: registerValues = {
      ...registerValues,
      [e.target.name]: e.target.value,
    };
    const newVerifyMsg: VerifyMsgProps = {
      ...verifyMsg,
    };
    setRegisterValues(newData);

    switch (e.target.name) {
      case 'email':
        newVerifyMsg.email = emailRegex.test(e.target.value)
          ? {
              msg: `이메일 형식이 일치합니다.`,
              isValid: true,
            }
          : {
              msg: `이메일 형식이 일치하지 않습니다.`,
              isValid: false,
            };
        break;
      case 'nickname':
        newVerifyMsg.nickname = nicknameRegex.test(e.target.value)
          ? {
              msg: `닉네임 형식이 일치합니다.`,
              isValid: true,
            }
          : {
              msg: `닉네임 형식이 맞지 않습니다.`,
              isValid: false,
            };
        break;
      case 'password':
        newVerifyMsg.password = pwRegex.test(e.target.value)
          ? {
              msg: '사용 가능한 비밀번호입니다.',
              isValid: true,
            }
          : {
              msg: `비밀번호는 최소 8자리 이상15자리 이하,
              영문 숫자, 특수문자(!@#$%^&*)가 최소 하나 포함되어야 합니다.`,
              isValid: false,
            };
        break;
      case 'passwordVerify':
        if (registerValues.password !== '') {
          newVerifyMsg.passwordVerify =
            e.target.value === registerValues.password
              ? {
                  msg: `비밀번호가 일치합니다.`,
                  isValid: true,
                }
              : {
                  msg: `비밀번호가 일치하지 않습니다`,
                  isValid: false,
                };
        }
        break;
      default:
        break;
    }
    setVerifyMsg(newVerifyMsg);
  };

  const onSubmitHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    registerMutate({
      email: registerValues.email,
      nickname: registerValues.nickname,
      password: registerValues.password,
    });
  };

  const onConfirmIdHandler = () => {
    if (registerValues.email === '') {
      window.alert('이메일을 입력한 뒤 실행해주세요.');
    } else if (verifyMsg.email.isValid === false) {
      window.alert('올바른 양식의 이메일을 입력해주세요.');
    } else confirmIdMutate(registerValues.email);
  };

  const onConfirmNicknameHandler = () => {
    if (registerValues.nickname === '') {
      window.alert('닉네임을 입력한 뒤 실행해주세요.');
    } else if (verifyMsg.nickname.isValid === false) {
      window.alert('올바른 양식의 닉네임을 입력해주세요.');
    } else confirmNicknameMutate(registerValues.nickname);
  };

  useEffect(() => {
    if (data) {
      console.log('Register Success ', data);
      navigate('/');
    }
  }, []);

  return (
    <CommonLayout>
      <StLoginContainer>
        <AuthLogoBox />
        <HeaderText type="h1">회원가입</HeaderText>
        <StLoginWrapper>
          <StInputLabel>이메일</StInputLabel>
          <AuthInputBox
            type="email"
            name="email"
            id="email"
            value={registerValues.email}
            placeholder="이메일을 입력해주세요"
            onChange={onChangeHandler}
            onClick={onConfirmIdHandler}
            btnText="중복 확인"
          />
          {verifyMsg.email.msg && (
            <StErrorMsgBox>
              <AuthErrorMsg isValid={verifyMsg.email.isValid}>
                {verifyMsg.email.msg}
              </AuthErrorMsg>
            </StErrorMsgBox>
          )}
          <StInputLabel>닉네임</StInputLabel>
          <AuthInputBox
            type="text"
            name="nickname"
            id="nickname"
            value={registerValues.nickname}
            onChange={onChangeHandler}
            placeholder="한글 또는 영문 대소문자 4자리 이상"
            onClick={onConfirmNicknameHandler}
            btnText="중복 확인"
          />
          {verifyMsg.nickname.msg && (
            <StErrorMsgBox>
              <AuthErrorMsg isValid={verifyMsg.nickname.isValid}>
                {verifyMsg.nickname.msg}
              </AuthErrorMsg>
            </StErrorMsgBox>
          )}
          <StInputLabel>비밀번호</StInputLabel>
          <AuthInputBox
            type="password"
            name="password"
            id="password"
            value={registerValues.password}
            onChange={onChangeHandler}
            placeholder="영문, 숫자, 특수문자(!@#$%^&*) 포함 8~15자리"
          />
          {verifyMsg.password.msg && (
            <StErrorMsgBox>
              <AuthErrorMsg isValid={verifyMsg.password.isValid}>
                {verifyMsg.password.msg}
              </AuthErrorMsg>
            </StErrorMsgBox>
          )}
          <AuthInputBox
            type="password"
            name="passwordVerify"
            id="passwordVerify"
            value={registerValues.passwordVerify}
            onChange={onChangeHandler}
            placeholder="비밀번호 확인"
          />
          {verifyMsg.passwordVerify.msg && (
            <StErrorMsgBox>
              <AuthErrorMsg isValid={verifyMsg.passwordVerify.isValid}>
                {verifyMsg.passwordVerify.msg}
              </AuthErrorMsg>
            </StErrorMsgBox>
          )}
        </StLoginWrapper>
        <StButtonWrapper>
          <Button
            type="authNormal"
            onClick={onSubmitHandler}
            $active={
              verifyMsg.email.isValid &&
              verifyMsg.nickname.isValid &&
              verifyMsg.password.isValid &&
              verifyMsg.passwordVerify.isValid &&
              isNotDuplicated.email &&
              isNotDuplicated.nickname
            }
          >
            회원가입
          </Button>
        </StButtonWrapper>
      </StLoginContainer>
    </CommonLayout>
  );
};
