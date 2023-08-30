import React, { useState, useEffect, useCallback } from 'react';
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
import { useVerifyUser } from 'hooks';
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMsg, setModalMsg] = useState<string>('');
  const [shouldVerify, setShouldVerify] = useState<boolean>(false);
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

  const onEmailChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      onEmailMsgHandler(e);
    },
    [email]
  );
  const onNicknameChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
      onNicknameMsgHandler(e);
    },
    [nickname]
  );
  const onPasswordChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      onPasswordMsgHandler(e);
    },
    [password]
  );
  const onPasswordVerifyChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordVerify(e.target.value);
      onPasswordVerifyMsgHandler(e);
    },
    [password, passwordVerify]
  );

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
        // console.log('onEmailMsgHander triggered');
        // console.log(e.target.value, password, e.target.value === password);
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

  const onSubmitHandler = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      registerMutate({
        email,
        nickname,
        password,
      });
    },
    [email, nickname, password]
  );

  const onConfirmIdHandler = useCallback(() => {
    if (email === '') {
      onOpenModalHandler('이메일을 입력한 뒤 실행해주세요.');
    } else if (emailMsg.isValid === false) {
      onOpenModalHandler('올바른 양식의 이메일을 입력해주세요.');
    } else confirmIdMutate(email);
  }, [email]);

  const onConfirmNicknameHandler = useCallback(() => {
    m;
    if (nickname === '') {
      onOpenModalHandler('닉네임을 입력한 뒤 실행해주세요.');
    } else if (nicknameMsg.isValid === false) {
      onOpenModalHandler('올바른 양식의 닉네임을 입력해주세요.');
    } else confirmNicknameMutate(nickname);
  }, [nickname]);

  const onCloseModalHandler = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onOpenModalHandler = (msg: string) => {
    setModalMsg(msg);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (data) {
      // console.log('Register Success ', data);
      navigate('/');
    }
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
            $active={
              emailMsg.isValid &&
              nicknameMsg.isValid &&
              passwordMsg.isValid &&
              passwordVerifyMsg.isValid &&
              isNotDuplicated.email &&
              isNotDuplicated.nickname
            }
            label="회원가입"
          />
        </StLoginWrapper>
      </StLoginContainer>
      <Modal
        isOpen={isModalOpen}
        onCloseHandler={onCloseModalHandler}
        title={modalMsg}
      />
    </>
  );
});

RegisterPage.displayName = 'RegisterPage';
