import { Button } from 'components/common';
import React from 'react';
import { StNavBar } from './NavBar.styles';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SearchFlat } from 'assets/icons/SearchFlat.svg';
import noUser from 'assets/images/NoUser.gif';

export interface NavBarProps {
  children?: React.ReactNode | null;
  btnLeft?: 'logo' | 'back' | 'cancel' | 'backfunction';
  btnSecondRight?: 'search' | null;
  btnRight?: 'done' | 'mypage' | 'submit' | 'map' | null;
  onClickSubmit?: () => void;
  onClickRight?: () => void;
  onClickLeft?: () => void;
}

export const NavBar = ({
  btnLeft = 'logo',
  btnSecondRight,
  btnRight = 'mypage',
  children,
  onClickSubmit,
  onClickRight,
  onClickLeft,
}: NavBarProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const leftButtons = {
    back: (
      <Button type={'icon'} onClick={goBack}>
        ⬅️
      </Button>
    ),
    cancel: (
      <Button type={'onlytext'} url={'/'}>
        취소
      </Button>
    ),
    logo: (
      <Button type={'icon'} url={'/'}>
        🏃🏻‍♀️
      </Button>
    ),
    backfunction: (
      <Button type={'onlytext'} onClick={onClickLeft}>
        {'<'}
      </Button>
    ),
  };

  const secondRightButtons = {
    search: (
      <Button type={'icon'} url={'/search'}>
        <SearchFlat width="21" height="21" />
      </Button>
    ),
  };

  const rightButtons = {
    done: (
      <Button type={'onlytext'} url={'/'}>
        완료
      </Button>
    ),
    mypage: (
      <Button type={'icon'} url={'/mypage'}>
        <img src={noUser} alt="user" />
      </Button>
    ),
    submit: (
      <Button type={'normal'} onClick={onClickSubmit}>
        Submit
      </Button>
    ),
    map: (
      <Button type={'onlytext'} onClick={onClickRight}>
        지도보기 {'>'}
      </Button>
    ),
  };

  return (
    <StNavBar>
      <div>{leftButtons[btnLeft]}</div>
      {children ? <div>{children}</div> : null}
      <div>
        {btnSecondRight ? secondRightButtons[btnSecondRight] : null}
        {btnRight ? rightButtons[btnRight] : null}
      </div>
    </StNavBar>
  );
};
