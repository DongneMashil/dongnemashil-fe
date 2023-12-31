import { useMutation } from '@tanstack/react-query';
import { UserStateRes, confirmNickname } from 'api/loginApi';
import { AuthInputBox } from 'components/common';
import React, { useCallback } from 'react';

interface ProfileNicknameCheckProps {
  nickname: string | undefined;
  userData: UserStateRes | undefined;
  onValid: (isValid: boolean, msg: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileNicknameCheckComponent: React.FC<ProfileNicknameCheckProps> = ({
  nickname,
  userData,
  onValid,
  onChange,
}) => {
  const nicknameRegex = new RegExp(`^[a-zA-Z0-9가-힣]{2,10}$`);

  const { mutate: confirmNicknameMutate } = useMutation(confirmNickname, {
    onSuccess: () => {
      if (!nickname || !nicknameRegex.test(nickname)) {
        onValid(
          false,
          '*닉네임은 2자 이상, 10자 이하의 영문, 한글, 숫자만 사용 가능합니다.'
        );
        return;
      }
      onValid(true, `*사용가능한 닉네임 입니다.`);
      console.log('닉네임 중복 확인 완료' + nickname + onValid);
    },
    onError: (err: Error) => {
      onValid(false, '*' + err.message);
    },
  });

  const onDuplicateCheckHandler = useCallback(async () => {
    if (!nickname) {
      window.alert('닉네임을 입력한 뒤 실행해주세요.');
    } else if (userData?.nickname === nickname) {
      window.alert('변경된 닉네임이 없습니다.');
    } else if (nickname) {
      confirmNicknameMutate(nickname);
    }
  }, [nickname, userData, confirmNicknameMutate]);

  const handleNicknameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 닉네임이 변경될 때마다 중복 확인 메시지 초기화
      onValid(false, '');

      // 부모 컴포넌트에서 제공된 onChange 함수 호출
      onChange(e);
    },
    []
  );

  return (
    <AuthInputBox
      type="text"
      name="nickname"
      id="nickname"
      value={nickname}
      placeholder="닉네임"
      onChange={handleNicknameChange}
      onClick={onDuplicateCheckHandler}
      btnText="중복 확인"
    />
  );
};
export const ProfileNicknameCheck = React.memo(ProfileNicknameCheckComponent);
ProfileNicknameCheck.displayName = 'ProfileNicknameCheck';
