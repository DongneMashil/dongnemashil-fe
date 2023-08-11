import { styled } from 'styled-components';
import { theme } from 'style/theme';

interface StVerifyMsgProps {
  readonly $isValid: boolean;
}

export const StVerifyMsg = styled.p<StVerifyMsgProps>`
  color: ${(props) => (props.$isValid ? 'green' : 'red')};
`;

export const StLoginContainer = styled.div`
  ${theme.authLayout};
`;

export const StLoginWrapper = styled.div`
  margin: 57px 0 76px;
`;

export const StLogoBox = styled.div`
  display: flex;
  gap: 5px;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 34px;

  & > span {
    color: ${theme.mainTextColor};
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.12px;
  }
`;
