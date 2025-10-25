'use client';

import { useLayoutEffect, useRef, useState } from 'react';

type Props = {
  text: string;
  className?: string;
  minPx?: number;
  maxPx?: number;
};

export default function AutoShrinkText({ text, className, minPx = 12, maxPx = 42 }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [size, setSize] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const el = spanRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;

    let raf = 0;
    const fit = () => {
      if (!el || !wrap) return;
      const available = wrap.clientWidth;
      let low = minPx;
      let high = maxPx;
      let best = minPx;
      el.style.whiteSpace = 'nowrap';
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        el.style.fontSize = `${mid}px`;
        // Force layout and measure against stable available width
        const fits = el.scrollWidth <= available;
        if (fits) { best = mid; low = mid + 1; } else { high = mid - 1; }
      }
      if (best !== size) setSize(best);
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(fit);
    };

    schedule();
    const onResize = () => schedule();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, [text, minPx, maxPx]);

  return (
    <div ref={wrapRef} className="min-w-0">
      <span ref={spanRef} className={className} style={size ? { fontSize: `${size}px`, lineHeight: 1.1 } : undefined}>
        {text}
      </span>
    </div>
  );
}
