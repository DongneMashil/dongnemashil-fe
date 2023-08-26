import React from 'react';
import { Input, InputProps } from '../Input/Input';
import { Button } from '../Button/Button';
import { StAuthInputBox } from './AuthInputBox.styles';

interface AuthInputBoxProps extends InputProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  btnText?: string;
}

const AuthInputBoxComponent = ({
  type,
  name,
  id,
  value,
  onChange,
  placeholder,
  disabled,
  onClick = undefined,
  btnText = '',
}: AuthInputBoxProps) => {
  return (
    <StAuthInputBox>
      <Input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      {onClick && (
        <Button type="onlyText" onClick={onClick}>
          {btnText}
        </Button>
      )}
    </StAuthInputBox>
  );
};

export const AuthInputBox = React.memo(AuthInputBoxComponent);
AuthInputBox.displayName = 'AuthInputBox';
