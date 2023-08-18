import styled from 'styled-components';

export const StFixFooter = styled.footer``;

export const StCenterBtnWrapper = styled.div`
  position: absolute;
  bottom: 78px;
  left: 50%;
  transform: translateX(-50%);
`;

export const StRightBtnWrapper = styled.div<{
  type: 'write' | 'goTop';
}>`
  position: absolute;
  bottom: ${(props) => (props.type === 'write' ? '76px' : '69px')};
  right: 14px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;
