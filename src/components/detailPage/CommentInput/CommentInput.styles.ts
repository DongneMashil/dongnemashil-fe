import { styled } from 'styled-components';

export const StFooterWrapper = styled.form`
  display: grid;
  grid-template-columns: 1fr 80px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  gap: 10px;
  width: 100%;
  height: 100%;
`;
export const StFooterContatiner = styled.footer<{ $isCommentShow: boolean }>`
  opacity: ${({ $isCommentShow }) => ($isCommentShow ? 1 : 0)};
  transition: all 0.1s ease-in-out;
  background-color: #fff;
  height: 75px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
