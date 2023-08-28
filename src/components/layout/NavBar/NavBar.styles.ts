import styled, { css } from 'styled-components';
import { theme } from 'style/theme';

const blockHeader = css`
  transform: translateY(0);
`;

const fixedHeader = css`
  position: fixed;
  top: 0;
  transform: translateY(0);
`;

const hiddenHeader = css`
  transform: translateY(-100%);
`;

const basicNavBar = css`
  border-radius: 0px 0px 14px 14px;
`;

export const StNavBar = styled.div<{
  isNavBarVisible: boolean;
  prevScrollY: number;
  $isWritePage?: boolean;
}>`
  ${(props) =>
    props.isNavBarVisible === false
      ? hiddenHeader
      : props.prevScrollY > 50
      ? fixedHeader
      : blockHeader};
  ${(props) => (props.$isWritePage ? null : basicNavBar)}
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  background: ${theme.whiteColor};
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease-in-out;

  > div {
    display: flex;
    gap: 12px;
  }
`;

export const StCenterWrapper = styled.div`
  justify-content: center;
  flex: 1.2;
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
  flex: 0.8;
`;

export const StRighttWrapper = styled.div`
  justify-content: right;
  flex: 0.8;
`;
