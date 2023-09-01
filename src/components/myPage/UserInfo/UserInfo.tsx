import React, { useEffect, useState } from 'react';
import noUser from 'assets/images/NoUser.jpg';
import { ReactComponent as ChevronRight } from 'assets/icons/ChevronRight.svg';
import { StUserInfoContainer } from './UserInfo.styles';
interface UserInfoProps {
  profileImgUrl: string | null | undefined;
  nickName?: string;
  email?: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const UserInfo = React.memo(
  ({
    profileImgUrl,
    nickName = '닉네임',
    email = 'userId',
    setIsModalOpen,
  }: UserInfoProps) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const [userID, setUserID] = useState<string>('');
    useEffect(() => {
      if (regex.test(email)) {
        setUserID(email);
      } else {
        setUserID('카카오 로그인 고객님 반갑습니다!');
      }
    }, [email]);

    return (
      <StUserInfoContainer
        aria-label="프로필 메뉴 열기"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="profile">
          <img
            src={profileImgUrl || noUser}
            alt={`${nickName}의 프로필 이미지`}
          />
          <div className="nameWrapper">
            <div className="nickname">{nickName}</div>
            <div className="userId">{userID}</div>
          </div>
        </div>
        <ChevronRight aria-hidden="true" className="edit" />
      </StUserInfoContainer>
    );
  }
);
UserInfo.displayName = 'UserInfo';
export { UserInfo };
