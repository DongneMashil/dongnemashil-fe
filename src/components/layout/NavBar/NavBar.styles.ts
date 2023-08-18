import { styled } from 'styled-components';
import { NavBarProps } from './NavBar';
import { theme } from 'style/theme';

export const StNavBar = styled.div<NavBarProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  background: ${theme.whiteColor};
  border-radius: 0px 0px 14px 14px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.06);

  > div {
    display: flex;
    gap: 12px;
  }
`;

export const StCenterWrapper = styled.div`
  justify-content: center;
  flex: 1.5;
  text-align: center;

  h1 {
    font-size: 18px;
    font-weight: 700;

    svg {
      margin-right: 4px;
      transform: translateY(2px);
    }
  }
`;

export const StLeftWrapper = styled.div`
  flex: 0.5;
`;

export const StRighttWrapper = styled.div`
  justify-content: right;
  flex: 0.5;
`;
