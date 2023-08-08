import { useQuery } from 'react-query';
import { verifyUser } from 'api/loginApi';
import { useSetRecoilState } from 'recoil';
import { UserState, userProfileSelector } from 'recoil/userExample';

export interface tempUserState {
  email: string;
  nickname: string;
}

export const useVerifyUser = (shouldVerify: boolean) => {
  //const queryClient = useQueryClient();
  const setUserState = useSetRecoilState(userProfileSelector);

  return useQuery<tempUserState, Error>({
    queryKey: 'isUserValid',
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
