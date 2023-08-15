import styled from 'styled-components';

export const StResultMapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  & button {
    position: absolute;
    width: 50px;
    height: 50px;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }
`;
