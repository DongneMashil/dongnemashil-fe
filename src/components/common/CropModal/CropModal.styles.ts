import { theme } from 'style/theme';
import { styled } from 'styled-components';

export const StModalButtonWrpper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3.75rem;
  margin-bottom: 0;
  margin-top: auto;

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
`;

export const StModalOverlay = styled.div`
  ${theme.overlayBackground}
`;

export const StModalWindow = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  align-items: center;
  width: 21.875rem;
  height: fit-content;
  // min-height: 15.625rem;
  flex-shrink: 0;
  background-color: white;
  border-radius: 0.625rem;
  overflow: hidden;
  box-shadow: 0 0.125rem 0.625rem 0 rgba(0, 0, 0, 0.1);
  .cropper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .message {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3rem 0 2rem 0;
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
