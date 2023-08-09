import React from 'react';
import { styled } from 'styled-components';
export const UserInfo = () => {
  return (
    <StUserInfoContainer>
      <div className="profile">
        <img src="https://picsum.photos/200" alt="프로필 이미지" />
        <div className="nameWrapper">
          <div className="nickname">닉네임</div>
          <div className="userId">@userId</div>
        </div>
      </div>
      <div className="edit">〉</div>
    </StUserInfoContainer>
  );
};

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
