import { CommonLayout, NavBar } from 'components/layout';
import React from 'react';
import { styled } from 'styled-components';
export const MyProfilePage = () => {
  return (
    <CommonLayout header={<NavBar>회원정보수정</NavBar>}>
      <StMyProfileContainer>
        <StProfileImage>
          <img src="https://source.unsplash.com/random" alt="프로필 이미지" />
          <button type="button">프로필 사진 변경</button>
        </StProfileImage>
      </StMyProfileContainer>
    </CommonLayout>
  );
};

const StMyProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const StProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;

  img {
    width: 84px;
    height: 84px;
    border-radius: 50px;
    object-fit: cover;
  }
`;
