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

export const StSort = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  padding-top: 16px;
  color: ${theme.lightGrayColor};

  & button:nth-child(2):before {
    align-self: center;
    background: #ebebeb;
    content: '';
    height: 10px;
    margin-left: 8.5px;
    margin-right: 8.5px;
    width: 1px;
  }
`;
