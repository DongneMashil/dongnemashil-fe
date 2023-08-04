import { styled } from 'styled-components';
import { NavBarProps } from './NavBar';

export const StNavBar = styled.div<NavBarProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
`;
