'use client';

import { useLayoutEffect, useMemo, useRef, useState } from 'react';

type DocumentWithFonts = Document & { fonts?: FontFaceSet };

type Props = {
  homeTeam: string;
  awayTeam: string;
  minPx?: number;
  maxPx?: number;
  homeClassName?: string;
  awayClassName?: string;
};

function estimateInitialSize(text: string, minPx: number, maxPx: number) {
  const normalizedLength = text.replace(/\s+/g, '').length;
  if (normalizedLength === 0) {
    return maxPx;
  }

  const minLen = 8;
  const maxLen = 26;
  if (normalizedLength <= minLen) return maxPx;
  if (normalizedLength >= maxLen) return minPx;

  const ratio = (normalizedLength - minLen) / (maxLen - minLen);
  const sizeRange = maxPx - minPx;
  return Math.round(maxPx - ratio * sizeRange);
}

export default function MatchTeamNames({
  homeTeam,
  awayTeam,
  minPx = 12,
  maxPx = 60,
  homeClassName = 'block font-black text-white leading-tight whitespace-nowrap',
  awayClassName = 'block font-black text-white leading-tight whitespace-nowrap',
}: Props) {
  const homeWrapRef = useRef<HTMLDivElement | null>(null);
  const awayWrapRef = useRef<HTMLDivElement | null>(null);
  const homeSpanRef = useRef<HTMLSpanElement | null>(null);
  const awaySpanRef = useRef<HTMLSpanElement | null>(null);
  const estimatedStart = useMemo(() => {
    const estimateHome = estimateInitialSize(homeTeam, minPx, maxPx);
    const estimateAway = estimateInitialSize(awayTeam, minPx, maxPx);
    return Math.max(minPx, Math.min(maxPx, Math.min(estimateHome, estimateAway)));
  }, [homeTeam, awayTeam, minPx, maxPx]);

  const [size, setSize] = useState<number>(estimatedStart);

  useLayoutEffect(() => {
    setSize(estimatedStart);
  }, [estimatedStart]);

  useLayoutEffect(() => {
    const homeWrap = homeWrapRef.current;
    const awayWrap = awayWrapRef.current;
    const homeSpan = homeSpanRef.current;
    const awaySpan = awaySpanRef.current;

    if (!homeWrap || !awayWrap || !homeSpan || !awaySpan) return;

    let raf = 0;
    const fit = () => {
      if (!homeWrap || !awayWrap || !homeSpan || !awaySpan) return;

      // Verfügbare Breite für beide Container
      const homeAvailable = Math.floor(homeWrap.getBoundingClientRect().width);
      const awayAvailable = Math.floor(awayWrap.getBoundingClientRect().width);

      if (!homeAvailable || !awayAvailable) return;

      let low = minPx;
      let high = maxPx;
      let best = minPx;

      // Beide spans konfigurieren
      homeSpan.style.whiteSpace = 'nowrap';
      awaySpan.style.whiteSpace = 'nowrap';

      // Binäre Suche: Finde größte Schrift, die in BEIDE Container passt
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        
        homeSpan.style.fontSize = `${mid}px`;
        awaySpan.style.fontSize = `${mid}px`;

        const homeWidth = Math.ceil(homeSpan.getBoundingClientRect().width);
        const awayWidth = Math.ceil(awaySpan.getBoundingClientRect().width);

        // Beide müssen passen (mit 2px Puffer)
        const homeFits = homeWidth <= homeAvailable - 2;
        const awayFits = awayWidth <= awayAvailable - 2;

        if (homeFits && awayFits) {
          best = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      setSize((prev) => (prev !== best ? best : prev));
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(fit);
    };

    schedule();

    const onResize = () => schedule();
    window.addEventListener('resize', onResize);

    const ro = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => schedule())
      : undefined;
    if (ro) {
      ro.observe(homeWrap);
      ro.observe(awayWrap);
    }

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
  }, [homeTeam, awayTeam, minPx, maxPx, estimatedStart]);

  return (
    <>
      <div ref={homeWrapRef} className="min-w-0 w-full text-left col-start-1">
        <span
          ref={homeSpanRef}
          className={homeClassName}
          style={{ 
            fontSize: `${size}px`, 
            lineHeight: 1.2,
            display: 'inline-block',
            whiteSpace: 'nowrap'
          }}
        >
          {homeTeam}
        </span>
      </div>
      
      <div ref={awayWrapRef} className="min-w-0 w-full text-right col-start-3">
        <span
          ref={awaySpanRef}
          className={awayClassName}
          style={{ 
            fontSize: `${size}px`, 
            lineHeight: 1.2,
            display: 'inline-block',
            whiteSpace: 'nowrap'
          }}
        >
          {awayTeam}
        </span>
      </div>
    </>
  );
}

