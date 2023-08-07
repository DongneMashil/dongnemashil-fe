import { styled } from 'styled-components';

export const StContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StHiddenButton = styled.input`
  display: none;
`;

export const StContentBox = styled.textarea`
  width: 22rem;
  height: 17rem;
  margin: 2rem auto;
  resize: none;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 0.45rem;
`;

export const StTitle = styled.input`
  width: 22rem;
  height: 1.8rem;
  padding-left: 0.3rem;
`;
