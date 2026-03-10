import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TN_DISTRICTS, INDIAN_STATES } from '@/data/districts';
import { User, Calendar, Phone, MapPin, GraduationCap, ChevronRight, ChevronLeft, Loader2, Sparkles } from 'lucide-react';
import logoImg from '@/assets/edunext-logo.png';

const EDUCATION_TYPES = ['School Student', 'College Student', 'Working Professional', 'Other'];

interface StepConfig {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  emoji: string;
}

const STEPS: StepConfig[] = [
  { title: 'What\'s your name?', subtitle: 'Let\'s get to know you', icon: <User className="w-6 h-6" />, emoji: '👋' },
  { title: 'Your Birthday', subtitle: 'We\'ll calculate your age', icon: <Calendar className="w-6 h-6" />, emoji: '🎂' },
  { title: 'Phone Number', subtitle: 'Optional but helpful', icon: <Phone className="w-6 h-6" />, emoji: '📱' },
  { title: 'Where are you from?', subtitle: 'Select your district', icon: <MapPin className="w-6 h-6" />, emoji: '📍' },
  { title: 'Education Type', subtitle: 'What describes you best?', icon: <GraduationCap className="w-6 h-6" />, emoji: '🎓' },
];

export default function Onboarding() {
  const { user, updateProfile, fetchProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('Tamil Nadu');
  const [district, setDistrict] = useState('');
  const [educationType, setEducationType] = useState('');
  const [saving, setSaving] = useState(false);

  // If profile is already complete, skip onboarding
  const { isProfileComplete } = useAuth();
  useEffect(() => {
    if (isProfileComplete) {
      navigate('/student-type', { replace: true });
    }
  }, [isProfileComplete, navigate]);

  const canNext = () => {
    if (step === 0) return fullName.trim().length >= 2;
    if (step === 1) return !!dob;
    if (step === 2) return true; // phone is optional
    if (step === 3) return !!district;
    if (step === 4) return !!educationType;
    return true;
  };

  const handleFinish = async () => {
    setSaving(true);
    const { data, error } = await updateProfile({
      full_name: fullName,
      dob: dob || null,
      phone: phone || null,
      state,
      district,
      education_type: educationType,
    } as any);
    setSaving(false);
    if (error) {
      toast({ title: 'Error', description: 'Failed to save profile.', variant: 'destructive' });
    } else {
      // Re-fetch profile to ensure isProfileComplete is true before navigating
      if (user) await fetchProfile(user.id);
      toast({ title: '🎉 Welcome to EduNext!', description: 'Your profile has been set up.' });
      navigate('/student-type', { replace: true });
    }
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      handleFinish();
    }
  };

  const currentStep = STEPS[step];

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-60 h-60 rounded-full opacity-20 blur-3xl"
          style={{ background: 'hsl(var(--primary))' }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full opacity-15 blur-3xl"
          style={{ background: 'hsl(var(--accent))' }}
          animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Logo */}
      <div className="pt-10 pb-4 text-center relative z-10">
        <motion.img
          src={logoImg}
          alt="EduNext"
          className="w-16 h-16 mx-auto mb-2 object-contain"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.4 }}
        />
        <p className="text-xs text-muted-foreground">Step {step + 1} of {STEPS.length}</p>
      </div>

      {/* Progress bar */}
      <div className="px-8 mb-6 relative z-10">
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-primary"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 px-5 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50, rotateY: 5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -50, rotateY: -5 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-card rounded-3xl border border-border p-6"
            style={{ boxShadow: '0 20px 60px -15px rgba(0,0,0,0.12)' }}
          >
            {/* Step header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-white flex-shrink-0">
                {currentStep.icon}
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">{currentStep.emoji} {currentStep.title}</h2>
                <p className="text-sm text-muted-foreground">{currentStep.subtitle}</p>
              </div>
            </div>

            {/* Step content */}
            {step === 0 && (
              <div>
                <Label className="text-sm font-semibold">Full Name</Label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-2 rounded-xl h-12 border-2 focus:border-primary"
                  autoFocus
                />
              </div>
            )}

            {step === 1 && (
              <div>
                <Label className="text-sm font-semibold">Date of Birth</Label>
                <Input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="mt-2 rounded-xl h-12 border-2 focus:border-primary"
                  max={new Date().toISOString().split('T')[0]}
                />
                {dob && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-primary mt-2 font-medium"
                  >
                    🎂 Age: {Math.floor((Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000))} years
                  </motion.p>
                )}
              </div>
            )}

            {step === 2 && (
              <div>
                <Label className="text-sm font-semibold">Phone Number (Optional)</Label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="mt-2 rounded-xl h-12 border-2 focus:border-primary"
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold">State</Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger className="mt-2 rounded-xl h-12"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-semibold">District *</Label>
                  <Select value={district} onValueChange={setDistrict}>
                    <SelectTrigger className="mt-2 rounded-xl h-12"><SelectValue placeholder="Select district" /></SelectTrigger>
                    <SelectContent>
                      {TN_DISTRICTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="grid grid-cols-2 gap-3">
                {EDUCATION_TYPES.map((type) => (
                  <motion.button
                    key={type}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEducationType(type)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      educationType === type
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card text-foreground hover:border-primary/30'
                    }`}
                  >
                    <span className="text-2xl block mb-1">
                      {type === 'School Student' ? '🏫' : type === 'College Student' ? '🎓' : type === 'Working Professional' ? '💼' : '🌟'}
                    </span>
                    <span className="text-sm font-semibold">{type}</span>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="px-5 py-6 flex gap-3 relative z-10">
        {step > 0 && (
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            className="rounded-xl h-12 px-5"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!canNext() || saving}
          className="flex-1 h-12 rounded-xl gradient-primary border-0 font-bold text-base"
          style={{ boxShadow: '0 8px 25px -5px rgba(99,102,241,0.4)' }}
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : step === STEPS.length - 1 ? (
            <>
              <Sparkles className="w-4 h-4 mr-2" /> Finish Setup
            </>
          ) : (
            <>
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
