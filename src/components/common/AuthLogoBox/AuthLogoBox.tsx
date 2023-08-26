import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoImage } from 'assets/icons/LogoHorizontal.svg';
import { StLogoBox } from './AuthLogoBox.styles';

export const AuthLogoBox = ({
  align = 'left',
}: {
  align?: 'left' | 'center' | 'right';
}) => {
  return (
    <StLogoBox $align={align}>
      <Link to="/">
        <LogoImage />
      </Link>
    </StLogoBox>
  );
};
