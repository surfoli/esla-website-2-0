import { ReactNode } from 'react';
import clsx from 'clsx';

interface HeroGradientCardProps {
  children: ReactNode;
  className?: string;
}

export default function HeroGradientCard({ children, className }: HeroGradientCardProps) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-3xl bg-gradient-to-r from-black via-esla-dark to-esla-primary text-white shadow-[0_28px_60px_-25px_rgba(8,8,8,0.65)]',
        className,
      )}
    >
      <div className="pointer-events-none absolute -left-1/4 top-0 h-full w-1/2 bg-black/40 blur-3xl opacity-70" />
      <div className="pointer-events-none absolute -right-1/4 top-0 h-full w-1/2 bg-esla-primary/80 blur-3xl opacity-60" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
