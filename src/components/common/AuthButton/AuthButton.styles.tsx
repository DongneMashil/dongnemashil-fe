import styled, { css } from 'styled-components';
import { theme } from 'style/theme';
import { StButton } from '../Button/Button.styles';

export interface StAuthButtonProps {
  $type?: 'kakao' | 'common' | 'register';
}

export const StAuthButton = styled(StButton)<StAuthButtonProps>`
  width: 100%;
  height: 44px;
  font-size: 16px;
  border: 0;
  background-color: ${theme.mainColor};
  color: #ffffff;
  font-weight: 700;
  border-radius: 25px;

  ${(props) =>
    props.$type === 'kakao' &&
    css`
      background-color: #f6e24b;
      color: ${theme.mainTextColor};
      margin-bottom: 13px;

      & > svg {
        margin-right: 10px; // ! 이후 flex 다듬기
      }
    `}
  ${(props) =>
    props.$type === 'register' &&
    css`
      background-color: #ffffff;
      color: ${theme.mainColor};
      border: 1px solid ${theme.mainColor};
    `}
`;
