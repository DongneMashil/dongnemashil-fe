import { styled } from 'styled-components';
import { ButtonProps } from './Button';

export const StButton = styled.button<ButtonProps>`
  background: none;
  &.icon {
    font-size: 20px;
  }

  &.normal {
    font-size: 20px;
  }

  &.circle {
  }
`;
