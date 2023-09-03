import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNavigateOnReload = (path: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      sessionStorage.setItem('reload', 'true');
      e.returnValue =
        '변경사항이 저장되지 않을 수 있습니다. 페이지를 떠나시겠습니까?';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('reload') === 'true') {
      sessionStorage.removeItem('reload');
      navigate(path);
    }
  }, [navigate, path]);
};
