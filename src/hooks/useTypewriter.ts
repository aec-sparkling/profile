import { useEffect, useState } from 'react';

export function useTypewriter(lines: readonly string[]): string {
  const [text, setText] = useState('');
  const [line, setLine] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = lines[line % lines.length];
    const speed = deleting ? 35 : 75;
    const id = setTimeout(() => {
      if (!deleting) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = full.slice(0, text.length - 1);
        setText(next);
        if (next === '') {
          setDeleting(false);
          setLine((l) => l + 1);
        }
      }
    }, speed);
    return () => clearTimeout(id);
  }, [text, deleting, line, lines]);

  return text;
}
