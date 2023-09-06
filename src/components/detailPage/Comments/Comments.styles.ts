import { theme } from 'style/theme';
import { styled } from 'styled-components';

export const StDetailPageComment = styled.div<{ $isCommentShow: boolean }>`
  overflow-x: hidden;

  opacity: ${({ $isCommentShow }) => ($isCommentShow ? 1 : 0)};
  transition: all 0.1s ease-in-out;
  width: 100%;
  height: 100%;

  max-width: ${theme.size.tablet};
`;
export const StDetailPageCommentList = styled.div`
  padding-top: 16px;
  width: calc(100vw - 27px); //너비 조정됨. 스크롤막는거 추가후
  max-width: calc(
    ${theme.size.tablet} - 27px
  ); //너비 조정됨. 스크롤막는거 추가후
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StEmptyComment = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin: 3rem 0;

  .dongdong {
    margin-top: 1rem;
    height: 13rem;
    @media (max-height: 550px) {
      height: 8rem;
    }

    opacity: 0.4;
  }
  .text {
    margin-top: 1rem;
    color: #8c8c8c;
    text-align: center;
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background: none;
    opacity: 0.7;
  }
`;
