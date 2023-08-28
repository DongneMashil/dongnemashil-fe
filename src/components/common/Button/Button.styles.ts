import styled, { css } from 'styled-components';
import { theme } from 'style/theme';

const btnShadow = css`
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
`;

export const StButton = styled.button<{
  $width?: string;
  $height?: string;
  $stroke?: string;
  $round?: string;
  $active?: boolean;
  $shadow?: boolean;
}>`
  ${(props) => (props.$shadow ? btnShadow : null)}
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

  &.borderRound {
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
    border-radius: ${(props) => props.$round};
    border: ${(props) => props.$stroke} solid ${theme.mainColor};
    background: rgba(247, 246, 246, 0.8);

    & span {
      color: ${theme.pointColor};
      font-weight: 700;
      margin-left: 6px;
    }
  }

  &.circleFill {
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
    border-radius: 50%;
    background: ${theme.mainColor};
    opacity: 0.9;

    color: ${theme.whiteColor};
    font-weight: 500;
    font-size: 0.875rem;
    line-height: normal;
  }
  &.circle {
    width: 2.125rem;
    height: 2.125rem;
    border-radius: 50%;
    border: 1px solid #b3a6b3;
  }
  &.onlyText {
    text-align: center;
    font-size: 0.875rem;
    gap: 0.5rem;
    color: ${theme.blackColor};
  }

  &.onlyTextToggle {
    text-align: center;
    font-size: 0.875rem;
    color: ${(props) =>
      props.$active ? theme.blackColor : theme.mediumGrayColor};
    font-weight: 400;
  }

  &.iconLeft {
    margin-left: 0.5rem;
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
  &.commentInput {
    ${theme.authButton}
    height: 2.5rem;
    background-color: #ffffff;
    color: ${theme.mainColor};
    border: 1px solid ${theme.mainColor};
  }
  &.confirm {
    color: ${(props) => (props.$active ? 'var(--main, #9a7b9a)' : '#A2A2A2')};
    text-align: center;
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-right: 0.5rem;
  }

  & img {
    width: 26px;
    height: 26px;
    border-radius: 50%;
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

  &.login {
    width: 50px;
    height: 22px;
    border-radius: 16px;
    border: 1px solid ${theme.mainColor};
    font-size: 0.75rem;
    font-weight: 800;
    color: ${theme.mainColor};
  }
`;

export const StSubmitButton = styled.button<{
  $active?: boolean;
}>`
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &.confirm {
    color: ${(props) => (props.$active ? 'var(--main, #9a7b9a)' : '#A2A2A2')};
    text-align: center;
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-right: 0.5rem;
  }
  &.commentInput {
    width: 100%;
    font-size: 1rem;
    border: 0;
    box-sizing: border-box;
    font-weight: 700;
    border-radius: 20px;
    height: 2.5rem;
    background-color: #ffffff;
    color: ${theme.mainColor};
    border: 1px solid ${theme.mainColor};
  }
`;
