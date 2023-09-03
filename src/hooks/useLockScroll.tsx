import { useEffect } from 'react';
/**
 * useLockScroll
 * @param 첫번째 인자값 : 스크롤 막을지 말지 결정하는 boolean 값
 * @param 두번째 인자값 : 스크롤 막을 요소의 className (예: 'scrollable')
 */
export const useLockScroll = (isLocked: boolean, classname: string): void => {
  useEffect(() => {
    const body = document.body;
    if (isLocked) {
      const originalStyle = window.getComputedStyle(body).overflow; // 원래 스크롤 스타일 저장
      body.style.overflow = 'hidden'; // 스크롤 막기

      const scrollableElems = document.querySelectorAll(`.${classname}`);
      scrollableElems.forEach((elem) => {
        (elem as HTMLElement).style.overflow = 'auto';
      });

      return () => {
        // cleanup (언마운트시)
        body.style.overflow = originalStyle;
      };
    }
  }, [isLocked]);
};
