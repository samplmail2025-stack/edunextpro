import { motion } from 'framer-motion';
import { Download, Zap, WifiOff, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { canInstallPWA, installPWA } from '@/lib/pwa';
import { useState } from 'react';
import logoImg from '@/assets/edunext-logo.png';

export default function PWAGate() {
  const [installing, setInstalling] = useState(false);

  const handleInstall = async () => {
    setInstalling(true);
    const installed = await installPWA();
    setInstalling(false);
    if (installed) {
      window.location.reload();
    }
  };

  const canInstall = canInstallPWA();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 gradient-primary opacity-5" />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.3 }}
        className="relative z-10 text-center"
      >
        <motion.img
          src={logoImg}
          alt="EduNext"
          className="w-28 h-28 mx-auto mb-6 object-contain drop-shadow-xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        <h1 className="text-3xl font-black text-foreground mb-2">EduNext</h1>
        <p className="text-muted-foreground text-sm mb-8">
          "Know Your Marks. Choose Your Path. Build Your Future."
        </p>

        {/* Install card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-3xl border border-border p-6 mb-6 max-w-sm mx-auto"
          style={{ boxShadow: '0 20px 60px -15px rgba(0,0,0,0.12)' }}
        >
          <div className="flex items-center gap-2 mb-3 justify-center">
            <Download className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Install App Required</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            EduNext works best as an installed app. Install it to get the full experience with offline access.
          </p>

          {canInstall ? (
            <Button
              onClick={handleInstall}
              disabled={installing}
              className="w-full h-12 rounded-xl gradient-primary border-0 font-bold text-base"
              style={{ boxShadow: '0 8px 25px -5px rgba(99,102,241,0.4)' }}
            >
              <Download className="w-5 h-5 mr-2" />
              {installing ? 'Installing...' : 'Install EduNext'}
            </Button>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">
                📱 <strong>Android:</strong> Tap the ⋮ menu → "Add to Home Screen"
              </p>
              <p className="text-xs text-muted-foreground">
                🍎 <strong>iOS:</strong> Tap Share → "Add to Home Screen"
              </p>
            </div>
          )}
        </motion.div>

        {/* Features */}
        <div className="flex justify-center gap-8">
          {[
            { icon: <Zap className="w-5 h-5 text-primary" />, label: 'Fast' },
            { icon: <WifiOff className="w-5 h-5 text-primary" />, label: 'Offline' },
            { icon: <Bell className="w-5 h-5 text-primary" />, label: 'Notifications' },
          ].map((f) => (
            <div key={f.label} className="flex flex-col items-center gap-1">
              {f.icon}
              <span className="text-xs text-muted-foreground font-medium">{f.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
