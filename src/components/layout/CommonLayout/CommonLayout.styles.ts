import { styled } from 'styled-components';

export const StLayoutOuter = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const StLayoutInner = styled.div`
  // position: relative;
  width: 100vw;
  max-width: 390px;
  height: 100vh;
  max-height: 850px;
  overflow-y: scroll;
  // display: flex;
  background-color: #fff;
  flex-direction: column;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
  border-radius: 1rem;
`;
