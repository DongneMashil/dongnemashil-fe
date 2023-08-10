import { styled } from 'styled-components';

export const StThumbnail = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px 0 24px;
  margin-bottom: 8px;

  & img {
    border-radius: 10px;
  }

  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: 130px;

    & span img {
      vertical-align: middle;
      transform: translateY(-2px);

      margin-right: 10px;
    }
  }
`;
