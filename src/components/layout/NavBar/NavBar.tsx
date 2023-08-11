import { Button } from 'components/common';
import React from 'react';
import { StNavBar } from './NavBar.styles';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Search } from 'assets/icons/Search.svg';
import { user } from 'assets/user';

export interface NavBarProps {
  children?: React.ReactNode | null;
  btnLeft?: 'logo' | 'back';
  btnSecondRight?: 'search' | null;
  btnRight?: 'close' | 'mypage' | 'submit' | 'map' | null;
  onClickSubmit?: () => void;
}

export const NavBar = ({
  btnLeft,
  btnSecondRight,
  btnRight,
  children,
  onClickSubmit,
}: NavBarProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const renderBtnLeft = () => {
    return btnLeft === 'logo' ? (
      <Button type={'icon'} url={'/'}>
        {/* <img src={'/logo.jpg'} /> */}
        🏃🏻‍♀️
      </Button>
    ) : (
      <Button type={'icon'} onClick={goBack}>
        {/* <img src={'/backArrow.jpg'} /> */}
        ⬅️
      </Button>
    );
  };

  const renderBtnSecondRight = () => {
    return btnSecondRight === 'search' ? (
      <Button type={'icon'} url={'/search'}>
        <Search />
      </Button>
    ) : null;
  };

  const renderBtnRight = () => {
    return btnRight === 'close' ? (
      <Button type={'icon'} url={'/'}>
        {/* <img src={'/close.jpg'} /> */}
        ✖️
      </Button>
    ) : btnRight === 'mypage' ? (
      <Button type={'icon'} url={'/mypage'}>
        <img src={user} />
      </Button>
    ) : btnRight === 'submit' ? (
      <Button type={'normal'} onClick={onClickSubmit}>
        Submit
      </Button>
    ) : btnRight === 'map' ? (
      <Button type={'normal'} onClick={onClickSubmit}>
        지도보기 {'>'}
      </Button>
    ) : null;
  };

  return (
    <StNavBar>
      {renderBtnLeft()}
      {children ? <div>{children}</div> : null}
      <div>
        {renderBtnSecondRight()}
        {renderBtnRight()}
      </div>
    </StNavBar>
  );
};
