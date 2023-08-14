import { Button } from 'components/common';
import styled from 'styled-components';

export const StResultMapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const StCurPosButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;
