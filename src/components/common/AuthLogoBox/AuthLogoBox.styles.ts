import styled from 'styled-components';

export interface AuthLogoBoxProps {
  $align: 'left' | 'center' | 'right';
  $page: 'login' | 'register' | 'commonLogin';
}

export const StLogoBox = styled.div<AuthLogoBoxProps>`
  width: auto;
  display: flex;
  gap: 5px;
  justify-content: ${(props) => {
    switch (props.$align) {
      case 'left':
        return 'flex-start';
      case 'right':
        return 'flex-end';
      case 'center':
      default:
        return 'center';
    }
  }};
  align-items: center;
  margin-bottom: 34px;

  & > a {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;
