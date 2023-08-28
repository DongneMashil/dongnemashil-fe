import React from 'react';
import { StLoginErrorMsgBox } from './LoginErrorMsgBox.styles';
import { AuthErrorMsg } from 'components/common';

export const LoginErrorMsgBox = React.memo(
  ({ errorMsg }: { errorMsg: string }) => {
    return (
      <StLoginErrorMsgBox>
        {errorMsg && <AuthErrorMsg isValid={false}>{errorMsg}</AuthErrorMsg>}
      </StLoginErrorMsgBox>
    );
  }
);

LoginErrorMsgBox.displayName = 'LoginErrorMsgBox';
