import React from 'react';
import noUser from 'assets/images/NoUser.gif';
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
            <div className="userId">{email}</div>
          </div>
        </div>
        <ChevronRight aria-hidden="true" className="edit" />
      </StUserInfoContainer>
    );
  }
);
UserInfo.displayName = 'UserInfo';
export { UserInfo };
