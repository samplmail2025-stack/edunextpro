import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
