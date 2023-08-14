import React from 'react';
import { StAuthErrorMsg } from './AuthErrorMsg.styles';

interface AuthErrorMsgProps {
  children: string;
  isValid?: boolean;
}

export const AuthErrorMsg = ({
  children,
  isValid = false,
}: AuthErrorMsgProps) => {
  return <StAuthErrorMsg $isValid={isValid}>{children}</StAuthErrorMsg>;
};
