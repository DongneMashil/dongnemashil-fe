import { useQuery } from '@tanstack/react-query';
import { logout } from 'api/loginApi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { UserState, userProfileSelector } from 'recoil/userExample';

/** 로그아웃 cusom hook
 * @param {boolean} shouldVerify - useQuery 실행 여부 제어하는 값 (default: true)
 */
export const useLogout = (shouldVerify: boolean = true) => {
  const setUserState = useSetRecoilState(userProfileSelector);
  const userState = useRecoilValue(userProfileSelector);

  const { isSuccess, isError } = useQuery({
    queryKey: ['logout'],
    queryFn: () => logout(),
    enabled: shouldVerify,
    onSuccess: () => {
      const newData: UserState = {
        userId: '',
        nickName: '',
        isLoggedIn: false,
      };
      setUserState(newData);
      console.log('successfully logged out', userState);
      window.alert('로그아웃 되었습니다!');
    },
    onError: () => {
      console.log('logout failed');
    },
  });

  return { isSuccess, isError };
};
