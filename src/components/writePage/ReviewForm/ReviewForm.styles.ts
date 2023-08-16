import { styled } from "styled-components";

export const StHiddenButton = styled.input`
  display: none;
`;

export const StContentBox = styled.textarea`
  width: 90%;
  height: 17rem;
  margin: 2rem auto;
  resize: none;
  padding: 0.45rem;
  border: none;
  &:focus {
    outline: 1px solid #9a7b9a;
    border-radius: 1rem;
  }
`;

export const StTitle = styled.input`
  width: 90%;
  height: 3.7525rem;
  padding-left: 0.3rem;
  border: none;
  border-bottom: 1px solid #e2e2e2;
  color: #a9a9a9;
  font-size: 1.33rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-top: 1.25rem;
  outline: none;
`;

export const StFormWrapper = styled.div`
  width: 100%;
  margin-top: 0.75rem;
  background-color: #fff;
  border-top-left-radius: 0.875rem;
  border-top-right-radius: 0.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;