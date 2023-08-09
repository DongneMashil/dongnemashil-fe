import { styled } from 'styled-components';

export const StLayoutOuter = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #f8f9fa; // 기본 배경 색상 -> 추후 테마 적용
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StLayoutBody = styled.div`
  flex: 1;
  position: relative;
  width: 100vw;
  max-width: 390px; // 최대 너비 -> 추후 반응형 적용
  height: 100vh;
  max-height: 850px; // 최대 높이 -> 추후 반응형 적용
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;
export const StLayoutSection = styled.div<{
  $headerHeight: string;
}>`
  padding-top: ${(props) => props.$headerHeight}; // 헤더 높이만큼 상단 패딩
  width: 100%;
  height: 100%;
  background-color: #fff; // 기본 배경 색상 -> 추후 테마 적용
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StSlidingHeader = styled.div<{ $isShow: boolean }>`
  z-index: 100;
  transition: all 0.3s ease-in-out;
  position: absolute;
  top: 0;
  width: 100%;
  opacity: ${(props) => (props.$isShow ? '1' : '0')};
  @media (max-height: 850px) {
    transform: translateY(${(props) => (props.$isShow ? '0' : '-50px')});
  } //overflow문제로 모바일에서만 적용함
`;
