import styled from 'styled-components';
import { AuthNavButtonProps } from './AuthNavButton';

export const StAuthNavButton = styled.button<AuthNavButtonProps>`
  position: absolute;
  top: 57px;
  background-color: transparent;
  ${(props) => (props.type === 'exit' ? 'right: 25px' : 'left: 25px')};
`;
