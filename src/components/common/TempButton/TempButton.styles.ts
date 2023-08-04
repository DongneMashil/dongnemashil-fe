import { styled } from 'styled-components';

// 받아올 styled components의 props 지정
// 앞에 '$'을 붙입니다.
interface StTempButtonProps {
  readonly $colorType: 'blue' | 'black';
}

export const StTempButton = styled.button<StTempButtonProps>`
  padding: 15px 30px;
  border: 2px solid ${(props) => props.$colorType};
  background-color: transparent;
  border-radius: 15px;
  color: ${(props) => props.$colorType};
`;
