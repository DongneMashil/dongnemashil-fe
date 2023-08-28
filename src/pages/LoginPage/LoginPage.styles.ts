import styled from 'styled-components';
import { theme } from 'style/theme';
import GuideBg from 'assets/images/LoginGuideBg.svg';

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

export const StLogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
`;

export const StLoginButtonWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  & hr {
    width: 100%;
    height: 0.6px;
    background-color: #e2e2e2;
    border: 0;
    margin: 19px 0 13px;
  }

  & button {
    margin-bottom: 9px;
  }
  & button:last-of-type {
    margin-bottom: 4px;
  }
`;

export const StLoginTag = styled.span`
  width: 130px;
  height: 32px;
  background-image: url('${GuideBg}');
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 5px;
  padding-bottom: 5px;
  margin-bottom: 6.34px;

  color: ${theme.mainTextColor};
  text-align: center;
  font-size: 14px;
  font-weight: 500;

  & > svg {
    transform: rotate(-14.689deg);
  }
`;
