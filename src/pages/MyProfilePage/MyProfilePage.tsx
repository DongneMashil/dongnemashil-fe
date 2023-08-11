import { useQuery } from '@tanstack/react-query';
import { MyProfile, getMyProfile } from 'api/mypageApi';
import { CommonLayout, NavBar } from 'components/layout';
import { useVerifyUser } from 'hooks';
// import React, { useEffect, useState } from 'react';
import { useEffect } from 'react';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';
import { styled } from 'styled-components';
import noUser from 'assets/noImage/nouser.gif';
export const MyProfilePage = () => {
  const userState = useRecoilValue(userProfileSelector);
  const { data: userData } = useVerifyUser(true);
  // const [fileUrl, setFileUrl] = useState(null);
  useEffect(() => {
    console.log('current user state: ', userState);
    if (userData) {
      console.log('useVerifyUser data: ', userData);
    }
  }, [userState]);

  const { data } = useQuery<MyProfile, Error>({
    queryKey: ['myPage', userData?.nickname],
    queryFn: () => getMyProfile(),
    // enabled: !!userData?.nickname,
    onSuccess: (data) => {
      console.log(data);
      // setFileUrl(data.profileImgUrl);
    },
    onError: (error) => {
      console.log('🔴' + error);
    },
  });
  return (
    <CommonLayout header={<NavBar>회원정보수정</NavBar>}>
      <StMyProfileContainer>
        <StProfileImage>
          <img src={data?.profileImgUrl || noUser} alt="프로필 이미지" />
          {/* <label htmlFor="file" className="pcload">
            PC에서 불러오기
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={onChangeImage}
            ref={fileUpload}
          /> */}
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
