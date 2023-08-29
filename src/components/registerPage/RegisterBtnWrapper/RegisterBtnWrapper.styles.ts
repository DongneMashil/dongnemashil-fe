import styled from 'styled-components';

export const StButtonWrapper = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 0 22px;
  margin: 75px auto 0;

  @media screen and (min-width: 360px) {
    padding: 0 32px;
    margin: 54px auto 0;

    & > button {
      height: 47px !important;
    }
  }
`;
