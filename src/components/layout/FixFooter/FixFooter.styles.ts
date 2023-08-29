import { theme } from 'style/theme';
import styled from 'styled-components';

export const StFixFooter = styled.footer``;

export const StCenterBtnWrapper = styled.div`
  position: fixed;
  bottom: 78px;
  left: 50%;
  transform: translateX(-50%);

  @media ${theme.device.desktop} {
    display: none;
  }
`;

export const StRightBtnWrapper = styled.div<{
  type: 'write' | 'goTop';
}>`
  position: fixed;
  bottom: ${(props) => (props.type === 'write' ? '76px' : '69px')};
  right: 14px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  .rightMap {
    display: ${(props) => (props.type === 'goTop' ? 'none' : 'flex')};
  }

  @media ${theme.device.desktop} {
    right: 50%;
    transform: translateX(360px);

    .rightMap {
      display: ${(props) => (props.type === 'goTop' ? 'flex' : 'none')};

      & button:first-child {
        display: flex;
        flex-direction: column;
        & span {
          margin-left: 0;
        }
        & > svg {
          width: 15px;
        }
      }
    }
  }
`;
