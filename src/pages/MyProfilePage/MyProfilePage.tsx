import { useMutation } from '@tanstack/react-query';
import { postProfile } from 'api/mypageApi';
import { CommonLayout, NavBar } from 'components/layout';
import { useMyProfile, useProfileImageUpload, useVerifyUser } from 'hooks';
import React, { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';
import noUser from 'assets/images/NoUser.gif';
import { AuthInputBox, AuthErrorMsg, Modal } from 'components/common';
import { confirmNickname } from 'api/loginApi';
import { useNavigate } from 'react-router-dom';
import { queryClient } from 'queries/queryClient';
import {
  StMyProfileContainer,
  StNickNameTitle,
  StNickNameWrapper,
  StProfileImage,
} from './MyProfilePage.styles';

export const MyProfilePage = () => {
  const fileUpload = useRef();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(''); // 에러 메시지를 저장하는 상태
  const [doneMsg, setDoneMsg] = useState(''); // 완료 메시지를 저장하는 상태
  //유저정보 조회 및 업데이트
  const { data: userData } = useVerifyUser(true);
  const setUserState = useSetRecoilState(userProfileSelector);

  // 유저정보(닉네임, 사진주소) 조회 및 기존 사진 파일 다운로드
  const { fileUrl, setFileUrl, postData, setPostData } = useMyProfile(
    userData,
    setErrorMsg
  );

  //프로필 사진 업로드
  const { onChangeImage } = useProfileImageUpload(
    setFileUrl,
    postData,
    setPostData
  );

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
    //변경내용 없는경우
    if (
      postData.imgUrl === fileUrl &&
      postData.nickname === userData?.nickname
    ) {
      setErrorMsg('변경된 내용이 없습니다.');
      return;
    } //닉네임 미입력시
    if (postData.nickname === '') {
      setErrorMsg('닉네임을 입력해주세요.');
      return;
    }
    try {
      await postProfile({
        imgUrl: (postData.imgUrl as File)!,
        nickname: postData.nickname!,
      });
      setDoneMsg('프로필 등록에 성공했습니다.');
      queryClient.invalidateQueries(['myPage']);
      setUserState((prev) => ({ ...prev, nickname: postData.nickname }));
    } catch (error) {
      console.error('😀' + error);
      setErrorMsg(`프로필 등록에 실패했습니다. 오류코드:${error}`);
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
          <label
            htmlFor="file"
            className="pcload"
            role="button"
            tabIndex={0}
            aria-label="프로필사진 수정하기"
          >
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
          </div>
        </StNickNameWrapper>
      </StMyProfileContainer>
    </CommonLayout>
  );
};
