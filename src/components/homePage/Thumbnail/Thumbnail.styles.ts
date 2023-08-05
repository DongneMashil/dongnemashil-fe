import { styled } from 'styled-components';

export const StThumbnail = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;

  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;

  & img {
    filter: brightness(90%);
  }

  & div {
    padding: 0 30px;
    position: relative;
    bottom: 130px;
    height: 0;
  }
`;
