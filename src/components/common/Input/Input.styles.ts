import { styled } from 'styled-components';

export const StInput = styled.input`
  width: 100%;
  height: 2.5rem;
  outline: none;
  font-size: 16px;
  padding: 10px;
  border-radius: 2rem;
  padding-left: 1.2rem;
  border: 1px solid var(--inputboxstroke, #bfbfbf);
  background: #f6f6f6;
  box-sizing: border-box;
  &::placeholder {
    color: var(--inputplaceholder, #616161);
  }
`;
