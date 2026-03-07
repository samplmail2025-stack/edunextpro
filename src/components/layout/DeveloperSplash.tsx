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
          style={{ background: 'linear-gradient(135deg, hsl(220 60% 20%), hsl(200 50% 30%))' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <div className="absolute top-20 right-12 w-36 h-36 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute bottom-28 left-10 w-28 h-28 rounded-full bg-white/5 blur-2xl" />

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
            className="relative z-10 flex flex-col items-center"
          >
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center mb-5 overflow-hidden border-4 border-white/20"
              style={{
                background: 'rgba(255,255,255,0.95)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              }}
            >
              <img src={voorheesLogo} alt="Voorhees College Logo" className="w-24 h-24 object-contain" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-center"
            >
              <p className="text-white/60 text-xs font-medium tracking-widest uppercase mb-1">
                Developed by
              </p>
              <h1 className="text-xl font-bold text-white tracking-wide">
                Voorhees College
              </h1>
              <p className="text-white/70 text-sm mt-1 font-medium">
                BCA Department · Vellore
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-20 flex gap-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-white/80"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}