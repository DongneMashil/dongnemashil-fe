import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from 'components/common';
//import { loginKaKao } from 'api/loginApi';

export const LoginPage = () => {
  const navigate = useNavigate();

  const onKakaoHandler = () => {
    console.log('onKakaoHandler');
    //loginKaKao();
  };
  const onLoginHandler = () => {
    console.log('onLoginHandler');
  };
  const onRegisterHandler = () => {
    navigate('/register');
  };

  return (
    <div
      style={{
        width: '450px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <p>바로 시작 가능!</p>
      <Button onClick={onKakaoHandler}>카카오로 로그인</Button>
      <Button onClick={onLoginHandler}>회원 아이디로 로그인</Button>
      <Button onClick={onRegisterHandler}>회원가입</Button>
    </div>
  );
};
