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

export const StTopWrapper = styled.div`
  display: flex;
  padding-top: 16px;
  padding-left: 9px;

  & span {
    font-size: 0.875rem;
    color: ${theme.lightGrayColor};
    flex: 1;

    & strong {
      font-weight: 600;
    }
  }
`;

export const StSort = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  flex: 1;
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
