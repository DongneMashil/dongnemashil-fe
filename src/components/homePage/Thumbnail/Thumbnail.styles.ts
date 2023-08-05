import { styled } from 'styled-components';

export const StThumbnail = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;

  border-radius: 20px;
  overflow: hidden;

  & div {
    padding: 0 30px;
    position: relative;
    bottom: 80px;
  }
`;
