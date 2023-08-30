import React from 'react';
import { Button, ButtonProps } from 'components/common/Button/Button';
import { StLoginButtonWrapper } from 'pages/LoginPage/LoginPage.styles';

interface LoginBtnWrapperProps extends ButtonProps {
  label?: string;
}

export const LoginBtnWrapper = React.memo(
  ({ type, onClick, $active, label }: LoginBtnWrapperProps) => {
    return (
      <StLoginButtonWrapper>
        <Button
          type={type}
          onClick={onClick}
          $active={$active}
          ariaLabel={label}
        >
          {label}
        </Button>
      </StLoginButtonWrapper>
    );
  }
);

LoginBtnWrapper.displayName = 'LoginBtnWrapper';
