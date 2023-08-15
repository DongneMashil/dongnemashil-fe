import React from 'react';
import { Input, InputProps } from '../Input/Input';
import { Button } from '../Button/Button';
import { StAuthInputBox } from './AuthInputBox.styles';

interface AuthInputBoxProps extends InputProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  btnText?: string;
}

export const AuthInputBox = ({
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
