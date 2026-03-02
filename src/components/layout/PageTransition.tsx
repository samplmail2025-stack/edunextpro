import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useNavigationDirection } from '@/contexts/NavigationDirection';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const { direction } = useNavigationDirection();

  const xOffset = direction === 'right' ? 60 : direction === 'left' ? -60 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -xOffset }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ width: '100%', minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  );
}
