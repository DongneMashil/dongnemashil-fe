import React from 'react';
import { StInputLabel } from './RegisterLabel.styles';

export const RegisterLabel = React.memo(
  ({ children }: { children: string }) => {
    return <StInputLabel>{children}</StInputLabel>;
  }
);

RegisterLabel.displayName = 'RegisterLabel';
