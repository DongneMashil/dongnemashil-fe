import { useQuery } from '@tanstack/react-query';
import { verifyUser, UserStateRes } from 'api/loginApi';
import { useSetRecoilState } from 'recoil';
import { UserState, userProfileSelector } from 'recoil/userInfo';
// import { useNavigate } from 'react-router-dom';

/** 로그인 여부가 필요할 때 사용하는 cusom hook
 * @param {boolean} shouldVerify - useQuery 실행 여부 제어하는 값 (default: true)
 */
export const useVerifyUser = (shouldVerify: boolean = true) => {
  // const navigate = useNavigate();
  const setUserState = useSetRecoilState(userProfileSelector);

  return useQuery<UserStateRes, Error>({
    queryKey: ['isUserValid'],
    queryFn: () => verifyUser(),
    enabled: shouldVerify,
    onSuccess: (data: UserStateRes) => {
      const newData: UserState = {
        userId: data.email,
        nickName: data.nickname,
        isLoggedIn: true,
      };
      setUserState(newData);
      console.log('user is valid');
    },
    onError: () => {
      console.log('user is invalid');
    },
  });
};
