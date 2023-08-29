import styled, { css } from 'styled-components';
import { theme } from 'style/theme';

const blockHeader = css`
  transform: translateY(0);
`;

const fixedHeader = css`
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
  position: sticky;
  top: 0;
  will-change: transform;
  z-index: 100;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  background: ${theme.whiteColor};
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.06);
  transition: all 0.4s ease-in-out;

  > div > div {
    display: flex;
    gap: 12px;
  }
`;

export const StNavBarContainer = styled.div`
  ${theme.responsiveContainer}
  max-width: 746px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StCenterWrapper = styled.div`
  justify-content: center;
  flex: 1.2;
  overflow: hidden;

  h1 {
    font-size: 18px;
    font-weight: 700;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    text-align: center;

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
