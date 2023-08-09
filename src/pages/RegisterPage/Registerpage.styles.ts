import { styled } from 'styled-components';

interface StVerifyMsgProps {
  readonly $isValid: boolean;
}

export const StVerifyMsg = styled.p<StVerifyMsgProps>`
  color: ${(props) => (props.$isValid ? 'green' : 'red')};
`;
