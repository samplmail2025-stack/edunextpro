import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, Mail, Lock, Eye, EyeOff, Loader2, BookOpen, Star, Zap, Trophy } from 'lucide-react';

type Mode = 'login' | 'signup';

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName }, emailRedirectTo: window.location.origin }
        });
        if (error) throw error;
        toast({ title: '🎉 Account created!', description: 'Please check your email to verify your account.' });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/student-type');
      }
    } catch (err: unknown) {
      toast({ title: 'Error', description: (err as Error).message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)'}}>
      
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-30 animate-pulse" style={{background: 'radial-gradient(circle, #ff9a9e, #fecfef)'}} />
        <div className="absolute top-1/3 -right-16 w-48 h-48 rounded-full opacity-30 animate-pulse" style={{background: 'radial-gradient(circle, #a18cd1, #fbc2eb)', animationDelay: '1s'}} />
        <div className="absolute -bottom-16 left-1/4 w-56 h-56 rounded-full opacity-25 animate-pulse" style={{background: 'radial-gradient(circle, #84fab0, #8fd3f4)', animationDelay: '2s'}} />
        <div className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full opacity-20 animate-pulse" style={{background: 'radial-gradient(circle, #ffecd2, #fcb69f)', animationDelay: '0.5s'}} />
        {/* Floating icons */}
        <div className="absolute top-16 right-8 opacity-20 animate-bounce" style={{animationDelay: '0.3s'}}>
          <Star className="w-8 h-8 text-white" fill="white" />
        </div>
        <div className="absolute top-32 left-6 opacity-20 animate-bounce" style={{animationDelay: '1.2s'}}>
          <Zap className="w-6 h-6 text-yellow-200" fill="currentColor" />
        </div>
        <div className="absolute bottom-40 right-6 opacity-20 animate-bounce" style={{animationDelay: '0.8s'}}>
          <Trophy className="w-7 h-7 text-yellow-200" />
        </div>
      </div>

      {/* Header */}
      <div className="pt-14 pb-8 px-6 text-center relative z-10">
        <div className="w-20 h-20 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-2xl" style={{background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(20px)', border: '2px solid rgba(255,255,255,0.4)'}}>
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-black text-white drop-shadow-lg">EduNext</h1>
        <p className="text-white/85 text-sm mt-1 font-medium">Your Future Navigator ✨</p>
        
        {/* Stats row */}
        <div className="flex justify-center gap-4 mt-4">
          {[['50+', 'Courses'], ['100+', 'Colleges'], ['20+', 'Jobs']].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="text-white font-black text-lg leading-none">{num}</div>
              <div className="text-white/70 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Card Form */}
      <div className="flex-1 px-5 pb-8 relative z-10">
        <div 
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(30px)',
            border: '1.5px solid rgba(255,255,255,0.4)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset, 0 1px 0 rgba(255,255,255,0.5) inset',
            transform: 'perspective(1000px) rotateX(1deg)',
          }}
        >
          {/* Tab switcher */}
          <div className="flex p-1.5 mx-4 mt-4 rounded-2xl" style={{background: 'rgba(0,0,0,0.2)'}}>
            {(['login', 'signup'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
                style={mode === m ? {
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(102,126,234,0.5)',
                } : { color: 'rgba(255,255,255,0.7)' }}
              >
                {m === 'login' ? '🚀 Login' : '✨ Sign Up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {mode === 'signup' && (
              <div>
                <Label className="text-white/90 text-sm font-semibold">Full Name</Label>
                <div className="relative mt-1.5">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input
                    placeholder="Your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10 rounded-xl border-0 text-white placeholder:text-white/40 h-12"
                    style={{background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)'}}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <Label className="text-white/90 text-sm font-semibold">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 rounded-xl border-0 text-white placeholder:text-white/40 h-12"
                  style={{background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)'}}
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-white/90 text-sm font-semibold">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 rounded-xl border-0 text-white placeholder:text-white/40 h-12"
                  style={{background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)'}}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl h-13 text-base font-black border-0 mt-2 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
                boxShadow: '0 8px 25px rgba(240,147,251,0.5), 0 4px 0 rgba(0,0,0,0.2)',
                height: '52px',
              }}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : mode === 'login' ? '🚀 Login to EduNext' : '🎉 Create My Account'}
            </Button>
          </form>

          {/* Bottom decoration */}
          <div className="px-5 pb-5 text-center">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-px" style={{background: 'rgba(255,255,255,0.2)'}} />
              <span className="text-white/50 text-xs">EduNext 2024</span>
              <div className="flex-1 h-px" style={{background: 'rgba(255,255,255,0.2)'}} />
            </div>
            <p className="text-white/60 text-xs italic">
              "Know Your Marks. Choose Your Path. Build Your Future."
            </p>
          </div>
        </div>

        {/* Feature badges */}
        <div className="flex justify-center gap-3 mt-5">
          {['🔒 Secure', '⚡ Fast', '📱 PWA'].map((badge) => (
            <div
              key={badge}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
              style={{background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)'}}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
