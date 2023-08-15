import { styled } from 'styled-components';
import Logo from 'assets/images/Logo.svg';
export const StStop = styled.div<{ $isHovered: boolean }>`
  width: 1rem;
  height: 1rem;
  opacity: ${(props) => (props.$isHovered ? 1 : 0)};
  transition: opacity 0.3s;
`;
export const StPlayButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  button {
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 2rem;
    color: white;
    cursor: pointer;
  }
`;

export const StRangeContainer = styled.div`
  position: absolute;
  bottom: 5px;
  width: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StyledRangeInput = styled.input<{ playedPercentage: number }>`
  width: 100%;
  height: 5px;
  outline: none;
  -webkit-appearance: none;
  border-radius: 5px;
  background: ${({ playedPercentage }) =>
    `linear-gradient(90deg, rgba(129, 78, 259, 0.8) ${playedPercentage}%, rgba(255, 255, 255, 0.1) ${playedPercentage}%, rgba(255, 255, 255, 0.1) 100%)`};

  // &::-webkit-slider-thumb {
  //   -webkit-appearance: none;
  //   width: 10px;
  //   height: 10px;
  //   background-color: white;
  //   border-radius: 50%;
  //   cursor: pointer;
  // }

  // &::-moz-range-thumb {
  //   width: 10px;
  //   height: 10px;
  //   background-color: white;
  //   border-radius: 50%;
  //   cursor: pointer;
  // }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
    background-image: url(${Logo});
    background-size: 10px 10px; // SVG의 크기를 조절합니다.
    border-radius: 50%; // 필요하다면 원형으로 만들기 위해 사용합니다.
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 10px;
    height: 10px;
    background-image: url(${Logo});
    background-size: 10px 10px;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const StVideoPlayerContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
