import { styled } from 'styled-components';

export const SlideContainer = styled.div<{ $width?: number }>`
  display: flex;
  overflow: hidden;
  position: relative;
  min-height: 200px;
  width: ${(props) => (props.$width ? `${props.$width}rem` : '18rem')};
  justify-content: center;
  margin: 0 auto;
`;

export const SlideWrapper = styled.div<{ $translateX: string; $width: string }>`
  display: flex;
  transform: translateX(${(props) => props.$translateX});
  width: ${(props) => props.$width};
  transition: transform 0.3s ease-out;
`;

export const SingleSlide = styled.div<{ $width: string }>`
  width: ${(props) => `${props.$width}rem`};
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
