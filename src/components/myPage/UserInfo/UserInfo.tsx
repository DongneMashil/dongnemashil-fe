import React, { useEffect, useState } from 'react';
import noUser from 'assets/images/NoUser.jpg';
import { ReactComponent as ChevronRight } from 'assets/icons/ChevronRight.svg';
import { StUserInfoContainer } from './UserInfo.styles';
import { getOtherUserProfile } from 'api/mypageApi';
import { useQuery } from '@tanstack/react-query';
interface UserInfoProps {
  profileImgUrl: string | null | undefined;
  nickName?: string;
  email?: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMyPage?: boolean;
  otherUserNickname?: string;
}
const UserInfo = React.memo(
  ({
    profileImgUrl,
    nickName = '닉네임',
    email = 'userId',
    setIsModalOpen,
    isMyPage = true,
    otherUserNickname,
  }: UserInfoProps) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const [userID, setUserID] = useState<string>('');
    useEffect(() => {
      if (regex.test(email)) {
        setUserID(email);
      } else {
        setUserID('카카오 회원');
      }
    }, [email]);
    // 유저정보 API 연결 필요함

    const { data: OtherUserData } = useQuery<string, Error>({
      queryKey: ['otherUserProfile', otherUserNickname],
      queryFn: () => getOtherUserProfile(otherUserNickname!),
      enabled: !isMyPage,

      // refetchOnWindowFocus: true, // 필요시 true로 변경.
      // refetchOnReconnect: true,
      // refetchOnMount: true,
      cacheTime: 0, // 60분 동안 캐시로 저장 -> refreshToken이랑 동일한 시간으로 설정
      staleTime: 0, // 10분 이내에는 캐시된 결과를 사용 -> 어차피 업데이트시 즉시 무효화됨
      retry: 1, // 1번은 재시도 해보기
    });

    return (
      <StUserInfoContainer
        aria-label="프로필 메뉴 열기"
        onClick={isMyPage ? () => setIsModalOpen(true) : undefined}
        $isMyPage={isMyPage}
      >
        <div className="profile">
          <img
            src={isMyPage ? profileImgUrl || noUser : OtherUserData || noUser}
            alt={`${nickName}의 프로필 이미지`}
          />
          <div className="nameWrapper">
            <div className="nickname">
              {isMyPage ? nickName : otherUserNickname}
            </div>
            {isMyPage && <div className="userId">{userID}</div>}
          </div>
        </div>
        {isMyPage && <ChevronRight aria-hidden="true" className="edit" />}
      </StUserInfoContainer>
    );
  }
);
UserInfo.displayName = 'UserInfo';
export { UserInfo };
