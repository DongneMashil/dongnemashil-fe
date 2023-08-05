import React from 'react';
import { StFooter, StFooterFixed } from './Footer.styles';
export const Footer = () => {
  return (
    <StFooter>
      <StFooterFixed className="fixed">
        <div>Footer</div>
        <div>Footer</div>
      </StFooterFixed>
    </StFooter>
  );
};
