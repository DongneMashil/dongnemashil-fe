import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from 'components/common';
import NavBar from 'components/layout/NavBar/NavBar';
import { loginKakao } from 'api/loginApi';

export const LoginPage = () => {
  const navigate = useNavigate();

  const onKakaoHandler = () => {
    console.log('onKakaoHandler');
    loginKakao();
  };
  const onLoginHandler = () => {
    console.log('onLoginHandler');
  };
  const onRegisterHandler = () => {
    navigate('/register');
  };

  return (
    <div>
      <NavBar btnLeft={'logo'} btnRight={'myPage'}>
        동네마실
      </NavBar>

      <div
        style={{
          width: '200px',
          height: '200px',
          margin: '0 auto',
          backgroundColor: '#ccc',
          marginTop: '50px',
        }}
      ></div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '100px 20px 20px 20px',
        }}
      >
        <p>바로 시작 가능!</p>
        <Button onClick={onKakaoHandler}>카카오로 로그인</Button>
        <Button onClick={onLoginHandler}>회원 아이디로 로그인</Button>
        <Button onClick={onRegisterHandler}>회원가입</Button>
      </div>
    </div>
  );
};
