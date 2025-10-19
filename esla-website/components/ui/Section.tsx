'use client';

import { ReactNode } from 'react';
import Container from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  noContainer?: boolean;
}

export default function Section({ children, className, noContainer }: SectionProps) {
  const content = noContainer ? (
    children
  ) : (
    <Container>
      {children}
    </Container>
  );

  return (
    <section className={`relative z-10 py-20 md:py-28 ${className ?? ''}`}>
      {content}
    </section>
  );
}



