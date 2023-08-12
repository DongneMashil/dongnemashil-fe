import styled from 'styled-components';
import { theme } from 'style/theme';

export const StAuthInputBox = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  & > input {
    width: 100%;
    height: 100%;
    padding: 12px 0;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 400;
    color: ${theme.blackColor};
    background-color: transparent;
    border: 0;
    border-radius: 0;

    &[type='password'] {
      letter-spacing: 0.375rem;
    }

    &::placeholder {
      color: #9a9a9a;
    }
  }

  & > button {
    flex-shrink: 0;
    border-radius: 1rem;
    border: 1px solid ${theme.mainColor};
    padding: 6px 16px;
    color: #434343;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
  }
`;
