import { Button } from 'components/common';
import React, { useState, useEffect } from 'react';
import {
  StCenterWrapper,
  StLeftWrapper,
  StNavBar,
  StNavBarContainer,
  StRighttWrapper,
} from './NavBar.styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as Search } from 'assets/icons/Search.svg';
import { ReactComponent as ChevronLeft } from 'assets/icons/ChevronLeft.svg';
import { ReactComponent as LogoHorizontal } from 'assets/logo/LogoHorizontal.svg';
import noUser from 'assets/images/NoUser.jpg';
import { useUpdateUserInfo } from 'hooks';
import { useRecoilState } from 'recoil';
import { historyStackState } from 'recoil/historyStack/historyStack';

export interface NavBarProps {
  children?: React.ReactNode | null;
  btnLeft?: 'logo' | 'back' | 'cancel' | 'closeModal';
  btnSecondRight?: 'search' | null;
  btnRight?: 'done' | 'mypage' | 'submit' | 'map' | null;
  onClickSubmit?: () => void;
  onClickRight?: () => void;
  onClickLeft?: () => void;
  onClickActive?: boolean;
  modal?: {
    title?: string;
    firstLine?: string;
    secondLine?: string;
  };
  $isWritePage?: boolean;
}

export const NavBar = ({
  btnLeft = 'logo',
  btnSecondRight,
  btnRight = 'mypage',
  children,
  onClickSubmit,
  onClickRight,
  onClickLeft,
  onClickActive = true,
  modal,
  $isWritePage = false,
}: NavBarProps) => {
  const { data: userData } = useUpdateUserInfo(true);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [prevScrollY, setPrevScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setPrevScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);

  const isNavBarVisible = scrollDirection === 'up' || window.scrollY <= 50;

  const navigate = useNavigate();
  const location = useLocation();
  const [historyStack, setHistoryStack] = useRecoilState(historyStackState);
  const regex = /write/;

  useEffect(() => {
    setHistoryStack([location.pathname, ...historyStack]);
    if (location.pathname === '/') {
      setHistoryStack([location.pathname]);
    }
  }, [location.pathname]);

  const goBack = () => {
    regex.test(historyStack[0]) ? navigate('/') : navigate(-1);
  };

  const leftButtons = {
    back: (
      <Button type={'iconLeft'} onClick={goBack} ariaLabel="뒤로가기">
        <ChevronLeft />
      </Button>
    ),
    cancel: (
      <Button type={'onlyText'} url={'/'} ariaLabel="취소">
        취소
      </Button>
    ),
    logo: (
      <Button
        type={'icon'}
        onClick={() => window.location.replace('/')}
        ariaLabel="홈으로"
      >
        <LogoHorizontal />
      </Button>
    ),
    closeModal: (
      <Button type={'iconLeft'} onClick={onClickLeft} ariaLabel="뒤로가기">
        <ChevronLeft />
      </Button>
    ),
  };

  const secondRightButtons = {
    search: (
      <Button type={'icon'} url={'/search'} ariaLabel="검색">
        <Search width="21" height="21" />
      </Button>
    ),
  };

  const rightButtons = {
    done: (
      <Button
        type="confirm"
        inputType="button"
        onClick={onClickRight}
        $active={onClickActive}
        ariaLabel="완료"
      >
        완료
      </Button>
    ),
    mypage: userData ? (
      <Button type={'icon'} url={'/mypage'} ariaLabel="마이페이지">
        <img
          src={userData.profileImgUrl || noUser}
          fetchpriority="high"
          alt="프로필 이미지"
        />
      </Button>
    ) : (
      <Button type={'login'} url={'/login'} ariaLabel="로그인">
        로그인
      </Button>
    ),
    submit: (
      <Button
        type={'confirm'}
        onClick={onClickSubmit}
        $active={onClickActive}
        modal={modal}
        inputType="profile"
        ariaLabel="완료"
      >
        완료
      </Button>
    ),
    map: (
      <Button type={'onlyText'} onClick={onClickRight} ariaLabel="지도보기">
        지도보기 {'>'}
      </Button>
    ),
  };

  return (
    <StNavBar
      isNavBarVisible={isNavBarVisible}
      prevScrollY={prevScrollY}
      $isWritePage={$isWritePage}
    >
      <StNavBarContainer>
        <StLeftWrapper>{leftButtons[btnLeft]}</StLeftWrapper>
        {children ? <StCenterWrapper>{children}</StCenterWrapper> : null}
        <StRighttWrapper>
          {btnSecondRight ? secondRightButtons[btnSecondRight] : null}
          {btnRight ? rightButtons[btnRight] : null}
        </StRighttWrapper>
      </StNavBarContainer>
    </StNavBar>
  );
};
