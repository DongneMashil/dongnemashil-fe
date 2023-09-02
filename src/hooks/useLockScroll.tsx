import { useEffect } from 'react';

export function useLockScroll(isLocked: boolean): void {
  useEffect(() => {
    const body = document.body;
    if (isLocked) {
      const originalStyle = window.getComputedStyle(body).overflow;
      body.style.overflow = 'hidden';

      const scrollableElems = document.querySelectorAll('.scrollable');
      scrollableElems.forEach((elem) => {
        (elem as HTMLElement).style.overflow = 'auto';
      });

      return () => {
        body.style.overflow = originalStyle;
      };
    }
  }, [isLocked]);
}
