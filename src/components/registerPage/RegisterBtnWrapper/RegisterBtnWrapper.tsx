import React from 'react';
import { Button, ButtonProps } from 'components/common';
import { StButtonWrapper } from './RegisterBtnWrapper.styles';

interface RegisterBtnWrapperProps extends ButtonProps {
  label?: string;
}

export const RegisterBtnWrapper = React.memo(
  ({ type, onClick, $active, label }: RegisterBtnWrapperProps) => {
    return (
      <StButtonWrapper>
        <Button type={type} onClick={onClick} $active={$active}>
          {label}
        </Button>
      </StButtonWrapper>
    );
  }
);

RegisterBtnWrapper.displayName = 'RegisterBtnWrapper';
