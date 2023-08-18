import { useMutation, useQuery } from '@tanstack/react-query';
import { MyProfile, getMyProfile, postProfile } from 'api/mypageApi';
import { CommonLayout, NavBar } from 'components/layout';
import { useVerifyUser } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';
import noUser from 'assets/images/NoUser.gif';
import imageCompression from 'browser-image-compression';
import { AuthInputBox, AuthErrorMsg, Modal } from 'components/common';
import { confirmNickname } from 'api/loginApi';
import { getExtensionName } from 'components/myProfilePage';
import { useNavigate } from 'react-router-dom';
import { queryClient } from 'queries/queryClient';
import {
  StMyProfileContainer,
  StNickNameTitle,
  StNickNameWrapper,
  StProfileImage,
} from './MyProfilePage.styles';
import axios from 'axios';
export const MyProfilePage = () => {
  const [fileUrl, setFileUrl] = useState<string | null | undefined>(null);
  const fileUpload = useRef();
  const navigate = useNavigate();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); //오류시 모달창
  const [postData, setPostData] = useState<{
    nickname?: string;
    imgUrl?: File | null;
    validation: {
      isValid: boolean;
      isVerified: boolean;
      msg: string;
      alertMsg: string;
    };
  }>({
    nickname: '',
    imgUrl: null,
    validation: {
      isValid: true,
      isVerified: false,
      msg: '',
      alertMsg: '닉네임을 중복확인을 해주세요!',
    },
  });

  //유저정보 조회 및 업데이트
  const { data: userData } = useVerifyUser(true);
  const [userState, setUserState] = useRecoilState(userProfileSelector);
  const [isAxiosErrorModalOpen, setIsAxiosErrorModalOpen] = useState(false); //사진 초기 다운로드 실패시 모달창
  useEffect(() => {
    console.log('current user state: ', userState);
    if (userData) {
      console.log('useVerifyUser data: ', userData);
    }
  }, [userState]);
  // 유저정보(닉네임, 사진주소) 조회 및 기존 사진 파일 다운로드
  useQuery<MyProfile, Error>({
    queryKey: ['myPage', userData?.nickname],
    queryFn: () => getMyProfile(),
    onSuccess: async (data) => {
      console.log(data);
      setFileUrl(data.profileImgUrl);

      try {
        const response = await axios.get(data.profileImgUrl!, {
          responseType: 'blob',
        });
        console.log(`Response Status: ${response.status}`);

        const blob = response.data;
        const extension = getExtensionName(data.profileImgUrl!);
        const finalFilename = 'prev.' + extension;
        const prevImage = new File([blob], finalFilename, { type: blob.type });
        setPostData((prev) => ({
          ...prev,
          imgUrl: prevImage,
          nickname: data.nickname,
        }));
      } catch (error) {
        console.error('Error fetching the image:', error);
        setIsAxiosErrorModalOpen(true);
      }
    },
    onError: (error) => {
      console.log('🔴' + error);
    },
  });

  // ⬇️ 이미지 압축 옵션
  const options = {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 500,
    useWebWorker: true,
  };
  //⬇️ 이미지 압축 (fileUrl -> imgUrl)
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
  };
  //닉네임 입력
  const onChangeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
      validation: {
        ...postData.validation,
        alertMsg: '닉네임 중복확인을 해주세요!',
        isVerified: false,
        isValid: false,
      },
    });
  };

  //프로필 업로드
  const onSubmitHandler = async () => {
    console.log('👦🏾' + JSON.stringify(postData));
    console.log('⚠️👀');
    //변경내용 없는경우
    if (
      postData.imgUrl === fileUrl &&
      postData.nickname === userData?.nickname
    ) {
      setPostData((prev) => ({
        ...prev,
        validation: {
          ...prev.validation,
          alertMsg: '변경된 내용이 없습니다.',
        },
      }));
      setIsErrorModalOpen(true);
      return;
    } //닉네임 미입력시
    if (postData.nickname === '') {
      setPostData((prev) => ({
        ...prev,
        validation: {
          ...prev.validation,
          alertMsg: '닉네임을 입력해주세요.',
        },
      }));
      setIsErrorModalOpen(true);
      return;
    }
    try {
      const response = await postProfile({
        imgUrl: (postData.imgUrl as File)!, // 무조건 들어감
        nickname: postData.nickname!, // 무조건 들어감
      });
      console.log('👁️' + JSON.stringify(response));
      alert('성공적으로 등록되었습니다.');
      queryClient.invalidateQueries(['myPage']);
      setUserState((prev) => ({ ...prev, nickname: postData.nickname }));
      navigate('/');
    } catch (error) {
      console.error('😀' + error);
      alert('프로필 등록에 실패했습니다.');
    }
  };

  //닉네임 중복확인 함수
  const { mutate: confirmNicknameMutate } = useMutation(confirmNickname, {
    onSuccess: () => {
      const newData = {
        ...postData,
        validation: {
          msg: `*사용가능한 닉네임 입니다.`,
          isValid: true, // 닉네임 유효 여부 (기존 닉네임 유지 or 변경후 성공시 true)
          isVerified: true, // 닉네임 중복확인 여부 (변경후 성공시 true)
          alertMsg: '사진을 등록해주세요!',
        },
      };
      setPostData(newData); //닉네임 중복확인 성공여부 상태 업데이트
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
          alertMsg: '닉네임 중복확인 실패',
        },
      };
      setPostData(newData);
      console.log(`닉네임 중복확인 실패`, newData);
    },
  });

  //닉네임 중복확인 버튼 클릭
  const onDuplicateCheckHandler = async () => {
    if (!postData.nickname) {
      window.alert('닉네임을 입력한 뒤 실행해주세요.');
    } else if (userData?.nickname === postData.nickname) {
      window.alert('변경된 닉네임이 없습니다.');
    } else if (postData.nickname) {
      confirmNicknameMutate(postData.nickname);
    }
  };

  return (
    <CommonLayout
      header={
        <NavBar
          btnLeft="back"
          btnRight="submit"
          onClickSubmit={onSubmitHandler}
          onClickActive={
            postData.imgUrl !== null && postData.validation.isValid
          }
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
            onChange={onChangeValueHandler}
            onClick={onDuplicateCheckHandler}
            btnText="중복 확인"
          />
          <div className="error">
            <AuthErrorMsg isValid={postData.validation.isValid}>
              {postData.validation.msg}
            </AuthErrorMsg>
            <Modal
              isOpen={isErrorModalOpen}
              title="오류"
              firstLine={postData.validation.alertMsg}
              onCloseHandler={() => setIsErrorModalOpen(false)}
            />
            <Modal
              isOpen={isAxiosErrorModalOpen}
              title="재 로그인 필요"
              firstLine="사진 다운로드오류 👀  원인 파악중 "
              secondLine="분석을 위해 관리자에게 알려주세요!"
              onCloseHandler={() => setIsAxiosErrorModalOpen(false)}
            />
          </div>
        </StNickNameWrapper>
      </StMyProfileContainer>
    </CommonLayout>
  );
};
