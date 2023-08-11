import { styled } from 'styled-components';

export const StTagWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.42rem;
  padding: 1rem;
`;

export const StTagBox = styled.span<{ $isSelected: boolean }>`
  border: 1px solid #dedede;
  height: 1.5rem;
  line-height: 1.6rem;
  border-radius: 1rem;
  font-size: 14px;
  padding: 0 0.8rem;
  background-color: ${(props) => (props.$isSelected ? '#b5a6ca' : '#FAFAFA')};
`;
