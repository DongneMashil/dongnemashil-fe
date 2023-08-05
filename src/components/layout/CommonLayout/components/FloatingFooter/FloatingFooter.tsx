import React from 'react';
import {
  StFloatingFooter,
  StFloatingFooterFixed,
} from './FloatingFooter.styles';
interface FooterProps {
  children: React.ReactNode;
}

export const FloatingFooter = ({ children }: FooterProps) => {
  return (
    <StFloatingFooter>
      <StFloatingFooterFixed className="fixed">
        {children}
      </StFloatingFooterFixed>
    </StFloatingFooter>
  );
};
