import { useEffect, useState } from 'react';

export interface ScrollState {
  /** current scrollY in px */
  y: number;
  /** 0–1 progress through the page */
  progress: number;
}

export function useScroll(): ScrollState {
  const [state, setState] = useState<ScrollState>({ y: 0, progress: 0 });

  useEffect(() => {
    let raf = 0;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setState({
          y: window.scrollY,
          progress: max > 0 ? Math.min(window.scrollY / max, 1) : 0,
        });
      });
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return state;
}
