import { styled } from 'styled-components';
import { ButtonProps } from './Button';

export const StButton = styled.button<ButtonProps>`
  background: none;
  &.icon {
    font-size: 20px;
  }

  &.normal {
    height: 2.5rem;
    border-radius: 0.875rem;
    border: 2px solid var(--textcolor, #373737);
    background: rgba(227, 227, 227, 0.75);
    //
    color: var(--textcolor, #373737);
    text-align: center;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    white-space: nowrap;
    padding: 0 1rem;
  }

  &.circle {
  }
`;
