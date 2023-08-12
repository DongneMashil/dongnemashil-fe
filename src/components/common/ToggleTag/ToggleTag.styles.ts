import { styled } from 'styled-components';

export const StTagWrapper = styled.ul`
  padding: 1rem;
  overflow-x: auto;
  white-space: nowrap;
`;

export const StTagBox = styled.li<{ $isSelected: boolean }>`
  display: inline-block;
  white-space: nowrap;
  margin-right: 10px;

  line-height: 2.2rem;
  font-size: 14px;
  background-color: ${(props) => (props.$isSelected ? '#b5a6ca' : '#FAFAFA')};
  border: 1px solid #dedede;
  border-radius: 2.2rem;

  > span {
    padding: 0 16px;

    img {
      transform: translateY(4px);
      margin-right: 6px;
    }
  }
`;
