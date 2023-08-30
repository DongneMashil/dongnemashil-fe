import { useQuery } from '@tanstack/react-query';

import { MyProfile, getMyProfile } from 'api/mypageApi';
import { useRecoilValue } from 'recoil';
import { userIdSelector } from 'recoil/userInfo';
import { useVerifyUser } from './useVerifyUser';
// import { useNavigate } from 'react-router-dom';

/** 로그인 여부가 필요할 때 사용하는 cusom hook
 * @param {boolean} shouldUpdate - useQuery 실행 여부 제어하는 값 (default: true)
 */
export const useUpdateUserInfo = (shouldUpdate: boolean = true) => {
  // const navigate = useNavigate();

  const { isSuccess } = useVerifyUser(true);

  const UserID = useRecoilValue(userIdSelector);

  return useQuery<MyProfile, Error>({
    queryKey: [UserID, 'userData'],
    queryFn: getMyProfile,
    enabled: isSuccess && shouldUpdate,

    refetchOnWindowFocus: true, // 필요시 true로 변경.
    refetchOnReconnect: true,
    refetchOnMount: true,
    cacheTime: 60000 * 60, // 60분 동안 캐시로 저장 -> refreshToken이랑 동일한 시간으로 설정
    staleTime: 60000 * 10, // 10분 이내에는 캐시된 결과를 사용 -> 어차피 업데이트시 즉시 무효화됨
    retry: 1, // 1번은 재시도 해보기
  });
};
