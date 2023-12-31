import { styled } from 'styled-components';

export const StUserInfoContainer = styled.button<{ $isMyPage: boolean }>`
  ${(props) => props.theme.floatingBox}
  cursor:${(props) => (props.$isMyPage ? 'pointer' : 'default')};
  text-align: left;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  .profile {
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    .nameWrapper {
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    .nickname {
      font-size: 1.125rem;
      font-weight: 600;
    }
    .userId {
      font-size: 0.875rem;
      font-weight: 400;
      color: #828282;
    }
  }
  .edit {
    font-size: 1rem;
    font-weight: 600;
    color: #4f4f4f;
  }
`;
