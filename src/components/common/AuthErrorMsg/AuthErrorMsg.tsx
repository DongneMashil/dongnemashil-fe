import React from 'react';
import { StAuthErrorMsg } from './AuthErrorMsg.styles';

export const AuthErrorMsg = ({ children }: { children: string }) => {
  return <StAuthErrorMsg>{children}</StAuthErrorMsg>;
};
