import { useQuery } from 'react-query';
import { verifyUser } from 'api/loginApi';
//import { useRecoilValue } from 'recoil';

export const useVerifyUser = () => {
  //const queryClient = useQueryClient();
  return useQuery('isUserValid', verifyUser, {
    onSuccess: (data) => {
      console.log('user is valid', data);
    },
    onError: () => {
      console.log('user is invalid');
    },
  });
};
