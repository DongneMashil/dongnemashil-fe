import { useCallback, useMemo, useState } from 'react';

export const BODY_SCROLL_LOCK_IGNORE = 'data-body-scroll-lock-ignore';

export const useAllowTouchMove = <T extends HTMLElement>() => {
  const [overflow, setOverflow] = useState(false);

  const measuredRef = useCallback((node: T) => {
    if (node !== null) {
      if (
        node.getBoundingClientRect().height < node.scrollHeight ||
        node.getBoundingClientRect().width < node.scrollWidth
      ) {
        setOverflow(true);
      } else {
        setOverflow(false);
      }
    }
  }, []);

  const allowTouchMove = useMemo(() => {
    if (overflow) {
      return { [BODY_SCROLL_LOCK_IGNORE]: 'true' };
    }
    return {};
  }, [overflow]);

  return [measuredRef, allowTouchMove];
};
