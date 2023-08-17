import { theme } from 'style/theme';
import styled, { keyframes } from 'styled-components';

const spinnerAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const StLoadingSpinner = styled.div`
  width: 4.8px;
  height: 4.8px;
  border-radius: 4.8px;
  box-shadow:
    12px 0px 0 0 rgba(154, 123, 154, 0.2),
    9.7px 7.1px 0 0 rgba(154, 123, 154, 0.4),
    3.7199999999999998px 11.4px 0 0 rgba(154, 123, 154, 0.6),
    -3.7199999999999998px 11.4px 0 0 rgba(154, 123, 154, 0.8),
    -9.7px 7.1px 0 0 ${theme.mainColor};
  animation: ${spinnerAnimation} 1s infinite linear;
`;
