import { styled } from 'styled-components';

export const StImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0.5rem 0;
  @media ${(props) => props.theme.device.desktop} {
    aspect-ratio: 1/1.3;
  }
`;

export const StVideo = styled.video`
  max-width: 100%;
  max-height: 100%;
  margin-bottom: 0.5rem 0;
  @media ${(props) => props.theme.device.desktop} {
    margin: auto;
  }
`;

export const StVideoTablet = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;

  @media ${(props) => props.theme.device.desktop} {
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1.3;
  }
`;

export const StCoverImageButton = styled.button<{ isActive: boolean }>`
  width: 2.4rem;
  height: 2.4rem;
  position: absolute;
  top: 1.19rem;
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

  &:hover {
    opacity: 1;
  }
`;
