import React from 'react';
import { useNavigate } from 'react-router';
import { StAuthNavButton } from './AuthNavButton.styles';
import { ReactComponent as BackButton } from 'assets/icons/ChevronLeft.svg';
import { ReactComponent as XButton } from 'assets/icons/XMark.svg';

export interface AuthNavButtonProps {
  type: 'exit' | 'back';
}

export const AuthNavButton = ({ type = 'back' }: AuthNavButtonProps) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(-1);
  };
  return (
    <StAuthNavButton type={type} onClick={onClickHandler}>
      {type === 'exit' ? <XButton /> : <BackButton />}
    </StAuthNavButton>
  );
};