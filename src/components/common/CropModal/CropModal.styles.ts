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
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 8rem;
`;

export const StModalWindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 21.875rem;
  height: fit-content;
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
    max-height: calc(100vh - 12rem);
    max-width: 100vw;
  }
  .message {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3rem 0 2rem 0;
    align-self: center;
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .close {
    position: absolute;
    z-index: 100;
    margin: 10px;
    opacity: 0.5;
    background: none;
  }
`;
