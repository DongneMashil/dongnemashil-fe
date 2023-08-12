import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import noUser from 'assets/images/NoUser.gif';
import { useNavigate } from 'react-router-dom';
interface UserInfoProps {
  profileImgUrl: string | null | undefined;
  nickName?: string;
  email?: string;
}
export const UserInfo = ({
  profileImgUrl,
  nickName = '닉네임',
  email = 'userId',
}: UserInfoProps) => {
  useEffect(() => {
    console.log(profileImgUrl + '프로필 이미지');
  }, [profileImgUrl]);
  const navigate = useNavigate();
  const navigateToProfileHandler = () => {
    navigate('/mypage/profile');
  };

  return (
    <StUserInfoContainer>
      <div className="profile">
        <img src={profileImgUrl || noUser} alt="프로필 이미지" />
        <div className="nameWrapper">
          <div className="nickname">{nickName}</div>
          <div className="userId">{email}</div>
        </div>
      </div>
      <StToProfileButton className="edit" onClick={navigateToProfileHandler}>
        〉
      </StToProfileButton>
    </StUserInfoContainer>
  );
};
export const StToProfileButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  color: #4f4f4f;
`;

export const StUserInfoContainer = styled.div`
  ${(props) => props.theme.floatingBox}
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  .profile {
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    .nameWrapper {
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.2rem;
    }
    .nickname {
      font-size: 1.125rem;
      font-weight: 600;
    }
    .userId {
      font-size: 0.875rem;
      font-weight: 400;
      color: #828282;
    }
  }
  .edit {
    font-size: 1rem;
    font-weight: 600;
    color: #4f4f4f;
  }
`;
