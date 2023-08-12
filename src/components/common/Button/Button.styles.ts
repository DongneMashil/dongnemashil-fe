import styled from 'styled-components';
import { theme } from 'style/theme';

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
  }

  &.onlytexttoggle {
    text-align: center;
    font-size: 0.875rem;
    color: ${(props) =>
      props.$active ? theme.blackColor : theme.mediumGrayColor};
    font-weight: 400;
  }

  &.authKakao {
    ${theme.authButton}
    background-color: #f6e24b;
    color: ${theme.mainTextColor};

    & > svg {
      position: absolute;
      left: 22px;
      top: calc(50% - 11.5px);
    }
  }

  &.authNormal {
    ${theme.authButton}
    background-color: ${(props) =>
      props.$active ? theme.mainColor : '#cec7ce'};
    pointer-events: ${(props) => (props.$active ? 'auto' : 'none')};
    color: #ffffff;
  }

  &.authOutline {
    ${theme.authButton}
    background-color: #ffffff;
    color: ${theme.mainColor};
    border: 1px solid ${theme.mainColor};
  }

  & img {
    width: 26px;
    height: 26px;
    border-radius: 50%;
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
