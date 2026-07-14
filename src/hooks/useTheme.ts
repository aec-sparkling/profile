import { useCallback, useEffect, useState } from 'react';
import type { Theme } from '../types';

export const THEMES: readonly Theme[] = ['green', 'blue', 'purple', 'cyan', 'red'];

export function useTheme(): { theme: Theme; cycleTheme: () => void } {
  const [theme, setTheme] = useState<Theme>('blue');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const cycleTheme = useCallback(() => {
    setTheme((t) => {
      const rest = THEMES.filter((x) => x !== t);
      return rest[Math.floor(Math.random() * rest.length)];
    });
  }, []);

  return { theme, cycleTheme };
}
