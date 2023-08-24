import { theme } from 'style/theme';
import { keyframes, styled } from 'styled-components';

export const StMyLocationButton = styled.div`
  position: absolute;
  bottom: 3.7rem;
  right: 1.2rem;
  z-index: 1;
`;
const spinnerAnimation = keyframes`

  to {
    transform: rotate(360deg);
  }
`;

export const StMapLoadingSpinner = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
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
