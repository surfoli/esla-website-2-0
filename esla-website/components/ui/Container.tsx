import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={`w-full max-w-[1200px] xl:max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 ${className ?? ''}`}
      style={{ maxWidth: '1320px', marginLeft: 'auto', marginRight: 'auto' }}
    >
      {children}
    </div>
  );
}



