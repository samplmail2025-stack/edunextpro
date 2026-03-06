import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useNavigationDirection } from '@/contexts/NavigationDirection';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const { direction } = useNavigationDirection();

  const slideDistance = direction === 'right' ? '18%' : direction === 'left' ? '-18%' : '0%';
  const exitSlide = direction === 'right' ? '-8%' : direction === 'left' ? '8%' : '0%';

  return (
    <motion.div
      initial={{ opacity: 0, x: slideDistance, scale: 0.97 }}
      animate={{ opacity: 1, x: '0%', scale: 1 }}
      exit={{ opacity: 0, x: exitSlide, scale: 0.98 }}
      transition={{
        duration: 0.28,
        ease: [0.32, 0.72, 0, 1],
      }}
      style={{ width: '100%', minHeight: '100vh', willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}
