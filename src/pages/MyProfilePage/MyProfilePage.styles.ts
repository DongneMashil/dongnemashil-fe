import { styled } from 'styled-components';

export const StNickNameTitle = styled.div`
  margin-top: 40px;
  width: 100%;
  color: var(--strokepurple, #9a7b9a);
  font-family: Pretendard;
`;

export const StNickNameWrapper = styled.div`
  margin: 0 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  width: 100%;

  .error {
    margin-left: 0.3rem;
    margin-right: auto;
  }
`;
export const StMyProfileContainer = styled.div`
  width: 100%;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
export const StProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;

  img {
    width: 84px;
    height: 84px;
    border-radius: 50px;
    object-fit: cover;
  }
  .loadimg {
    background: none;
    color: var(--strokepurple, #9a7b9a);
    text-align: center;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
    height: 40px;
  }
`;
