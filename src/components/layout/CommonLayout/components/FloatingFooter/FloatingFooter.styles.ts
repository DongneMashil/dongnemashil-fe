import { styled } from 'styled-components';

export const StFloatingFooter = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;
`;
export const StFloatingFooterFixed = styled.div`
  transform: translateY(-100%);
  position: fixed;
  width: 100vw;
  max-width: 390px;
  height: fit-content;
`;
