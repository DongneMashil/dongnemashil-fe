import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { useLogout, useVerifyUser } from 'hooks';
import { MyProfile, getMyProfile } from 'api/mypageApi';
import { userProfileSelector } from 'recoil/userExample';
import { TabMenu, UserInfo } from 'components/myPage';
import { CommonLayout, FixFooter, NavBar } from 'components/layout';
import noUser from 'assets/images/NoUser.gif';
import { ReactComponent as LogoutIcon } from 'assets/icons/Logout.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/CommentL.svg';
import { StButton, StMyPageContainer } from './Mypage.styles';
import { Modal } from 'components/common';
export const MyPage = () => {
  const navigate = useNavigate();
  const [shouldLogout, setShouldLogout] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  //유저정보 조회 및 업데이트
  const { data: userData } = useVerifyUser(true);
  const userState = useRecoilValue(userProfileSelector);
  useEffect(() => {
    console.log('current user state: ', userState);
    if (userData) {
      console.log('useVerifyUser data: ', userData);
    }
  }, [userState]);

  //로그아웃
  const onLogoutHandler = useCallback(() => {
    setShouldLogout(true);
  }, []);
  const { isError } = useLogout(shouldLogout);
  if (isError) {
    console.log('로그아웃 실패');
  }

  //프로필 수정 이동
  const navigateToProfileHandler = () => {
    navigate('/mypage/profile');
  };

  //내 정보 조회
  const { data } = useQuery<MyProfile, Error>({
    queryKey: ['myPage', userData?.nickname],
    queryFn: () => getMyProfile(),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log('🔴' + error);
    },
  });

  return (
    <CommonLayout
      header={
        isModalOpen ? (
          <NavBar
            btnLeft="closeModal"
            onClickLeft={() => setIsModalOpen(false)}
            btnRight="mypage"
          ></NavBar>
        ) : (
          <NavBar btnLeft="logo" btnRight="mypage"></NavBar>
        )
      }
      footer={
        <FixFooter
          onClickRight={() => navigate('/write')}
          rightButtons="write"
        />
      }
      hideHeader={false}
      backgroundColor="#f5f5f5"
    >
      <StMyPageContainer>
        {isModalOpen ? (
          <>
            <p className="category">내 정보</p>
            <StButton
              onClick={() => navigate('/mypage/comments')}
              aria-label="내가 쓴 댓글"
            >
              <CommentIcon />
              <div className="title">내가 쓴 댓글</div>
            </StButton>
            <StButton
              onClick={navigateToProfileHandler}
              aria-label="프로필 수정"
            >
              <img src={noUser} alt="프로필 이미지" />
              <div className="title">프로필 수정</div>
            </StButton>
            <p className="category">설정</p>
            <StButton
              onClick={() => setIsLogoutModalOpen(true)}
              aria-label="로그아웃"
            >
              <LogoutIcon />
              <div className="title">로그아웃</div>
            </StButton>
            <Modal
              isOpen={isLogoutModalOpen}
              onSubmitText="확인"
              title="로그아웃"
              firstLine="로그아웃 하시겠습니까?"
              onSubmitHandler={() => onLogoutHandler()}
              onCloseHandler={() => setIsLogoutModalOpen(false)}
            />
          </>
        ) : (
          <>
            <UserInfo
              aria-label="프로필 메뉴 열기"
              profileImgUrl={data?.profileImgUrl}
              nickName={data?.nickname}
              email={data?.email}
              setIsModalOpen={setIsModalOpen}
            />
            <TabMenu nickName={userData?.nickname} />
          </>
        )}
      </StMyPageContainer>
    </CommonLayout>
  );
};
