import React from 'react';
import {
  StHeaderTextH1,
  StHeaderTextH2,
  StHeaderTextH3,
} from './HeaderText.styles';

export interface HeaderTextProps {
  type: 'h1' | 'h2' | 'h3';
  children: string;
}

export const HeaderText = React.memo(
  ({ children, type = 'h1' }: HeaderTextProps) => {
    switch (type) {
      case 'h3':
        return <StHeaderTextH3>{children}</StHeaderTextH3>;
      case 'h2':
        return <StHeaderTextH2>{children}</StHeaderTextH2>;
      case 'h1':
      default:
        return <StHeaderTextH1>{children}</StHeaderTextH1>;
    }
  }
);

HeaderText.displayName = 'HeaderText';
