import React, { useEffect } from 'react';
import { loginKakaoCallback } from 'api/loginApi';
import { useMutation } from 'react-query';
import { UserState, userProfileSelector } from 'recoil/userExample';
import { useSetRecoilState } from 'recoil';

export const KakaoCallbackPage = () => {
  const setLoginState = useSetRecoilState(userProfileSelector);
  const { mutate } = useMutation(loginKakaoCallback, {
    onSuccess: (data) => {
      console.log('Kakao login success! ', data);
      const newData: UserState = {
        userId: '성공!',
        nickName: '',
        profileImage: '',
        isLoggedIn: true,
      }; // 체크 필요
      setLoginState(newData);
    },
    onError: (err) => {
      console.log('Kakao login Error: ', err);
    },
  });

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code'); // 카카오 인가 코드
    code && mutate(code);
  }, []);

  return <div>카카오 인증중 ...</div>;
};
