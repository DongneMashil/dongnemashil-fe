import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { confirmNickname } from 'api/loginApi';

export const useProfileNicknameCheck = () => {
  const [postData, setPostData] = useState({
    nickname: '',
    validation: {
      msg: '',
      isValid: false,
      isVerified: false,
      alertMsg: '',
    },
  });

  const { mutate: confirmNicknameMutate } = useMutation(confirmNickname, {
    onSuccess: () => {
      const newData = {
        ...postData,
        validation: {
          msg: `*사용가능한 닉네임 입니다.`,
          isValid: true,
          isVerified: true,
          alertMsg: '사진을 등록해주세요!',
        },
      };
      setPostData(newData);
      console.log(`confirm id success`, newData);
    },
    onError: (err: Error) => {
      const newData = {
        ...postData,
        validation: {
          msg: '*' + err.message,
          isValid: false,
          isVerified: false,
          alertMsg: '닉네임 중복확인 실패',
        },
      };
      setPostData(newData);
      console.log(`닉네임 중복확인 실패`, newData);
    },
  });

  const onDuplicateCheckHandler = async (
    nickname: string,
    currentNickname?: string
  ) => {
    if (!nickname) {
      window.alert('닉네임을 입력한 뒤 실행해주세요.');
    } else if (currentNickname === nickname) {
      window.alert('변경된 닉네임이 없습니다.');
    } else if (nickname) {
      confirmNicknameMutate(nickname);
    }
  };

  return {
    postData,
    setPostData,
    onDuplicateCheckHandler,
  };
};
