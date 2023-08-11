import { Button } from 'components/common';
import React from 'react';
import { StNavBar } from './NavBar.styles';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SearchFlat } from 'assets/icons/SearchFlat.svg';
import noUser from 'assets/images/NoUser.gif';

export interface NavBarProps {
  children?: React.ReactNode | null;
  btnLeft?: 'logo' | 'back' | 'cancel' | 'backfunction' | null;
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

  const renderBtnLeft = () => {
    return btnLeft === 'back' ? (
      <Button type={'icon'} onClick={goBack}>
        ⬅️
      </Button>
    ) : btnLeft === 'cancel' ? (
      <Button type={'onlytext'} url={'/'}>
        취소
      </Button>
    ) : btnLeft === 'logo' ? (
      <Button type={'icon'} url={'/'}>
        🏃🏻‍♀️
      </Button>
    ) : (
      <Button type={'onlytext'} onClick={onClickLeft}>
        {'<'}
      </Button>
    );
  };

  const renderBtnSecondRight = () => {
    return btnSecondRight === 'search' ? (
      <Button type={'icon'} url={'/search'}>
        <SearchFlat width="21" height="21" />
      </Button>
    ) : null;
  };

  const renderBtnRight = () => {
    return btnRight === 'done' ? (
      <Button type={'onlytext'} url={'/'}>
        완료
      </Button>
    ) : btnRight === 'mypage' ? (
      <Button type={'icon'} url={'/mypage'}>
        <img src={noUser} />
      </Button>
    ) : btnRight === 'submit' ? (
      <Button type={'normal'} onClick={onClickSubmit}>
        Submit
      </Button>
    ) : btnRight === 'map' ? (
      <Button type={'onlytext'} onClick={onClickRight}>
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
