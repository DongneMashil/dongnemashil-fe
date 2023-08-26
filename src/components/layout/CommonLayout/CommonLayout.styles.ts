import { styled } from 'styled-components';

export const StLayoutOuter = styled.div`
  width: 100vw;
  height: calc(100 * var(--vh));
  background-color: #404040; //#f8f9fa 기본 배경 색상 -> 추후 테마 적용
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const StLayoutBody = styled.div`
  position: relative;
  width: 100vw;
  max-width: 390px; // 최대 너비 -> 추후 반응형 적용
  height: calc(100 * var(--vh));
  max-height: 850px; // 최대 높이 -> 추후 반응형 적용
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;

export const StLayoutSection = styled.div<{
  $headerHeight: string;
  $backgroundColor: string;
}>`
  padding-top: ${(props) => props.$headerHeight}; // 헤더 높이만큼 상단 패딩
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.$backgroundColor}; // 기본 배경 색상 -> 추후 테마 적용
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  overscroll-behavior-y: none; //아이폰 바운싱 효과 막음
`;

export const StSlidingHeader = styled.div<{ $isShow: boolean }>`
  z-index: 100;
  transition: all 0.3s ease-in-out;
  position: absolute;
  top: 0;
  width: 100%;
  opacity: ${(props) => (props.$isShow ? '1' : '0')};
`;

export const StModalPotal = styled.div`
  position: absolute;
  z-index: 1000;
`;
