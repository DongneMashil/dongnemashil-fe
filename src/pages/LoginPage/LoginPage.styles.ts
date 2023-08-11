import styled, { css } from 'styled-components';
import { theme } from 'style/theme';
import { StButton } from 'components/common/Button/Button.styles';

export interface StLoginButtonProps {
  $type?: 'kakao' | 'common' | 'register';
}

export const StLoginContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StLoginButtonWrapper = styled.div`
  width: 100%;
  margin-top: 145px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 9px;
`;

export const StLoginButton = styled(StButton)<StLoginButtonProps>`
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

export const StLoginTag = styled.span`
  width: 124px;
  height: 23px;
  border: 1px solid #d4d4d4;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 5px;
  margin-bottom: 4px;

  color: ${theme.mainTextColor};
  text-align: center;
  font-size: 14px;
  font-weight: 500;

  & > svg {
    transform: rotate(-14.689deg);
  }
`;
