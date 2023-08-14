import { Footer, TabMenu, UserInfo } from 'components/common/myPage';
import { CommonLayout, NavBar } from 'components/layout';
// import React from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';

// import { useNavigate } from 'react-router-dom';
import { useLogout, useVerifyUser } from 'hooks';
import { MyProfile, getMyProfile } from 'api/mypageApi';
import { useRecoilValue } from 'recoil';
import { userProfileSelector } from 'recoil/userExample';
import { useQuery } from '@tanstack/react-query';
import noUser from 'assets/images/NoUser.gif';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LogoutIcon } from 'assets/icons/Logout.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/CommentL.svg';
export const MyPage = () => {
  const [shouldLogout, setShouldLogout] = useState(false);
  const { isError } = useLogout(shouldLogout);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userState = useRecoilValue(userProfileSelector);
  const { data: userData } = useVerifyUser(true);
  useEffect(() => {
    console.log('current user state: ', userState);
    if (userData) {
      console.log('useVerifyUser data: ', userData);
    }
  }, [userState]);

  const onLogoutHandler = useCallback(() => {
    setShouldLogout(true);
  }, []);

  if (isError) {
    console.log('로그아웃 실패');
  }

  const { data } = useQuery<MyProfile, Error>({
    queryKey: ['myPage', userData?.nickname],
    queryFn: () => getMyProfile(),
    // enabled: !!userData?.nickname,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log('🔴' + error);
    },
  });

  const navigate = useNavigate();
  const navigateToProfileHandler = () => {
    navigate('/mypage/profile');
  };
  return (
    <CommonLayout
      header={
        isModalOpen ? (
          <NavBar
            btnLeft="backfunction"
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
            {' '}
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
export const StToProfileButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  color: #4f4f4f;
`;

export const StButton = styled.button`
  ${(props) => props.theme.floatingBox};
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  cursor: pointer;
  width: 95%;
  height: 5rem;
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
  .title {
    font-size: 1.125rem;
    font-weight: 600;
  }
`;

export const StMyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
  height: 100%;
  .category {
    margin: 1rem auto 1rem 1rem;
    color: #767676;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
