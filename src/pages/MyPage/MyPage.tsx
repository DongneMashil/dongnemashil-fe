import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout, useUpdateUserInfo } from 'hooks';
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
  const { data } = useUpdateUserInfo(true);

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
  const closeModalHandler = () => {
    setIsModalOpen(false);
  };
  const clickWriteHandler = () => {
    navigate('/write');
  };
  const openLogoutModalHandler = () => {
    setIsLogoutModalOpen(true);
  };
  const closeLogoutModalHandler = () => {
    setIsLogoutModalOpen(false);
  };
  const clickMyCommentHandler = () => {
    navigate('/mypage/comments');
  };

  return (
    <CommonLayout
      header={
        isModalOpen ? (
          <NavBar
            btnLeft="closeModal"
            onClickLeft={closeModalHandler}
            btnRight="mypage"
          ></NavBar>
        ) : (
          <NavBar btnLeft="logo" btnRight="mypage"></NavBar>
        )
      }
      footer={
        <FixFooter onClickRight={clickWriteHandler} rightButtons="write" />
      }
      hideHeader={false}
      backgroundColor="#f5f5f5"
    >
      <StMyPageContainer>
        {isModalOpen ? (
          <>
            <p className="category">내 정보</p>
            <StButton onClick={clickMyCommentHandler} aria-label="내가 쓴 댓글">
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
            <StButton onClick={openLogoutModalHandler} aria-label="로그아웃">
              <LogoutIcon />
              <div className="title">로그아웃</div>
            </StButton>
            <Modal
              isOpen={isLogoutModalOpen}
              onSubmitText="확인"
              title="로그아웃"
              firstLine="로그아웃 하시겠습니까?"
              onSubmitHandler={onLogoutHandler}
              onCloseHandler={closeLogoutModalHandler}
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
            <TabMenu nickName={data?.nickname} />
          </>
        )}
      </StMyPageContainer>
    </CommonLayout>
  );
};
