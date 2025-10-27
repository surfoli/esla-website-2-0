'use client';

import { useLayoutEffect, useRef, useState } from 'react';

type DocumentWithFonts = Document & { fonts?: FontFaceSet };

type Props = {
  text: string;
  className?: string;
  minPx?: number;
  maxPx?: number;
};

export default function AutoShrinkText({ text, className, minPx = 12, maxPx = 42 }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [size, setSize] = useState<number>(maxPx);

  useLayoutEffect(() => {
    const el = spanRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;

    let raf = 0;
    const fit = () => {
      if (!el || !wrap) return;
      
      // Verfügbare Breite ermitteln
      const wrapWidth = wrap.getBoundingClientRect().width;
      const parentWidth = wrap.parentElement?.getBoundingClientRect().width || 0;
      const available = Math.floor(wrapWidth || parentWidth);
      
      if (!available || available < 10) return;

      let low = minPx;
      let high = maxPx;
      let best = minPx;
      
      el.style.whiteSpace = 'nowrap';
      el.style.overflow = 'visible';
      
      // Binäre Suche für optimale Schriftgröße
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        el.style.fontSize = `${mid}px`;
        
        // Kleine Verzögerung für stabiles Layout
        const textWidth = Math.ceil(el.getBoundingClientRect().width);
        
        // Lasse 2px Puffer für Subpixel-Rendering
        if (textWidth <= available - 2) {
          best = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      
      setSize(best);
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(fit);
    };

    // Initiales Fitting
    schedule();
    
    // Window resize
    const onResize = () => schedule();
    window.addEventListener('resize', onResize);
    
    // Container-Resize beobachten
    const ro = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => schedule())
      : undefined;
    if (ro) {
      ro.observe(wrap);
    }
    
    // Font-Loading abwarten
    if (typeof document !== 'undefined') {
      const fonts = (document as DocumentWithFonts).fonts;
      fonts?.ready.then(() => schedule()).catch(() => {});
    }

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      if (ro) {
        try {
          ro.disconnect();
        } catch {
          // ignore
        }
      }
    };
  }, [text, minPx, maxPx]);

  return (
    <div ref={wrapRef} className="min-w-0 w-full">
      <span
        ref={spanRef}
        className={className}
        style={{ 
          fontSize: `${size}px`, 
          lineHeight: 1.2,
          display: 'inline-block',
          whiteSpace: 'nowrap'
        }}
      >
        {text}
      </span>
    </div>
  );
}
