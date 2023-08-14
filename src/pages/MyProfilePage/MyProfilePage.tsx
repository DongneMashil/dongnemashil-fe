import { useMutation, useQuery } from '@tanstack/react-query';
import { MyProfile, getMyProfile, postProfile } from 'api/mypageApi';
import { CommonLayout, NavBar } from 'components/layout';
import { useVerifyUser } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';
import { styled } from 'styled-components';
import noUser from 'assets/images/NoUser.gif';
import imageCompression from 'browser-image-compression';
import { AuthInputBox } from 'components/common';
import { AuthErrorMsg } from 'components/common/AuthErrorMsg/AuthErrorMsg';
import { confirmNickname } from 'api/loginApi';

export const MyProfilePage = () => {
  const userState = useRecoilValue(userProfileSelector);
  const { data: userData } = useVerifyUser(true);
  const [fileUrl, setFileUrl] = useState<string | null | undefined>(null);
  const fileUpload = useRef();

  const [postData, setPostData] = useState<{
    nickname?: string;
    imgUrl?: File | null;
    validation: { isValid: boolean; isVerified: boolean; msg: string };
  }>({
    nickname: '',
    imgUrl: null,
    validation: { isValid: true, isVerified: false, msg: '' },
  });

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
        imgUrl: (postData.imgUrl as File) || null,
        nickname: postData.nickname || '',
      });
      console.log('👁️' + JSON.stringify(response));
      alert('성공적으로 등록되었습니다.');
    } catch (error) {
      console.error('😀' + error);
    }
    console.log(`프로필Page🐼/onSubmitHandler/${JSON.stringify(postData)}`);
  };

  const { mutate: confirmNicknameMutate } = useMutation(confirmNickname, {
    onSuccess: () => {
      const newData = {
        ...postData,
        validation: {
          msg: `*사용가능한 닉네임 입니다.`,
          isValid: true,
          isVerified: true,
        },
      };
      setPostData(newData);

      console.log(`confirm id success`, newData);
    },
    onError: (err: Error) => {
      console.log('confirmIdMutate error', err);
      const newData = {
        ...postData,
        validation: {
          msg: '*' + err.message,
          isValid: false,
          isVerified: false,
        },
      };
      setPostData(newData);
      console.log(`닉네임 중복확인 실패`, newData);
    },
  });

  const onDuplicateCheck = async () => {
    if (!postData.nickname) {
      window.alert('닉네임을 입력한 뒤 실행해주세요.');
    } else if (userData?.nickname === postData.nickname) {
      window.alert('변경된 닉네임이 없습니다.');
    } else if (postData.nickname) {
      await confirmNicknameMutate(postData.nickname);
    }
  };

  return (
    <CommonLayout
      header={
        <NavBar
          btnLeft="back"
          btnRight="submit"
          onClickSubmit={onSubmitHandler}
        >
          회원정보수정
        </NavBar>
      }
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
          <AuthInputBox
            type="text"
            name="nickname"
            id="nickname"
            value={postData.nickname}
            placeholder="닉네임"
            onChange={onChangeValue}
            onClick={onDuplicateCheck}
            btnText="중복 확인"
          />
          <div className="error">
            <AuthErrorMsg isValid={postData.validation.isValid}>
              {postData.validation.msg}
            </AuthErrorMsg>
          </div>
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
  margin: 0 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  width: 100%;

  .error {
    margin-left: 0.3rem;
    margin-right: auto;
  }
`;
const StMyProfileContainer = styled.div`
  width: 100%;
  padding: 0 1.5rem;
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
