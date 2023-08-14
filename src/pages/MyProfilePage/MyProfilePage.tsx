import { useQuery } from '@tanstack/react-query';
import { MyProfile, getMyProfile, postProfile } from 'api/mypageApi';
import { CommonLayout, NavBar } from 'components/layout';
import { useVerifyUser } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';
import { styled } from 'styled-components';
import noUser from 'assets/images/NoUser.gif';
import imageCompression from 'browser-image-compression';
import { Button, Input } from 'components/common';
export const MyProfilePage = () => {
  const userState = useRecoilValue(userProfileSelector);
  const { data: userData } = useVerifyUser(true);

  const [fileUrl, setFileUrl] = useState<string | null | undefined>(null);
  const fileUpload = useRef();
  const [postData, setPostData] = useState<{
    nickname?: string;
    imgUrl?: File;
  }>({});
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
      setPostData((prev) => ({ ...prev, nickname: data.nickname }));
    },
    onError: (error) => {
      console.log('🔴' + error);
    },
  });
  console.log(data);
  // ⬇️ 이미지 압축 옵션
  const options = {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 500,
    useWebWorker: true,
  };
  //⬇️ 이미지 압축
  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (!imageFile) return;
    try {
      const compressedFile = await imageCompression(imageFile, options);
      const imgUrl = URL.createObjectURL(compressedFile);
      setFileUrl(imgUrl);
      setPostData((prev) => ({ ...prev, imgUrl: imageFile }));
      console.log(postData + '이미지 압축');
    } catch (error) {
      console.error(error);
    }

    // 압축되지 않은 원본 이미지를 사용하도록 코드를 추가합니다.
    //   if (imageFile) {
    //     const imgUrl: string = URL.createObjectURL(imageFile);
    //     setFileUrl(imgUrl);
    //     setPostData((prev) => ({ ...prev, imgUrl: imageFile }));
    //   }
  };

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const onSubmitHandler = async () => {
    console.log('👦🏾' + JSON.stringify(postData));

    if (!postData.imgUrl) {
      alert('이미지를 업로드해주세요.');
      return;
    }

    try {
      const response = await postProfile({
        imgUrl: postData.imgUrl as File,
        nickname: postData.nickname || '',
      });
      console.log('👁️' + JSON.stringify(response));
      alert('성공적으로 등록되었습니다.');
    } catch (error) {
      console.error('😀' + error);
    }
    console.log(`PostPage🐼/onSubmitHandler/${JSON.stringify(postData)}`);
  };

  return (
    <CommonLayout
      header={<NavBar btnLeft="back">회원정보수정</NavBar>}
      backgroundColor="#fff"
    >
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
          <Input
            type="text"
            placeholder="닉네임"
            value={postData.nickname}
            onChange={onChangeValue}
            name="nickname"
          />
          <Button type="normal">중복확인</Button>
        </StNickNameWrapper>
        <Button onClick={onSubmitHandler}>제출</Button>
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
