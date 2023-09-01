import React from 'react';
import { Input, InputProps } from '../Input/Input';
import { Button } from '../Button/Button';
import { StAuthInputBox } from './AuthInputBox.styles';

interface AuthInputBoxProps extends InputProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  btnText?: string;
}

export const AuthInputBox = React.memo(
  ({
    type,
    name,
    id,
    value,
    onChange,
    placeholder,
    disabled,
    onClick,
    onKeyDown,
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
          onKeyDown={onKeyDown}
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
  }
);

AuthInputBox.displayName = 'AuthInputBox';
