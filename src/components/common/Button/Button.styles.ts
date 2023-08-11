import { theme } from 'style/theme';
import { styled } from 'styled-components';

export const StButton = styled.button<{ $active?: boolean }>`
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &.icon {
    font-size: 20px;
  }

  &.normal {
    height: 2.5rem;
    border-radius: 0.875rem;
    border: 2px solid var(--textcolor, #373737);
    background: rgba(227, 227, 227, 0.75);

    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    white-space: nowrap;
    padding: 0 1rem;
  }

  &.circle {
  }

  &.onlytext {
    text-align: center;
    font-size: 0.875rem;
    gap: 0.5rem;
    color: ${(props) =>
      props.$active ? theme.blackColor : theme.mediumGrayColor};
    font-weight: 600;
  }
`;

export const StSubmitButton = styled.input`
  width: 100%;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &.icon {
    font-size: 20px;
  }

  &.normal {
    height: 2.5rem;
    border-radius: 0.875rem;
    border: 2px solid var(--textcolor, #373737);
    background: rgba(227, 227, 227, 0.75);

    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    white-space: nowrap;
    padding: 0 1rem;
  }

  &.circle {
  }

  &.onlytext {
    text-align: center;
    font-size: 0.875rem;
    gap: 0.5rem;
  }
`;
