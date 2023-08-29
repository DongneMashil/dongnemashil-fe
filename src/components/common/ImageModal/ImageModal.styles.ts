import { styled } from 'styled-components';

export const StModalOverlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  p {
    font-size: 0.8rem;
    color: white;
  }
`;

export const StModalWindow = styled.div`
  position: relative;
  box-shadow: 0 0.125rem 0.625rem 0 rgba(0, 0, 0, 0.2);
  img {
    max-width: 80vw;
    max-height: 80vh;
  }
`;

export const StDownloadButton = styled.a`
  border: none;
  cursor: pointer;
  outline: none;
  color: white;
  font-size: 0.9rem;
`;
