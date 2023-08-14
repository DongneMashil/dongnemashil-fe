import { theme } from 'style/theme';
import styled from 'styled-components';

export const StButton = styled.button<{
  $width?: string;
  $height?: string;
  $stroke?: string;
  $round?: string;
  $active?: boolean;
}>`
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

  &.borderround {
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
    border-radius: ${(props) => props.$round};
    border: ${(props) => props.$stroke} solid ${theme.mainColor};
    background: rgba(247, 246, 246, 0.8);
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));

    & span {
      color: ${theme.pointColor};
      font-weight: 700;
      margin-left: 6px;
    }
  }

  &.circlefill {
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
    border-radius: 50%;
    background: ${theme.mainColor};
    opacity: 0.9;
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));

    color: ${theme.whiteColor};
    font-weight: 500;
    font-size: 0.875rem;
    line-height: normal;
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
