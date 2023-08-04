import React from 'react';
import { StLayoutInner, StLayoutOuter } from './CommonLayout.styles';

interface CommonLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const CommonLayout: React.FC<CommonLayoutProps> = ({
  children,
  header,
  footer,
}) => {
  return (
    <StLayoutOuter>
      {header}
      <StLayoutInner>{children}</StLayoutInner>
      {footer}
    </StLayoutOuter>
  );
};
