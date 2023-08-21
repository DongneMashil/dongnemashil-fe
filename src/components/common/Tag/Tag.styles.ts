import { styled } from 'styled-components';
interface StTagProps {
  readonly $isSelected: boolean;
  $isHoverEnabled?: boolean;
}
export const StTagContainer = styled.li<StTagProps>`
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  /*드래그 방지*/
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  margin-right: 10px;
  gap: 0.5rem;
  padding: 0rem 1rem;
  border-radius: 1.5rem;

  white-space: nowrap;

  transition: all 0.1s ease-in-out;

  background-color: ${(props) =>
    props.$isSelected ? 'rgba(181, 166, 202, 0.21)' : '#FFF'};
  border: ${(props) =>
    props.$isSelected
      ? ' 1px solid var(--main, #9A7B9A)'
      : '1px solid #DEDEDE'};

  ${(props) =>
    props.$isHoverEnabled &&
    `  
    cursor: pointer; 
    &:hover {
    opacity: ${(props: StTagProps) => (props.$isSelected ? 0.8 : 1)};
    background: ${(props: StTagProps) =>
      props.$isSelected ? '#EDE9ED' : '#EDE9ED'};
  }`}

  h5 {
    color: var(--textcolor, #333);
    text-align: center;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: ${(props) => (props.$isSelected ? '600' : '400')};
    line-height: normal;
    margin: 0.6rem 0;
  }
`;
