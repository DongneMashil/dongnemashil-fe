import { theme } from 'style/theme';
import { styled } from 'styled-components';

export const StThumbnailWrapper = styled.div`
  width: 100%;
  padding: 0 15px;
  border-radius: 14px;
  background-color: ${theme.whiteColor};
  box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.06);
`;

export const StTarget = styled.div`
  height: 1px;
`;
