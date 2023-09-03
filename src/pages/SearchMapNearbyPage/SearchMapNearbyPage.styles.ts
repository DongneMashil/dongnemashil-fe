import styled, { keyframes } from 'styled-components';
import dongdong from 'assets/logo/DongDong.svg';

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

export const StNearbyMapContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;

  & .overlay {
    width: 50px;
    height: 51.23px;
    background-image: url(${dongdong});
    animation: ${blink} 1.5s infinite;
  }
`;
