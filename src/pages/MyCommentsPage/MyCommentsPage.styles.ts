import { theme } from 'style/theme';
import { styled } from 'styled-components';

export const StMyCommentCounter = styled.div`
  display: flex;
  align-items: center;
  color: rgb(131, 131, 131);
  font-family: Pretendard;
  font-size: 0.875rem;

  font-weight: 600;

  margin: 1rem;
`;

export const StButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  cursor: pointer;
  width: 100%;
  border-bottom: 1px solid rgb(226, 226, 226);
  padding: 0.7rem 1.5rem;
  img {
    aspect-ratio: 1 / 1;
    margin-right: 16px;
    margin-left: auto;
    width: 4.375rem;
    height: 4.375rem;
    border-radius: 0.5625rem;
  }
  .CommentS {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }
  .ChevronRight {
    height: 16px;
    flex-shrink: 0;
  }
  .comment {
    margin: 0 16px 0 10px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const StMyCommentContainer = styled.div`
  ${theme.responsiveContainer};
  ${(props) => props.theme.floatingBox}
  max-width: 700px;
  padding: 0rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StTarget = styled.div`
  height: 100px;
`;

export const StCounterWrapper = styled.div`
  ${theme.responsiveContainer};
`;

export const StMyCommentsLayout = styled.div`
  ${theme.responsiveLayout};
  min-height: 100vh;
  height: 100%;
  padding-bottom: 3rem;
  background-color: ${theme.backgroundColor};
`;
