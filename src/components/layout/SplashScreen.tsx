import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '@/assets/edunext-logo.png';

interface SplashScreenProps {
  show: boolean;
}

export function SplashScreen({ show }: SplashScreenProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(135deg, hsl(243 75% 59%), hsl(262 83% 58%))' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <div className="absolute top-16 left-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-24 right-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, type: 'spring', bounce: 0.3 }}
            className="relative z-10 flex flex-col items-center"
          >
            <div
              className="w-36 h-36 rounded-3xl flex items-center justify-center mb-5 overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.97)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
              }}
            >
              <img src={logoImg} alt="EduNext Logo" className="w-28 h-28 object-contain" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-center"
            >
              <h1 className="text-4xl font-black text-white tracking-wide italic">
                EduNext
              </h1>
              <p className="text-white/80 text-sm mt-1 font-medium tracking-wider">
                Your Future Navigator
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
                className="w-2.5 h-2.5 rounded-full bg-white"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}