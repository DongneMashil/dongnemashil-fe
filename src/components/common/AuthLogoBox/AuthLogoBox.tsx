import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { throttle } from 'lodash';
import { ReactComponent as LogoImage } from 'assets/logo/LogoHorizontal.svg';
import { ReactComponent as LogoImageLg } from 'assets/logo/LogoHorizontalLg.svg';
import { StLogoBox } from './AuthLogoBox.styles';

export const AuthLogoBox = React.memo(
  ({
    align = 'left',
    page = 'commonLogin',
  }: {
    align?: 'left' | 'center' | 'right';
    page?: 'login' | 'register' | 'commonLogin';
  }) => {
    const [width, setWidth] = useState(window.innerWidth);

    const handleSize = throttle(() => {
      setWidth(window.innerWidth);
    }, 200);

    useEffect(() => {
      window.addEventListener('resize', handleSize);
      return () => {
        window.removeEventListener('resize', handleSize);
      };
    }, []);

    return (
      <StLogoBox $align={align} $page={page}>
        <Link to="/" aria-label="홈으로">
          {width >= 340 ? <LogoImageLg /> : <LogoImage />}
        </Link>
      </StLogoBox>
    );
  }
);

AuthLogoBox.displayName = 'AuthLogoBox';
