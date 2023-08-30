import styled from 'styled-components';
import { theme } from 'style/theme';

export const StCommonLoginLayout = styled.div`
  ${theme.authLayout};
  padding: 143px 25px 43px;
  background-color: #ffffff;
  overflow: hidden;

  @media screen and (min-width: 340px) {
    padding: 187px 25px 43px;
  }
`;

export const StCommonLoginContainer = styled.div`
  ${theme.responsiveContainer};
  max-width: 340px;
  & > div:nth-of-type(2) {
    margin-bottom: 15px;
    box-sizing: content-box;

    @media screen and (min-width: 340px) {
      padding-top: 26px;
    }
  }
`;
