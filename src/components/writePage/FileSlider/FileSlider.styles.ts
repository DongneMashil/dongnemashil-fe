import { styled } from 'styled-components';

export const StSlideContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  min-height: 200px;
  width: 18.75rem;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const StCenteredBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 100%;
  padding: 5rem;
`;

export const StPlusButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  cursor: pointer;

  & > p {
    color: #9a7b9a;
    text-align: center;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

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

export const StImageContainer = styled.div`
  position: relative;
  width: 90%;
  height: 100%;
`;

export const StCoverImageButton = styled.button<{ isActive: boolean }>`
  position: absolute;
  top: 0.8rem;
  right: 0.9rem;
  background: ${(props) => (props.isActive ? 'green' : 'grey')};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

export const StDelete = styled.button`
  position: absolute;
  top: 0.8rem;
  left: 0.9rem;
  background: none;
  color: #fff;
  font-size: 1.2rem;
`