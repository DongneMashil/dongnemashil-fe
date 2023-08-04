import React from 'react';
import { StButton } from './Button.styles';
import { Link } from 'react-router-dom';

export interface ButtonProps {
  children?: React.ReactNode;
  type?: 'icon' | 'normal' | 'circle';
  onClick?: () => void;
  url?: string;
}

export const Button = ({
  children,
  type = 'normal',
  onClick,
  url,
}: ButtonProps) => {
  const linkBtn = (
    <StButton className={type}>
      <Link to={url!}>{children}</Link>
    </StButton>
  );
  const onClickBtn = (
    <StButton className={type} onClick={onClick}>
      {children}
    </StButton>
  );
  return url ? linkBtn : onClickBtn;
};

export default Button;
