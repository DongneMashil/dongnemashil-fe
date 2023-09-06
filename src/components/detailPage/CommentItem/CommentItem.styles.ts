import { styled } from 'styled-components';

export const StDetailPageCommentItem = styled.div`
  min-height: 3.125rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 0rem 0.5rem 0rem 0.5rem;
  border-radius: 0.875rem;
  padding-bottom: 10px;
  border-bottom: 1px solid #f3f3f3;

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

  .content {
    line-height: 1.3;
    width: 100%;
    overflow-wrap: break-word;
  }
`;

export const StCommentHeader = styled.section`
  display: flex;
  align-items: center;

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
  .divider {
    color: #8c8c8c;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin: 0 5px;
  }

  img {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

export const StCommentButton = styled.button`
  color: #8c8c8c;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  background: none;
  .left {
    margin-left: auto;
  }
  .done {
    color: var(--strokepurple, #9a7b9a);
    font-weight: 800;
  }
  .done:disabled {
    color: #8c8c8c;
    font-weight: 600;
  }
`;
