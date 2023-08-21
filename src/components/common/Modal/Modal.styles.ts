import { styled } from 'styled-components';

export const StModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  height: 100%;
  width: 70%;

  padding: 0 0.625rem;

  text-align: center;

  h1 {
    color: var(--textcolor, #333);
    text-align: center;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  h2 {
    color: var(--textcolor, #333);
    text-align: center;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const StModalButtonWrpper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3.75rem;

  button {
    background: none;
    border: none;
    outline: none;
    color: var(--textcolor, #333);

    text-align: center;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
  }
  .right {
    width: 30rem;
    height: 3.75rem;
    right: 0;
    background-color: var(--unpressedtag, #ede1ed);
  }
  .left {
    width: 100%;
    height: 3.75rem;
    background-color: #d8d8d8;
  }
  .center {
    width: 100%;
    height: 3.75rem;
    background-color: var(--unpressedtag, #ede1ed);
  }
`;

export const StModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  max-width: 390px; // 최대 너비 -> 추후 반응형 적용
  height: 100vh;
  max-height: 850px; // 최대 높이 -> 추후 반응형 적용
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const StModalWindow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 21.875rem;
  height: 11.25rem;
  flex-shrink: 0;
  background-color: white;
  border-radius: 0.625rem;
  overflow: hidden;
  box-shadow: 0 0.125rem 0.625rem 0 rgba(0, 0, 0, 0.1);
`;
