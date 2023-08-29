import { theme } from 'style/theme';
import { styled } from 'styled-components';

export const StMyCommentCounter = styled.div`
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
  gap: 1rem;
  cursor: pointer;
  width: 100%;
  border-bottom: 1px solid rgb(226, 226, 226);
  padding: 0.7rem 1.5rem;
  img {
    aspect-ratio: 1 / 1;
    margin-right: 0.2rem;
    margin-left: auto;
    width: 4.375rem;
    height: 4.375rem;
    border-radius: 0.5625rem;
  }
  .CommentS {
    width: 0.8125rem;
    height: 0.82806rem;
    flex-shrink: 0;
  }
  .ChevronRight {
    width: 0.47606rem;
    height: 1.0625rem;
    flex-shrink: 0;
  }
`;

export const StMyCommentContainer = styled.div`
  ${theme.responsiveContainer};
  ${(props) => props.theme.floatingBox}
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
  background-color: ${theme.backgroundColor};
`;
