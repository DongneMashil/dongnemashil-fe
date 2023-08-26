import { MyProfile, postProfile } from 'api/mypageApi';
import { CommonLayout, NavBar } from 'components/layout';
import { useUpdateUserInfo } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userIdSelector, userProfileSelector } from 'recoil/userInfo';
import noUser from 'assets/images/NoUser.jpg';
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
  const [imgFile, setImgFile] = useState<File | null>(null); //이미지 파일
  const [imgUrl, setImgUrl] = useState<string | null | undefined>(null); //이미지 url
  const [nickname, setNickname] = useState<string>(''); //닉네임
  const [validation, setValidation] = useState<{
    isValid: boolean;
    msg: string;
  }>({ isValid: true, msg: '' }); //닉네임 유효성 여부
  const [cropModal, setCropModal] = useState(false);
  const userID = useRecoilValue(userIdSelector);
  //유저정보 조회 및 업데이트

  const { isSuccess, data } = useUpdateUserInfo(true);
  const setUserState = useSetRecoilState(userProfileSelector);

  // 유저정보(닉네임, 사진주소) 조회 및 기존 사진 파일 다운로드

  //---------------------------------------------

  const getProfileImg = async (data: MyProfile) => {
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
      setImgFile(prevImage);
      setNickname(data.nickname);
    } catch (error) {
      setImgUrl(DefaultImage); //이미지 다운로드 실패시 기본 이미지 삽입
      console.log('✨defalultImage: ' + DefaultImage);
      console.log('✨setimgUrl: ' + imgUrl);

      const defaultBlob = base64ToBlob(DefaultImage, 'image/jpg');
      const defaultFile = new File([defaultBlob], 'default.jpg', {
        type: 'image/jpg',
      });

      setImgFile(defaultFile);
      setNickname(data.nickname);
      console.error('이미지 다운로드 실패해서 기본 이미지 삽입:', error);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setImgUrl(data.profileImgUrl);
      getProfileImg(data);
    }
  }, []); //이걸 안하니깐 52번씩 랜더링되다가 멈춤

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
        setImgUrl(imgUrl);
        setImgFile(compressedFile);
      } catch (error) {
        console.error(error);
      }
    };
    onChangeImage();
  }, [croppedFile]);

  //닉네임 입력
  const onChangeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValidation({ isValid: false, msg: '' });
    setNickname(value);
  };

  //프로필 업로드
  const onSubmitHandler = async () => {
    //닉네임 미입력시
    if (nickname === '') {
      setErrorMsg('닉네임을 입력해주세요.');
      return;
    }
    try {
      await postProfile({
        imgUrl: imgFile,
        nickname: nickname,
      });
      setDoneMsg('프로필 등록에 성공했습니다.');
      queryClient.invalidateQueries([userID]);
      setUserState((prev) => ({ ...prev, nickname: nickname }));
      console.log('🟢이제 곧 이동');
      navigate('/mypage');
    } catch (error) {
      console.error('😀' + error);
      setErrorMsg(`프로필 등록에 실패했습니다. 오류코드:${error}`);
    }
  };

  const onValidHandler = (isValid: boolean, msg: string) => {
    setValidation({ isValid: isValid, msg: msg });
  };

  return (
    <CommonLayout
      header={
        <NavBar
          btnLeft="back"
          btnRight="submit"
          onClickSubmit={onSubmitHandler}
          onClickActive={validation.isValid}
          modal={{
            title: '알림',
            firstLine: '닉네임을 중복확인 해주세요.',
          }}
        >
          회원정보수정
        </NavBar>
      }
      backgroundColor="#fff"
    >
      <StMyProfileContainer>
        <StProfileImage>
          <img src={imgUrl || noUser} alt="프로필 이미지" />
          <button className="loadimg" onClick={onClickChangeImageHandler}>
            사진 수정
          </button>
        </StProfileImage>
        <StNickNameTitle>닉네임</StNickNameTitle>
        <StNickNameWrapper>
          <ProfileNicknameCheck
            nickname={nickname}
            userData={data}
            onValid={onValidHandler}
            onChange={onChangeValueHandler}
          />
          <div className="error">
            <AuthErrorMsg isValid={validation.isValid}>
              {validation.msg}
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
