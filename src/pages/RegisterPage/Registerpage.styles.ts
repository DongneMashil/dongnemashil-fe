import { styled } from 'styled-components';
import { theme } from 'style/theme';

export const StLoginContainer = styled.div`
  ${theme.authLayout};
`;

export const StLoginWrapper = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 30px auto 76px;

  @media screen and (min-width: 360px) {
    margin: 50px auto 75px;
    & h1 {
      margin-bottom: 57px;
    }
  }
`;

export const StErrorMsgBox = styled.div`
  margin: 4px 0 0;
`;
