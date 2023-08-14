import styled from 'styled-components';

export interface StAuthErrorMsgProps {
  readonly $isValid: boolean;
}

export const StAuthErrorMsg = styled.p<StAuthErrorMsgProps>`
  color: ${(props) => (props.$isValid ? '#996899' : '#b62222')};
  font-size: 14px;
  line-height: normal;
`;
