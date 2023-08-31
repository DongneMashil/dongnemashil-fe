import { theme } from 'style/theme';
import { styled } from 'styled-components';

export const StDetailPageComment = styled.div<{ $isCommentShow: boolean }>`
  opacity: ${({ $isCommentShow }) => ($isCommentShow ? 1 : 0)};
  transition: all 0.1s ease-in-out;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: ${theme.size.tablet};
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
  gap: 1rem;
  padding: 0rem 0.5rem 0rem 0.5rem;
  border-radius: 0.875rem;
  &:nth-child(n + 1)::after {
    content: '';
    width: 100%;
    height: 1px;
    background: #f3f3f3;
  }
  input {
    width: 100%;
    height: 1.875rem;
    outline: none;
    font-size: 1rem;
    padding: 10px;
    border-radius: 1rem;
    padding-left: 1rem;
    border: none;
    background: rgba(154, 123, 154, 0.08);

    box-sizing: border-box;
    &::placeholder {
      color: var(--textcolor, #333);
      text-align: center;
      font-family: Pretendard;
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  button {
    color: #8c8c8c;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background: none;
  }

  .divider {
    color: #8c8c8c;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin: 5px;
  }
  section {
    display: flex;
    align-items: center;
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
  }
  .date {
    font-size: 0.875rem;
    color: gray;
    margin-right: auto;
    margin-left: 10px;
  }

  .content {
    line-height: 1.3;
    width: 100%;
    overflow-wrap: break-word;
  }
  .left {
    margin-left: auto;
  }
  .center {
    color: var(--strokepurple, #9a7b9a);
    text-align: center;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
