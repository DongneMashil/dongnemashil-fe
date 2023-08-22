import { styled } from "styled-components";

export const StImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0.5rem 0;
`;

export const StVideo = styled.video`
  width: 100%;
  height: 100%;
  margin-bottom: 0.5rem 0;
`;

export const StCoverImageButton = styled.button<{ isActive: boolean }>`
  width: 2.4rem;
  height: 2.4rem;
  position: absolute;
  top: 0.69rem;
  left: 0.69rem;
  background: ${(props) =>
    props.isActive ? '#9A7B9A' : 'rgba(154, 123, 154, 0.35)'};
  color: white;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  border: ${(props) => (props.isActive ? 'none' : '1.5px solid white')};
  border-radius: 100%;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;