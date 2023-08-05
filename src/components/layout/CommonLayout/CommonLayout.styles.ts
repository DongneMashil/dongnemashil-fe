import { styled } from 'styled-components';

export const StLayoutOuter = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-height: 1000px) {
    justify-content: flex-start;
  }
`;
interface StLayoupBodyProps {
  readonly $gap: number;
}
export const StLayoutBody = styled.div<StLayoupBodyProps>`
  position: relative;
  width: 100vw;
  max-width: 390px;
  height: calc(100vh - ${(props) => props.$gap}px);
  max-height: 850px;
  // display: flex;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
  border-radius: 1rem;
`;
export const StLayoutSection = styled.div<{ $headerHeight: number }>`
  padding-top: ${(props) => props.$headerHeight}px;
  width: 100%;
  height: 100%;
  // display: flex;
  background-color: #fff;
  flex-direction: column;
  overflow-y: scroll;
`;

export const StSlidingHeader = styled.div<{ $isShow: boolean }>`
  transition: all 0.3s ease-in-out;
  position: absolute;
  top: 0;
  width: 100%;

  opacity: ${(props) => (props.$isShow ? '1' : '0')};
  // transform: translateY(${(props) => (props.$isShow ? '0' : '-50px')});
`;
