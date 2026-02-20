import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  hasBottomNav?: boolean;
}

export function PageWrapper({ children, className = '', hasBottomNav = true }: PageWrapperProps) {
  return (
    <div className={`min-h-screen bg-background ${hasBottomNav ? 'bottom-safe' : 'pb-6'} animate-fade-in ${className}`}>
      {children}
    </div>
  );
}
