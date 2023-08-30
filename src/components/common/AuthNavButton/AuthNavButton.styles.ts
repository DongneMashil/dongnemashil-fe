import styled from 'styled-components';
import { AuthNavButtonProps } from './AuthNavButton';

export const StAuthNavButton = styled.button<AuthNavButtonProps>`
  position: absolute;
  top: 57px;
  background-color: transparent;
  ${(props) => (props.type === 'exit' ? 'right: 25px' : 'left: 25px')};

  @media screen and (min-width: ${(props) =>
      props.theme.getAuthViewPoint(props.page)}) {
    ${(props) => (props.type === 'exit' ? 'right: 45px' : 'left: 29px')};
  }
`;
