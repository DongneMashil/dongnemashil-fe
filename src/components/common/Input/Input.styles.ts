import { styled } from 'styled-components';

export const StInput = styled.input`
  width: 100%;
  height: 2.5rem;
  outline: none;
  font-size: 16px;
  padding: 0 10px;
  border-radius: 0.875rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #f6f6f6;
  box-sizing: border-box;
  &::placeholder {
    color: #ccc;
  }
`;
