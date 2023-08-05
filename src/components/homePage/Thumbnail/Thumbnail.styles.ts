import { styled } from 'styled-components';

export const StThumbnail = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;
  margin-bottom: 20px;

  & img {
    filter: brightness(90%);
  }

  & div {
    padding: 0 30px;
    bottom: 130px;
  }
`;
