import { useQuery } from '@tanstack/react-query';
import { MyProfile, getMyProfile } from 'api/mypageApi';
import { CommonLayout, NavBar } from 'components/layout';
import { useVerifyUser } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';
import { styled } from 'styled-components';
import noUser from 'assets/noImage/nouser.gif';
import imageCompression from 'browser-image-compression';
import { Button, Input } from 'components/common';
export const MyProfilePage = () => {
  const userState = useRecoilValue(userProfileSelector);
  const { data: userData } = useVerifyUser(true);
  const [fileUrl, setFileUrl] = useState<string | null | undefined>(null);
  const fileUpload = useRef();
  const [postData, setPostData] = useState<{ imgUrl?: File }>({});
  // const [input, setInput] = useState({});
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
      setFileUrl(data.profileImgUrl);
    },
    onError: (error) => {
      console.log('🔴' + error);
    },
  });
  console.log(data);
  // ⬇️ 이미지 압축 옵션
  const options = {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 1020,
    useWebWorker: true,
  };
  // ⬇️ 이미지 압축
  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (!imageFile) return;
    try {
      const compressedFile = await imageCompression(imageFile, options);
      const imgUrl = URL.createObjectURL(compressedFile);
      setFileUrl(imgUrl);
      setPostData({ imgUrl: compressedFile });
      console.log(postData + '이미지 압축');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CommonLayout header={<NavBar>회원정보수정</NavBar>} backgroundColor="#fff">
      <StMyProfileContainer>
        <StProfileImage>
          <img src={fileUrl || noUser} alt="프로필 이미지" />
          <label htmlFor="file" className="pcload">
            사진 수정
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={onChangeImage}
            ref={fileUpload.current}
          />
        </StProfileImage>
        <StNickNameTitle>닉네임</StNickNameTitle>
        <StNickNameWrapper>
          <Input type="text" placeholder="닉네임" />
          <Button type="normal">중복확인</Button>
        </StNickNameWrapper>
      </StMyProfileContainer>
    </CommonLayout>
  );
};

const StNickNameTitle = styled.div`
  margin-top: 40px;
  width: 100%;
  color: var(--strokepurple, #9a7b9a);
  font-family: Pretendard;
`;

const StNickNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
  width: 100%;
`;
const StMyProfileContainer = styled.div`
  width: 100%;

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
  label {
    color: var(--strokepurple, #9a7b9a);
    text-align: center;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
    height: 40px;
  }

  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;
