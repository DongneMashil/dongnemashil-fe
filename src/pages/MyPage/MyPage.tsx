import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { useLogout, useVerifyUser } from 'hooks';
import { MyProfile, getMyProfile } from 'api/mypageApi';
import { userProfileSelector } from 'recoil/userExample';
import { Footer, TabMenu, UserInfo } from 'components/common/myPage';
import { CommonLayout, NavBar } from 'components/layout';
import noUser from 'assets/images/NoUser.gif';
import { ReactComponent as LogoutIcon } from 'assets/icons/Logout.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/CommentL.svg';
import { StButton, StMyPageContainer } from './Mypage.styles';
export const MyPage = () => {
  const navigate = useNavigate();
  const userState = useRecoilValue(userProfileSelector);
  const { data: userData } = useVerifyUser(true);

  const [shouldLogout, setShouldLogout] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log('current user state: ', userState);
    if (userData) {
      console.log('useVerifyUser data: ', userData);
    }
  }, [userState]);

  const onLogoutHandler = useCallback(() => {
    setShouldLogout(true);
  }, []);

  const { isError } = useLogout(shouldLogout);
  if (isError) {
    console.log('로그아웃 실패');
  }

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

  const navigateToProfileHandler = () => {
    navigate('/mypage/profile');
  };

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
      footer={<Footer />}
      hideHeader={false}
      backgroundColor="#f5f5f5"
    >
      <StMyPageContainer>
        {isModalOpen ? (
          <>
            <p className="category">내 정보</p>
            <StButton onClick={() => navigate('/mypage/comments')}>
              <CommentIcon />
              <div className="title">내가 쓴 댓글</div>
            </StButton>
            <StButton onClick={navigateToProfileHandler}>
              <img src={noUser} alt="프로필 이미지" />
              <div className="title">프로필 수정</div>
            </StButton>
            <p className="category">설정</p>
            <StButton onClick={onLogoutHandler}>
              <LogoutIcon />
              <div className="title">로그아웃</div>
            </StButton>
          </>
        ) : (
          <>
            <UserInfo
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
