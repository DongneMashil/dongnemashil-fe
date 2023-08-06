import { styled } from 'styled-components';

export const SlideContainer = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  min-height: 200px;
  width: 18.75rem;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const CenteredBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 100%;
`;

export const StyledImage = styled.img`
  width: 90%;
  height: 100%;
  object-fit: cover;
`;

export const StyledVideo = styled.video`
  width: 90%;
  height: 100%;
`;

export const StPlusButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  position: relative;
`;

export const PageIndicators = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export const Indicator = styled.span<{ $isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $isActive }) => ($isActive ? 'blue' : 'gray')};
  margin: 0 4px;
  transition: background-color 0.3s ease;
`;

export const ArrowButton = styled.button<{ left?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.left ? 'left: 10px;' : 'right: 10px;')}
  background-color: rgba(255, 255, 255, 0.2); // 반투명한 흰색 배경
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 2;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;
