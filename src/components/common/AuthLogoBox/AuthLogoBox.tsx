import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoImage } from 'assets/images/Logo.svg';
import { StLogoBox } from './AuthLogoBox.styles';

export const AuthLogoBox = ({
  align = 'left',
}: {
  align?: 'left' | 'center' | 'right';
}) => {
  return (
    <StLogoBox $align={align}>
      <Link to="/">
        <LogoImage width={32} height={36} />
        <span>동네마실</span>
      </Link>
    </StLogoBox>
  );
};
