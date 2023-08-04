import { Button } from 'components/common';
import React from 'react';
import { StNavBar } from './NavBar.styles';
import { useNavigate } from 'react-router-dom';

export interface NavBarProps {
  children?: React.ReactNode;
  btnLeft?: 'logo' | 'back';
  btnRight?: 'close' | 'myPage' | 'submit';
}

const NavBar = ({ btnLeft, btnRight, children }: NavBarProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const onClickSubmit = () => {};

  return (
    <StNavBar>
      {btnLeft === 'logo' ? (
        <Button type={'icon'} url={'/'}>
          <img src={'/logo.jpg'} />
        </Button>
      ) : (
        <Button type={'icon'} onClick={goBack}>
          <img src={'/backArrow.jpg'} />
        </Button>
      )}
      <div>{children}</div>
      {btnRight === 'close' ? (
        <Button type={'icon'} url={'/'}>
          <img src={'/close.jpg'} />
        </Button>
      ) : btnRight === 'myPage' ? (
        <Button type={'normal'} url={'/myPage'}>
          My
        </Button>
      ) : (
        <Button type={'normal'} onClick={onClickSubmit}>
          Submit
        </Button>
      )}
    </StNavBar>
  );
};

export default NavBar;
