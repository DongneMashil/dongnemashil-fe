import { theme } from 'style/theme';
import { styled } from 'styled-components';

export const StToProfileButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  font-size: 1rem;
  font-weight: 600;
  color: #4f4f4f;
`;

export const StButton = styled.button`
  padding: 1rem;
  margin-bottom: 1rem;
  ${(props) => props.theme.floatingBox};

  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 5rem;
  gap: 1rem;
  cursor: pointer;
  width: 95%; // 이 부분을 padding으로 처리할 경우, UserInfo, TabMenu의 width가 100%가 되지 않음
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }

  .title {
    font-size: 1.125rem;
    font-weight: 600;
  }
`;

export const StMyPageContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 0 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  .category {
    margin: 1rem auto 1rem 1rem;
    color: #767676;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
  }
  ${theme.responsiveContainer};
`;
