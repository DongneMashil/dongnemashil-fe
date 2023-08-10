import { styled } from 'styled-components';

export const StDetailPageComment = styled.div<{ $isCommentShow: boolean }>`
  opacity: ${({ $isCommentShow }) => ($isCommentShow ? 1 : 0)};
  transition: all 0.1s ease-in-out;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: calc(850px);
`;
export const StDetailPageCommentList = styled.div`
  width: 100%;
  // height: 100%;  이거 넣으면 이상하게 레이아웃 깨짐(최하단 spacer가 높이가 0이됨)
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StDetailPageCommentItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 1rem;
  border-radius: 0.875rem;
  background: #fbfbfb;

  section {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  img {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .nickname {
    font-size: 1rem;
    font-weight: 600;
    margin-right: 10px;
  }
  .date {
    font-size: 0.875rem;
    color: gray;
    margin-right: 10px;
    margin-left: auto;
  }

  .content {
    line-height: 1.3;
  }
`;
