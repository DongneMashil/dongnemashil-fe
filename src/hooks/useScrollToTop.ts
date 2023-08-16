import { useEffect } from 'react';

export const useScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        showScrollButton(true);
      } else {
        showScrollButton(false);
      }
    };

    const showScrollButton = (show: boolean) => {
      const scrollButton = document.getElementById('scroll-to-top-button');

      if (scrollButton) {
        if (show) {
          scrollButton.style.display = 'block';
        } else {
          scrollButton.style.display = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    scrollToTop,
  };
};
