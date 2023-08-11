import { Button } from 'components/common';
import React from 'react';
import { StNavBar } from './NavBar.styles';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Search } from 'assets/icons/Search.svg';
import { user } from 'assets/user';

export interface NavBarProps {
  children?: React.ReactNode | null;
  btnLeft?: 'logo' | 'back' | 'cancle';
  btnSecondRight?: 'search' | null;
  btnRight?: 'done' | 'mypage' | 'submit' | 'map' | null;
  onClickSubmit?: () => void;
}

export const NavBar = ({
  btnLeft = 'logo',
  btnSecondRight,
  btnRight = 'mypage',
  children,
  onClickSubmit,
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
    ) : btnLeft === 'cancle' ? (
      <Button type={'onlytext'} url={'/'}>
        취소
      </Button>
    ) : (
      <Button type={'icon'} url={'/'}>
        🏃🏻‍♀️
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
    return btnRight === 'done' ? (
      <Button type={'onlytext'} url={'/'}>
        완료
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
      <Button type={'onlytext'} url={'/'}>
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
