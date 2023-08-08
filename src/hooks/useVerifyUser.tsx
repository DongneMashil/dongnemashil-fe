import { useQuery } from '@tanstack/react-query';
import { verifyUser } from 'api/loginApi';
import { useSetRecoilState } from 'recoil';
import { UserState, userProfileSelector } from 'recoil/userExample';

export interface tempUserState {
  email: string;
  nickname: string;
}

/** 로그인 여부가 필요할 때 사용하는 cusom hook
 * @param {boolean} shouldVerify - useQuery 실행 여부 제어하는 값
 */
export const useVerifyUser = (shouldVerify: boolean) => {
  //const queryClient = useQueryClient();
  const setUserState = useSetRecoilState(userProfileSelector);

  return useQuery<tempUserState, Error>({
    queryKey: ['isUserValid'],
    queryFn: () => verifyUser(),
    enabled: shouldVerify,
    onSuccess: (data: tempUserState) => {
      console.log('user is valid', data);
      const newData: UserState = {
        userId: data.email,
        nickName: data.nickname,
        profileImage: '',
        isLoggedIn: true,
      };
      setUserState(newData);
    },
    onError: () => {
      console.log('user is invalid');
    },
  });
};
