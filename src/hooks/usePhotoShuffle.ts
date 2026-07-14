import { useEffect, useRef, useState } from 'react';

const PHOTO_COUNT = 84;
const PHOTOS = Array.from({ length: PHOTO_COUNT }, (_, i) => `photos/p${String(i + 1).padStart(3, '0')}.jpg`);
const SWITCH_THRESHOLD = 250; // px of accumulated movement per photo switch

/** Cycles through photo set; switch rate tracks pointer speed. */
export function usePhotoShuffle(): string {
  const [index, setIndex] = useState(0);
  const moved = useRef(0);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    function onPointerMove(e: PointerEvent) {
      const last = lastPointer.current;
      if (last) moved.current += Math.hypot(e.clientX - last.x, e.clientY - last.y);
      lastPointer.current = { x: e.clientX, y: e.clientY };

      if (moved.current >= SWITCH_THRESHOLD) {
        moved.current = 0;
        setIndex((i) => {
          let next = Math.floor(Math.random() * PHOTO_COUNT);
          if (next === i) next = (next + 1) % PHOTO_COUNT;
          return next;
        });
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  return PHOTOS[index];
}
