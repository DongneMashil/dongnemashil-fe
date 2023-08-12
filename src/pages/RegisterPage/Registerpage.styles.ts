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
