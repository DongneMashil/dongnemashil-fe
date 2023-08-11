import { theme } from 'style/theme';
import { styled } from 'styled-components';

export const StThumbnail = styled.div`
  display: flex;
  flex-direction: column;

  padding: 26px 0 8px;
  border-bottom: 1px solid ${theme.lightGrayColor};

  & div {
  }
`;

export const StThumbnailTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 130px;
  margin: 10px 0;

  & div {
    & img {
      width: 30px;
      height: 30px;
      /* vertical-align: middle;
      transform: translateY(-2px); */
      margin-right: 10px;
    }
  }
`;

export const StThumbnailTitleLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const StTitleText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StThumnailMain = styled.div`
  border-radius: 10px;
  overflow: hidden;

  & img {
    width: 100%;
  }
`;
