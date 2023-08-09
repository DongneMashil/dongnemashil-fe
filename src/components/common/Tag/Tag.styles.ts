import { styled } from 'styled-components';
interface StTagProps {
  readonly $isSelected: boolean;
}
export const StTagContainer = styled.div<StTagProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1.2rem;
  transition: all 0.1s ease-in-out;
  width: fit-content;
  height: 2rem;
  border-radius: 1.5rem;
  cursor: pointer;
  gap: 0.5rem;

  ${(props) =>
    props.$isSelected
      ? `
      background: #EDE9ED;
      border:none;
      &:hover {
        opacity: 0.8;
      }
        `
      : `
      background: #fff;
      border: 1px solid #b5a6ca;
      &:hover {
        background: #EDE9ED;
      }
        `}

  h5 {
    color: var(--textcolor, #373737);
    text-align: center;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
