import React from 'react';
import { useNavigate } from 'react-router';
import { StAuthNavButton } from './AuthNavButton.styles';
import { ReactComponent as BackButton } from 'assets/icons/ChevronLeft.svg';
import { ReactComponent as XButton } from 'assets/icons/XMark.svg';

export interface AuthNavButtonProps {
  type: 'exit' | 'back';
  page?: 'login' | 'register' | 'commonLogin';
}

export const AuthNavButton = React.memo(
  ({ type = 'back', page }: AuthNavButtonProps) => {
    const navigate = useNavigate();
    const onClickHandler = () => {
      navigate(-1);
    };
    return (
      <StAuthNavButton
        type={type}
        page={page}
        onClick={onClickHandler}
        aria-label={type}
      >
        {type === 'exit' ? <XButton /> : <BackButton />}
      </StAuthNavButton>
    );
  }
);

AuthNavButton.displayName = 'AuthNavButton';
