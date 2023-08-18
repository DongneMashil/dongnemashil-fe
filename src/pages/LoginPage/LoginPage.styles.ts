import styled from 'styled-components';
import { theme } from 'style/theme';

export interface StLoginButtonProps {
  $type?: 'kakao' | 'common' | 'register';
}

export const StLoginContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 25px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  & > button:first-of-type {
    position: absolute;
    top: 57px;
    left: 25px;
  }
`;

export const StLoginButtonWrapper = styled.div`
  width: 100%;
  margin-top: 145px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 9px;

  & button:first-of-type {
    margin-bottom: 13px;
  }
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
