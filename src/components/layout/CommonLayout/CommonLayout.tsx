import React from 'react';
import { StLayoutInner, StLayoutOuter } from './CommonLayout.styles';

interface CommonLayoutProps {
  children: React.ReactNode;
}

export const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <StLayoutOuter>
      <StLayoutInner>{children}</StLayoutInner>
    </StLayoutOuter>
  );
};
