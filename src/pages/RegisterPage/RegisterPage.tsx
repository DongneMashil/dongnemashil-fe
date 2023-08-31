import React, { useState, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';
import { AxiosError } from 'axios';
import {
  HeaderText,
  AuthLogoBox,
  AuthInputBox,
  AuthErrorMsg,
  AuthNavButton,
} from 'components/common';
import { register, confirmId, confirmNickname } from 'api/loginApi';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { RegisterLabel } from 'components/registerPage/RegisterLabel/RegisterLabel';
import {
  StLoginContainer,
  StLoginWrapper,
  StErrorMsgBox,
} from './Registerpage.styles';
import { RegisterBtnWrapper } from 'components/registerPage/RegisterBtnWrapper/RegisterBtnWrapper';
import { Modal } from 'components/common';

interface VerifyMsgProps {
  msg: string;
  isValid: boolean;
}

export const RegisterPage = React.memo(() => {
  const navigate = useNavigate();
  const [isValidModalOpen, setIsValidModalOpen] = useState<boolean>(false);
  const [isFinishedModalOpen, setIsFinishedModalOpen] =
    useState<boolean>(false);
  const [modalMsg, setModalMsg] = useState<string>('');
  const [isNotDuplicated, setIsNotDuplicated] = useState({
    email: false,
    nickname: false,
  });

  const [email, setEmail] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVerify, setPasswordVerify] = useState<string>('');

  const [emailMsg, setEmailMsg] = useState<VerifyMsgProps>({
    msg: '',
    isValid: false,
  });
  const [nicknameMsg, setNicknameMsg] = useState<VerifyMsgProps>({
    msg: '',
    isValid: false,
  });
  const [passwordMsg, setPasswordMsg] = useState<VerifyMsgProps>({
    msg: '',
    isValid: false,
  });
  const [passwordVerifyMsg, setPasswordVerifyMsg] = useState<VerifyMsgProps>({
    msg: '',
    isValid: false,
  });
  const isButtonActive = useMemo(() => {
    return (
      emailMsg.isValid &&
      nicknameMsg.isValid &&
      passwordMsg.isValid &&
      passwordVerifyMsg.isValid &&
      isNotDuplicated.email &&
      isNotDuplicated.nickname
    );
  }, [
    emailMsg.isValid,
    nicknameMsg.isValid,
    passwordMsg.isValid,
    passwordVerifyMsg.isValid,
    isNotDuplicated,
  ]);

  const emailRegex = new RegExp(`[a-z0-9]+@[a-z]+\\.[a-z]{2,3}`);
  const nicknameRegex = new RegExp(`^(?=.*[A-Za-z0-9가-힣]).{4,}$`);
  const pwRegex = new RegExp(
    `^(?=.*[a-zA-Z])(?=.*[!@#$%^*])(?=.*[0-9]).{8,15}$`
  );

  const { mutate: registerMutate } = useMutation(register, {
    onSuccess: () => {
      setIsFinishedModalOpen(true);
    },
    onError: (err: AxiosError) => {
      // console.log('Register Error: ', err);
      window.alert(err);
    },
  });

  const { mutate: confirmIdMutate } = useMutation(confirmId, {
    onSuccess: () => {
      const newData = {
        msg: `사용가능한 아이디 입니다.`,
        isValid: true,
      };
      setEmailMsg(newData);
      setIsNotDuplicated({
        ...isNotDuplicated,
        email: true,
      });
    },
    onError: (err: Error) => {
      const newData = {
        msg: err.message,
        isValid: false,
      };
      setEmailMsg(newData);
    },
  });

  const { mutate: confirmNicknameMutate } = useMutation(confirmNickname, {
    onSuccess: () => {
      const newData = {
        msg: `사용가능한 닉네임 입니다.`,
        isValid: true,
      };
      setNicknameMsg(newData);
      setIsNotDuplicated({
        ...isNotDuplicated,
        nickname: true,
      });
      // console.log(`confirm nickname success`, newData);
    },
    onError: (err: Error) => {
      // console.log('confirmNicknameMutate error', err);
      const newData = {
        msg: err.message,
        isValid: false,
      };
      setNicknameMsg(newData);
      // console.log(`confirm nickname failed`, newData);
    },
  });

  //debouncing
  const emailMsgHandler = useCallback(
    debounce((e) => {
      onEmailMsgHandler(e);
    }, 200),
    []
  );

  const nicknameMsgHandler = useCallback(
    debounce((e) => {
      onNicknameMsgHandler(e);
    }, 200),
    []
  );

  const passwordMsgHandler = useCallback(
    debounce((e) => {
      onPasswordMsgHandler(e);
    }, 200),
    []
  );

  const passwordVerifyMsgHandler = useCallback(
    debounce((e) => {
      onPasswordVerifyMsgHandler(e);
    }, 200),
    []
  );

  const onEmailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    emailMsgHandler(e);
  };
  const onNicknameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    nicknameMsgHandler(e);
  };
  const onPasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    passwordMsgHandler(e);
  };
  const onPasswordVerifyChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordVerify(e.target.value);
    passwordVerifyMsgHandler(e);
  };

  const onEmailMsgHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // console.log('onEmailMsgHander triggered');
      const newVeirfyMsg = emailRegex.test(e.target.value)
        ? {
            msg: `이메일 형식이 일치합니다.`,
            isValid: true,
          }
        : {
            msg: `이메일 형식이 일치하지 않습니다.`,
            isValid: false,
          };
      setEmailMsg(newVeirfyMsg);
    },
    [emailMsg]
  );
  const onNicknameMsgHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVeirfyMsg = nicknameRegex.test(e.target.value)
        ? {
            msg: `닉네임 형식이 일치합니다.`,
            isValid: true,
          }
        : {
            msg: `닉네임 형식이 맞지 않습니다.`,
            isValid: false,
          };
      setNicknameMsg(newVeirfyMsg);
    },
    [nicknameMsg]
  );
  const onPasswordMsgHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVeirfyMsg = pwRegex.test(e.target.value)
        ? {
            msg: '사용 가능한 비밀번호입니다.',
            isValid: true,
          }
        : {
            msg: `비밀번호는 최소 8자리 이상15자리 이하,
      영문 숫자, 특수문자(!@#$%^&*)가 최소 하나 포함되어야 합니다.`,
            isValid: false,
          };
      setPasswordMsg(newVeirfyMsg);
    },
    [passwordMsg]
  );
  const onPasswordVerifyMsgHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (password !== '') {
        const newVeirfyMsg =
          e.target.value === password
            ? {
                msg: `비밀번호가 일치합니다.`,
                isValid: true,
              }
            : {
                msg: `비밀번호가 일치하지 않습니다`,
                isValid: false,
              };
        setPasswordVerifyMsg(newVeirfyMsg);
      }
    },
    [password, passwordVerifyMsg]
  );

  const onSubmitHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    registerHandler();
  };

  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isButtonActive) {
      e.preventDefault();
      registerHandler();
    }
  };

  const registerHandler = useCallback(() => {
    registerMutate({
      email,
      nickname,
      password,
    });
  }, [email, nickname, password]);

  const onConfirmIdHandler = useCallback(() => {
    if (email === '') {
      onOpenValidModalHandler('이메일을 입력한 뒤 실행해주세요.');
    } else if (emailMsg.isValid === false) {
      onOpenValidModalHandler('올바른 양식의 이메일을 입력해주세요.');
    } else confirmIdMutate(email);
  }, [email]);

  const onConfirmNicknameHandler = useCallback(() => {
    if (nickname === '') {
      onOpenValidModalHandler('닉네임을 입력한 뒤 실행해주세요.');
    } else if (nicknameMsg.isValid === false) {
      onOpenValidModalHandler('올바른 양식의 닉네임을 입력해주세요.');
    } else confirmNicknameMutate(nickname);
  }, [nickname]);

  const onCloseValidModalHandler = useCallback(() => {
    setIsValidModalOpen(false);
  }, []);

  const onOpenValidModalHandler = useCallback((msg: string) => {
    setModalMsg(msg);
    setIsValidModalOpen(true);
  }, []);

  const onCloseFinishedModalHandler = useCallback(() => {
    setIsFinishedModalOpen(false);
    navigate('/');
  }, []);

  return (
    <>
      <StLoginContainer>
        <AuthNavButton type="exit" page="register" />
        <AuthLogoBox />
        <StLoginWrapper>
          <HeaderText type="h1">회원가입</HeaderText>
          <RegisterLabel>이메일</RegisterLabel>
          <AuthInputBox
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="이메일을 입력해주세요"
            onChange={onEmailChangeHandler}
            onClick={onConfirmIdHandler}
            btnText="중복 확인"
          />
          {emailMsg.msg && (
            <StErrorMsgBox>
              <AuthErrorMsg isValid={emailMsg.isValid}>
                {emailMsg.msg}
              </AuthErrorMsg>
            </StErrorMsgBox>
          )}
          <RegisterLabel>닉네임</RegisterLabel>
          <AuthInputBox
            type="text"
            name="nickname"
            id="nickname"
            value={nickname}
            onChange={onNicknameChangeHandler}
            placeholder="한글 또는 영문 대소문자 4자리 이상"
            onClick={onConfirmNicknameHandler}
            btnText="중복 확인"
          />
          {nicknameMsg.msg && (
            <StErrorMsgBox>
              <AuthErrorMsg isValid={nicknameMsg.isValid}>
                {nicknameMsg.msg}
              </AuthErrorMsg>
            </StErrorMsgBox>
          )}
          <RegisterLabel>비밀번호</RegisterLabel>
          <AuthInputBox
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onPasswordChangeHandler}
            placeholder="영문, 숫자, 특수문자(!@#$%^&*) 포함 8~15자리"
          />
          {passwordMsg.msg && (
            <StErrorMsgBox>
              <AuthErrorMsg isValid={passwordMsg.isValid}>
                {passwordMsg.msg}
              </AuthErrorMsg>
            </StErrorMsgBox>
          )}
          <AuthInputBox
            type="password"
            name="passwordVerify"
            id="passwordVerify"
            value={passwordVerify}
            onChange={onPasswordVerifyChangeHandler}
            onKeyDown={onKeyDownHandler}
            placeholder="비밀번호 확인"
          />
          {passwordVerifyMsg.msg && (
            <StErrorMsgBox>
              <AuthErrorMsg isValid={passwordVerifyMsg.isValid}>
                {passwordVerifyMsg.msg}
              </AuthErrorMsg>
            </StErrorMsgBox>
          )}
          <RegisterBtnWrapper
            type="authNormal"
            onClick={onSubmitHandler}
            $active={isButtonActive}
            label="회원가입"
          />
        </StLoginWrapper>
      </StLoginContainer>
      <Modal
        isOpen={isValidModalOpen}
        onCloseHandler={onCloseValidModalHandler}
        title={modalMsg}
      />
      <Modal
        isOpen={isFinishedModalOpen}
        onCloseHandler={onCloseFinishedModalHandler}
        title="회원가입이 완료되었습니다!"
      />
    </>
  );
});

RegisterPage.displayName = 'RegisterPage';
