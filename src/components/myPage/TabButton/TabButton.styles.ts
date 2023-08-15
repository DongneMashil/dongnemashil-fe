import { styled } from 'styled-components';

export const StTabButtonContainer = styled.button<{ $selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  padding: 0.3rem 0.6rem;
  margin: 0.5rem 0;
  border: ${({ $selected }) =>
    $selected ? '1px solid #BFBFBF' : '1px solid transparent'};
  border-radius: 1rem;
  background-color: ${({ $selected }) => ($selected ? '#fff' : '#f5f5f5')};

  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  color: ${({ $selected }) =>
    $selected ? 'var(--correctmessage, #010101)' : '#6C6C6C'};

  cursor: pointer;
`;
