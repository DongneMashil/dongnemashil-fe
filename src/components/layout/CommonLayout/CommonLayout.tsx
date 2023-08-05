import React from 'react';
import {
  StLayoutBody,
  StLayoutOuter,
  StLayoutSection,
} from './CommonLayout.styles';

interface CommonLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  headerHeight?: number;
  footerHeight?: number;
}

export const CommonLayout: React.FC<CommonLayoutProps> = ({
  children,
  header,
  footer,
  headerHeight,
  footerHeight,
}) => {
  let gap = 0;
  if (footer) gap = footerHeight ? footerHeight : 50;
  if (header) gap = headerHeight ? headerHeight : 50;
  if (header && footer) gap = 100;

  return (
    <StLayoutOuter>
      <StLayoutBody $gap={gap}>
        {header}
        <StLayoutSection>{children}</StLayoutSection>
        {footer}
      </StLayoutBody>
    </StLayoutOuter>
  );
};
