import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { useAuthStep, setAuthStep as setGlobalAuthStep } from '@/hooks/useAuthStep';
import { Mail, Lock, Eye, EyeOff, Loader2, BookOpen, CheckCircle2, ArrowLeft } from 'lucide-react';
import logoImg from '@/assets/edunext-logo.png';

type Step = 'form' | 'otp' | 'success';
type Mode = 'login' | 'signup';

export default function Auth() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>('login');
  const [step, setStepLocal] = useState<Step>('form');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [verifying, setVerifying] = useState(false);

  const setStep = (s: Step) => {
    setStepLocal(s);
    setGlobalAuthStep(s);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName }, emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        setStep('otp');
        toast({ title: '📧 Code sent!', description: 'Check your email for the verification code.' });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: unknown) {
      toast({ title: 'Error', description: (err as Error).message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otpValue.length !== 6) return;
    setVerifying(true);
    try {
      const { error } = await supabase.auth.verifyOtp({ email, token: otpValue, type: 'signup' });
      if (error) throw error;
      setStep('success');
    } catch (err: unknown) {
      toast({ title: 'Invalid code', description: (err as Error).message, variant: 'destructive' });
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    if (otpValue.length === 6) handleVerifyOtp();
  }, [otpValue]);

  // Redirect to profile setup after success animation
  useEffect(() => {
    if (step === 'success') {
      const timer = setTimeout(() => {
        setGlobalAuthStep('form'); // reset for next time
        navigate('/onboarding', { replace: true });
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  // Confetti dots for celebration
  const confettiColors = ['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-30 blur-3xl"
          style={{ background: 'hsl(var(--primary))' }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ background: 'hsl(var(--accent))' }}
          animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="gradient-primary pt-14 pb-14 px-6 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-8 w-24 h-24 rounded-full bg-white" />
          <div className="absolute bottom-2 right-8 w-20 h-20 rounded-full bg-white" />
          <div className="absolute top-10 right-16 w-10 h-10 rounded-full bg-white" />
        </div>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', bounce: 0.4 }}
          className="relative"
        >
          <div className="w-20 h-20 rounded-2xl bg-white/95 flex items-center justify-center mx-auto mb-3 overflow-hidden"
            style={{ boxShadow: '0 15px 40px rgba(0,0,0,0.25)' }}>
            <img src={logoImg} alt="EduNext" className="w-16 h-16 object-contain" />
          </div>
          <h1 className="text-2xl font-black text-white italic tracking-wide">EduNext</h1>
          <p className="text-white/80 text-sm mt-0.5">Your Future Navigator</p>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 px-5 -mt-6 relative z-10">
        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-3xl border border-border p-6"
              style={{ boxShadow: '0 20px 60px -15px rgba(0,0,0,0.15), 0 8px 20px -8px rgba(0,0,0,0.1)' }}
            >
              {/* Tabs */}
              <div className="flex gap-1 p-1 bg-muted rounded-2xl mb-6">
                {(['login', 'signup'] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`relative flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                      mode === m ? 'text-white' : 'text-muted-foreground'
                    }`}
                  >
                    {mode === m && (
                      <motion.div
                        layoutId="authTab"
                        className="absolute inset-0 gradient-primary rounded-xl"
                        style={{ boxShadow: '0 4px 15px rgba(99,102,241,0.4)' }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{m === 'login' ? 'Login' : 'Sign Up'}</span>
                  </button>
                ))}
              </div>

              {/* Form */}
              <AnimatePresence mode="wait">
                <motion.form
                  key={mode}
                  initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: mode === 'login' ? 20 : -20 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {mode === 'signup' && (
                    <div>
                      <Label className="text-sm font-semibold">Full Name</Label>
                      <div className="relative mt-1.5">
                        <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)}
                          className="pl-10 rounded-xl h-12 border-2 focus:border-primary transition-colors" required />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="text-sm font-semibold">Email</Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 rounded-xl h-12 border-2 focus:border-primary transition-colors" required />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold">Password</Label>
                    <div className="relative mt-1.5">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type={showPassword ? 'text' : 'password'} placeholder="Min 6 characters" value={password}
                        onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 rounded-xl h-12 border-2 focus:border-primary transition-colors"
                        required minLength={6} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" disabled={loading}
                    className="w-full rounded-xl gradient-primary border-0 h-12 text-base font-bold shadow-lg"
                    style={{ boxShadow: '0 8px 25px -5px rgba(99,102,241,0.4)' }}>
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : mode === 'login' ? '🚀 Login' : '🎉 Create Account'}
                  </Button>
                </motion.form>
              </AnimatePresence>
            </motion.div>
          )}

          {step === 'otp' && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-3xl border border-border p-6 text-center"
              style={{ boxShadow: '0 20px 60px -15px rgba(0,0,0,0.15)' }}
            >
              <button
                onClick={() => { setStep('form'); setOtpValue(''); }}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.4 }}
                className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4"
                style={{ boxShadow: '0 10px 30px rgba(99,102,241,0.4)' }}
              >
                <Mail className="w-8 h-8 text-white" />
              </motion.div>

              <h2 className="text-xl font-bold text-foreground mb-1">Verify Your Email</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Enter the 6-digit code sent to<br />
                <span className="font-semibold text-foreground">{email}</span>
              </p>

              <div className="flex justify-center mb-6">
                <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="w-12 h-14 text-lg font-bold rounded-xl border-2 border-border"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                onClick={handleVerifyOtp}
                disabled={verifying || otpValue.length !== 6}
                className="w-full rounded-xl gradient-primary border-0 h-12 text-base font-bold"
                style={{ boxShadow: '0 8px 25px -5px rgba(99,102,241,0.4)' }}
              >
                {verifying ? <Loader2 className="w-5 h-5 animate-spin" /> : '✅ Verify Code'}
              </Button>

              <p className="text-xs text-muted-foreground mt-4">
                Didn't receive the code? Check your spam folder.
              </p>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
              className="bg-card rounded-3xl border border-border p-8 text-center relative overflow-hidden"
              style={{ boxShadow: '0 20px 60px -15px rgba(0,0,0,0.15)' }}
            >
              {/* Confetti */}
              {confettiColors.map((color, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{ background: color }}
                  initial={{
                    x: '50%',
                    y: '50%',
                    scale: 0,
                  }}
                  animate={{
                    x: `${20 + (i * 12)}%`,
                    y: `${10 + ((i % 3) * 30)}%`,
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeOut' }}
                />
              ))}

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-black text-foreground mb-2"
              >
                🎉 Account Created!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-muted-foreground"
              >
                OTP Verified Successfully.<br />
                Redirecting to profile setup...
              </motion.p>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 1.5 }}
                className="h-1 gradient-primary rounded-full mt-6"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-muted-foreground mt-5 pb-6"
        >
          "Know Your Marks. Choose Your Path. Build Your Future."
        </motion.p>
      </div>
    </div>
  );
}
