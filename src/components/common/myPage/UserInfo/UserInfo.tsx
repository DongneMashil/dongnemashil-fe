import React, { useEffect } from 'react';
import noUser from 'assets/images/NoUser.gif';
import { ReactComponent as ChevronRight } from 'assets/icons/ChevronRight.svg';
import { StToProfileButton, StUserInfoContainer } from './UserInfo.styles';
interface UserInfoProps {
  profileImgUrl: string | null | undefined;
  nickName?: string;
  email?: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const UserInfo = ({
  profileImgUrl,
  nickName = '닉네임',
  email = 'userId',
  setIsModalOpen,
}: UserInfoProps) => {
  useEffect(() => {
    console.log(profileImgUrl + '프로필 이미지');
  }, [profileImgUrl]);

  return (
    <StUserInfoContainer>
      <div className="profile">
        <img src={profileImgUrl || noUser} alt="프로필 이미지" />
        <div className="nameWrapper">
          <div className="nickname">{nickName}</div>
          <div className="userId">{email}</div>
        </div>
      </div>
      <StToProfileButton className="edit" onClick={() => setIsModalOpen(true)}>
        <ChevronRight />
      </StToProfileButton>
    </StUserInfoContainer>
  );
};
