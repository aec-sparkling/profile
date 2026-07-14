import { useCallback, useEffect, useState } from 'react';
import type { Theme } from '../types';

export const THEMES: readonly Theme[] = ['green', 'amber', 'blue'];

function isTheme(value: string | null): value is Theme {
  return value !== null && (THEMES as readonly string[]).includes(value);
}

export function useTheme(): { theme: Theme; cycleTheme: () => void } {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return isTheme(saved) ? saved : 'green';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const cycleTheme = useCallback(() => {
    setTheme((t) => THEMES[(THEMES.indexOf(t) + 1) % THEMES.length]);
  }, []);

  return { theme, cycleTheme };
}
