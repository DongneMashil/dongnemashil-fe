import styled from 'styled-components';

export const StLoginButtonWrapper = styled.div`
  width: 100%;
  padding: 0 19px;
  @media ${(props) => props.theme.device.tablet} {
    padding: 0 22px;
  }
`;
