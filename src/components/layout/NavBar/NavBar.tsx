import { Button } from 'components/common';
import React, { useState, useEffect } from 'react';
import {
  StCenterWrapper,
  StLeftWrapper,
  StNavBar,
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

  useEffect(() => {
    console.log(historyStack);
    setHistoryStack([location.pathname, ...historyStack]);
    if (location.pathname === '/') {
      setHistoryStack([location.pathname]);
    }
  }, [location.pathname]);

  const goBack = () => {
    location.pathname === '/write' && historyStack[0] === '/writemap/search'
      ? navigate(-4)
      : location.pathname === '/write'
      ? navigate(-2)
      : location.state?.from === '/write'
      ? navigate('/')
      : navigate(-1);
  };

  const leftButtons = {
    back: (
      <Button type={'iconLeft'} onClick={goBack}>
        <ChevronLeft />
      </Button>
    ),
    cancel: (
      <Button type={'onlyText'} url={'/'}>
        취소
      </Button>
    ),
    logo: (
      <Button type={'icon'} url={'/'}>
        <LogoHorizontal />
      </Button>
    ),
    closeModal: (
      <Button type={'iconLeft'} onClick={onClickLeft}>
        <ChevronLeft />
      </Button>
    ),
  };

  const secondRightButtons = {
    search: (
      <Button type={'icon'} url={'/search'}>
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
      >
        완료
      </Button>
    ),
    mypage: userData ? (
      <Button type={'icon'} url={'/mypage'}>
        <img
          src={userData.profileImgUrl || noUser}
          fetchpriority="high"
          alt="프로필 이미지"
        />
      </Button>
    ) : (
      <Button type={'login'} url={'/login'}>
        로그인
      </Button>
    ),
    submit: (
      <Button
        type={'confirm'}
        onClick={onClickSubmit}
        $active={onClickActive}
        modal={modal}
        inputType="submit"
      >
        완료
      </Button>
    ),
    map: (
      <Button type={'onlyText'} onClick={onClickRight}>
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
      <StLeftWrapper>{leftButtons[btnLeft]}</StLeftWrapper>
      {children ? <StCenterWrapper>{children}</StCenterWrapper> : null}
      <StRighttWrapper>
        {btnSecondRight ? secondRightButtons[btnSecondRight] : null}
        {btnRight ? rightButtons[btnRight] : null}
      </StRighttWrapper>
    </StNavBar>
  );
};
