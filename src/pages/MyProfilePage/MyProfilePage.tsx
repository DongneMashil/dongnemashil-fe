import { MyProfile, postProfile } from 'api/mypageApi';
import { CommonLayout, NavBar } from 'components/layout';
import { useUpdateUserInfo, useVerifyUser } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userProfileSelector } from 'recoil/userInfo';
import noUser from 'assets/images/NoUser.gif';
import { AuthErrorMsg, Modal } from 'components/common';
import { useNavigate } from 'react-router-dom';
import { queryClient } from 'queries/queryClient';
import {
  StMyProfileContainer,
  StNickNameTitle,
  StNickNameWrapper,
  StProfileImage,
} from './MyProfilePage.styles';
import { CropModal } from 'components/common/CropModal/CropModal';
import { ProfileNicknameCheck } from 'components/myProfilePage/ProfileNicknameCheck/ProfileNicknameCheck';
// import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getExtensionName } from 'components/myProfilePage';
import DefaultImage from 'assets/images/NoUser.jpg';
import { base64ToBlob } from 'utils';
import { croppedImageFileSelector } from 'recoil/cropProfileImage/cropProfileImageSelector';
import imageCompression from 'browser-image-compression';

export const MyProfilePage = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(''); // 에러 메시지를 저장하는 상태
  const [doneMsg, setDoneMsg] = useState(''); // 완료 메시지를 저장하는 상태
  const [cropModal, setCropModal] = useState(false);
  //유저정보 조회 및 업데이트
  const { data: userData } = useVerifyUser(true);
  const setUserState = useSetRecoilState(userProfileSelector);

  // 유저정보(닉네임, 사진주소) 조회 및 기존 사진 파일 다운로드
  // const { fileUrl, setFileUrl, postData, setPostData } =
  //   useGetMyProfile(userData);
  //---------------------------------------------
  const [fileUrl, setFileUrl] = useState<string | null | undefined>(null);
  const [postData, setPostData] = useState<{
    nickname?: string;
    imgFile?: File | null;
    validation: {
      isValid: boolean;
      isVerified: boolean;
      msg: string;
      alertMsg: string;
    };
  }>({
    nickname: userData?.nickname,
    imgFile: null,
    validation: {
      isValid: true,
      isVerified: false,
      msg: '',
      alertMsg: '',
    },
  });

  const { data, isSuccess } = useUpdateUserInfo(true);

  const getPhoto = async (data: MyProfile) => {
    //
    try {
      const response = await axios.get(
        `${data.profileImgUrl!}?timestamp=${Date.now()}`,
        {
          responseType: 'blob',
        }
      );
      console.log(`Response Status: ${response.status}`);

      const blob = response.data;
      const extension = getExtensionName(data.profileImgUrl!);
      const finalFilename = 'prev.' + extension;
      const prevImage = new File([blob], finalFilename, { type: blob.type });
      setPostData((prev) => ({
        ...prev,
        imgFile: prevImage,
        nickname: data.nickname,
      }));
    } catch (error) {
      setFileUrl(DefaultImage); //이미지 다운로드 실패시 기본 이미지 삽입
      console.log('✨defalultImage: ' + DefaultImage);
      console.log('✨setfileUrl: ' + fileUrl);

      const defaultBlob = base64ToBlob(DefaultImage, 'image/jpg');
      // const defaultBlob = new Blob([DefaultImage], { type: 'image/jpg' });
      const defaultFile = new File([defaultBlob], 'default.jpg', {
        type: 'image/jpg',
      });

      setPostData((prev) => ({
        ...prev,
        imgFile: defaultFile,
        nickname: data.nickname,
      }));
      console.error('이미지 다운로드 실패해서 기본 이미지 삽입:', error);
    }
  };
  if (isSuccess) {
    setFileUrl(data.profileImgUrl);
    getPhoto(data);
  }

  // const UserID = useRecoilValue(userIdSelector);
  // // 유저 정보 조회
  // useQuery<MyProfile>({
  //   queryKey: [UserID, 'userData'],
  //   queryFn: getMyProfile,
  //   onSuccess: async (data) => {
  //     setFileUrl(data.profileImgUrl);
  //     try {
  //       const response = await axios.get(
  //         `${data.profileImgUrl!}?timestamp=${Date.now()}`,
  //         {
  //           responseType: 'blob',
  //         }
  //       );
  //       console.log(`Response Status: ${response.status}`);

  //       const blob = response.data;
  //       const extension = getExtensionName(data.profileImgUrl!);
  //       const finalFilename = 'prev.' + extension;
  //       const prevImage = new File([blob], finalFilename, { type: blob.type });
  //       setPostData((prev) => ({
  //         ...prev,
  //         imgFile: prevImage,
  //         nickname: data.nickname,
  //       }));
  //     } catch (error) {
  //       setFileUrl(DefaultImage); //이미지 다운로드 실패시 기본 이미지 삽입
  //       console.log('✨defalultImage: ' + DefaultImage);
  //       console.log('✨setfileUrl: ' + fileUrl);

  //       const defaultBlob = base64ToBlob(DefaultImage, 'image/jpg');
  //       // const defaultBlob = new Blob([DefaultImage], { type: 'image/jpg' });
  //       const defaultFile = new File([defaultBlob], 'default.jpg', {
  //         type: 'image/jpg',
  //       });

  //       setPostData((prev) => ({
  //         ...prev,
  //         imgFile: defaultFile,
  //         nickname: data.nickname,
  //       }));
  //       console.error('이미지 다운로드 실패해서 기본 이미지 삽입:', error);
  //     }
  //   },
  //   onError: (error) => {
  //     console.log('🔴getMyprofile에러:' + error);
  //   },
  // });
  //---------------------------------------------
  //프로필 사진 업로드
  const onClickChangeImageHandler = () => {
    setCropModal(true);
  };

  //압축하기
  const croppedFile = useRecoilValue(croppedImageFileSelector);

  const options = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 100,
    useWebWorker: true,
  };

  useEffect(() => {
    const onChangeImage = async () => {
      if (!croppedFile) return;

      try {
        const compressedFile = await imageCompression(croppedFile, options);
        const imgUrl = URL.createObjectURL(compressedFile);
        setFileUrl(imgUrl);
        setPostData((prev) => ({
          ...prev,
          imgFile: compressedFile,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    onChangeImage();
  }, [croppedFile]);

  //닉네임 입력
  const onChangeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
      validation: {
        ...postData.validation,
        alertMsg: '닉네임 중복확인을 해주세요!',
        msg: '',
        isVerified: false,
        isValid: false,
      },
    });
  };

  //프로필 업로드
  const onSubmitHandler = async () => {
    //닉네임 미입력시
    if (postData.nickname === '') {
      setErrorMsg('닉네임을 입력해주세요.');
      return;
    }
    try {
      await postProfile({
        imgUrl: postData.imgFile!,
        nickname: postData.nickname!,
      });
      setDoneMsg('프로필 등록에 성공했습니다.');
      queryClient.invalidateQueries(['myPage']);
      setUserState((prev) => ({ ...prev, nickname: postData.nickname }));
      console.log('🟢이제 곧 이동' + postData);
      navigate('/mypage');
    } catch (error) {
      console.error('😀' + error);
      setErrorMsg(`프로필 등록에 실패했습니다. 오류코드:${error}`);
    }
  };
  useEffect(() => {
    console.log('🔴', postData);
  }, [postData]);
  useEffect(() => {
    console.log('Updated fileUrl:', fileUrl);
  }, [fileUrl]);

  const onValidHandler = (isValid: boolean, msg: string) => {
    setPostData((prevData) => ({
      ...prevData,
      validation: {
        ...prevData.validation,
        msg: msg,
        isValid: isValid,
        isVerified: isValid,
      },
    }));
  };

  return (
    <CommonLayout
      header={
        <NavBar
          btnLeft="back"
          btnRight="submit"
          onClickSubmit={onSubmitHandler}
          onClickActive={postData.validation.isValid}
          modal={{
            title: '알림',
            firstLine: postData.validation.alertMsg,
          }}
        >
          회원정보수정
        </NavBar>
      }
      backgroundColor="#fff"
    >
      <StMyProfileContainer>
        <StProfileImage>
          <img src={fileUrl || noUser} alt="프로필 이미지" />
          <button className="loadimg" onClick={onClickChangeImageHandler}>
            사진 수정
          </button>
        </StProfileImage>
        <StNickNameTitle>닉네임</StNickNameTitle>
        <StNickNameWrapper>
          <ProfileNicknameCheck
            nickname={postData.nickname}
            userData={userData}
            onValid={onValidHandler}
            onChange={onChangeValueHandler}
          />
          <div className="error">
            <AuthErrorMsg isValid={postData.validation.isValid}>
              {postData.validation.msg}
            </AuthErrorMsg>

            <Modal
              isOpen={!!errorMsg}
              title="알림"
              firstLine={errorMsg}
              onCloseHandler={() => setErrorMsg('')}
            />

            <Modal
              isOpen={!!doneMsg}
              title="알림"
              firstLine={doneMsg}
              onCloseHandler={() => navigate('/mypage')}
            />
            <CropModal
              isOpen={cropModal}
              onCloseHandler={() => setCropModal(false)}
            />
          </div>
        </StNickNameWrapper>
      </StMyProfileContainer>
    </CommonLayout>
  );
};
