import { motion, AnimatePresence } from 'framer-motion';
import voorheesLogo from '@/assets/voorhees-logo.png';

interface DeveloperSplashProps {
  show: boolean;
}

export function DeveloperSplash({ show }: DeveloperSplashProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(135deg, hsl(243 75% 59%), hsl(262 83% 58%))' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-20 right-12 w-36 h-36 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-28 left-10 w-28 h-28 rounded-full bg-white/10 blur-2xl" />

          {/* Logo & Text */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, type: 'spring', bounce: 0.4 }}
            className="relative z-10 flex flex-col items-center"
          >
            <div
              className="w-36 h-36 rounded-3xl flex items-center justify-center mb-6 overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.97)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.2)',
              }}
            >
              <img src={voorheesLogo} alt="Voorhees College Logo" className="w-28 h-28 object-contain" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-white/70 text-xs font-medium tracking-widest uppercase mb-1">
                Developed by
              </p>
              <h1 className="text-2xl font-bold text-white tracking-wide">
                Voorhees College
              </h1>
              <p className="text-white/80 text-sm mt-1 font-medium">
                BCA Department
              </p>
            </motion.div>
          </motion.div>

          {/* Subtle pulse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-20 flex gap-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-white"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
