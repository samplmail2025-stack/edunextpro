import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BottomNav } from '@/components/layout/BottomNav';
import { AppHeader } from '@/components/layout/AppHeader';
import { useAuth } from '@/hooks/useAuth';
import { useMarks } from '@/hooks/useMarks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TN_DISTRICTS, INDIAN_STATES } from '@/data/districts';
import { useToast } from '@/hooks/use-toast';
import {
  User, LogOut, Edit3, CheckCircle, Loader2, GraduationCap,
  TrendingUp, Bookmark, MapPin, Phone, Mail, Shield, ChevronRight,
  Award, Clock } from
'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } }
};

export default function Profile() {
  const { profile, user, signOut, updateProfile } = useAuth();
  const { marks } = useMarks();
  const { savedItems } = useBookmarks();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [state, setState] = useState(profile?.state || 'Tamil Nadu');
  const [district, setDistrict] = useState(profile?.district || '');

  const handleSave = async () => {
    setSaving(true);
    await updateProfile({ full_name: fullName, phone, state, district });
    setSaving(false);
    setEditing(false);
    toast({ title: '✅ Profile updated!' });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const latestMark = marks[0];
  const initials = (profile?.full_name || 'S').
  split(' ').
  map((n: string) => n[0]).
  join('').
  toUpperCase().
  slice(0, 2);

  return (
    <PageWrapper>
      <AppHeader
        title="My Profile"
        subtitle={user?.email || ''}
        gradient
        rightElement={
        <Button variant="ghost" size="icon" onClick={handleSignOut} className="text-white hover:bg-white/20 rounded-full">
            <LogOut className="w-5 h-5" />
          </Button>
        } />
      

      <motion.div
        className="p-4 space-y-5 max-w-lg mx-auto pb-28"
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        
        {/* Profile Hero Card */}
        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-3xl card-shadow border border-border">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_60%)]" />

          <div className="relative p-6 text-center">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="relative mx-auto mb-4 w-24 h-24">
              
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-[3px] border-white/40 shadow-lg">
                <span className="text-2xl font-extrabold text-white tracking-wider">{initials}</span>
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-400 border-[3px] border-white shadow-md" />
              {/* Sparkle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-1 -right-1">
                
                
              </motion.div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-xl font-extrabold text-white tracking-tight">
              
              {profile?.full_name || 'Student'}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex items-center justify-center gap-1.5 mt-1.5 text-white/70 text-sm">
              
              <Mail className="w-3.5 h-3.5" />
              <span>{user?.email}</span>
            </motion.div>

            {profile?.district &&
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 }}
              className="inline-flex items-center gap-1.5 mt-3 text-xs bg-white/15 backdrop-blur-sm text-white px-4 py-1.5 rounded-full border border-white/20">
              
                <MapPin className="w-3 h-3" />
                {profile.district}, {profile.state}
              </motion.span>
            }
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3">
          {[
          {
            icon: <GraduationCap className="w-5 h-5" />,
            value: marks.length,
            label: 'Tests',
            gradient: 'gradient-blue',
            bgClass: 'bg-edu-blue-light',
            textClass: 'text-edu-blue'
          },
          {
            icon: <TrendingUp className="w-5 h-5" />,
            value: latestMark ? `${latestMark.percentage?.toFixed(0)}%` : '—',
            label: 'Latest',
            gradient: 'gradient-green',
            bgClass: 'bg-edu-green-light',
            textClass: 'text-edu-green'
          },
          {
            icon: <Bookmark className="w-5 h-5" />,
            value: savedItems.length,
            label: 'Saved',
            gradient: 'gradient-purple',
            bgClass: 'bg-edu-purple-light',
            textClass: 'text-edu-purple'
          }].
          map((stat, i) =>
          <motion.div
            key={stat.label}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="bg-card rounded-2xl p-4 card-shadow border border-border text-center relative overflow-hidden group hover:border-primary/20 transition-colors">
            
              <div className={`w-10 h-10 rounded-xl ${stat.gradient} flex items-center justify-center text-white mx-auto mb-2 shadow-md`}>
                {stat.icon}
              </div>
              <p className="text-xl font-extrabold text-foreground">{stat.value}</p>
              <p className={`text-xs font-semibold ${stat.textClass} mt-0.5`}>{stat.label}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Profile Info Card */}
        <motion.div variants={itemVariants} className="bg-card rounded-2xl overflow-hidden card-shadow border border-border">
          {/* Card Header */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-primary/8 via-accent/5 to-transparent border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm">Profile Information</h3>
                <p className="text-[10px] text-muted-foreground">Your personal details</p>
              </div>
            </div>
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditing(!editing)}
                className="rounded-full gap-1.5 text-primary hover:bg-primary/10 h-8 px-3 text-xs font-semibold">
                
                <Edit3 className="w-3.5 h-3.5" /> {editing ? 'Cancel' : 'Edit'}
              </Button>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {editing ?
            <motion.div
              key="editing"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-5 space-y-4">
              
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name</Label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-2 rounded-xl h-11 border-2 border-border focus:border-primary/40" />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2 rounded-xl h-11 border-2 border-border focus:border-primary/40" type="tel" />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">State</Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger className="mt-2 rounded-xl h-11 border-2 border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>{INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">District</Label>
                  <Select value={district} onValueChange={setDistrict}>
                    <SelectTrigger className="mt-2 rounded-xl h-11 border-2 border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>{TN_DISTRICTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                disabled={saving}
                className="w-full h-12 rounded-xl gradient-primary text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60">
                
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle className="w-4 h-4" /> Save Changes</>}
                </motion.button>
              </motion.div> :

            <motion.div
              key="viewing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4">
              
                {[
              { icon: <User className="w-4 h-4" />, label: 'Full Name', value: profile?.full_name || '—' },
              { icon: <Phone className="w-4 h-4" />, label: 'Phone', value: profile?.phone || '—' },
              { icon: <MapPin className="w-4 h-4" />, label: 'State', value: profile?.state || '—' },
              { icon: <MapPin className="w-4 h-4" />, label: 'District', value: profile?.district || '—' },
              { icon: <GraduationCap className="w-4 h-4" />, label: 'Education', value: profile?.education_type || '—' }].
              map(({ icon, label, value }, i) =>
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 py-3.5 border-b border-border/50 last:border-0">
                
                    <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center text-primary shrink-0">
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
                      <p className="text-sm font-semibold text-foreground truncate">{value}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                  </motion.div>
              )}
              </motion.div>
            }
          </AnimatePresence>
        </motion.div>

        {/* Marks History */}
        {marks.length > 0 &&
        <motion.div variants={itemVariants} className="bg-card rounded-2xl overflow-hidden card-shadow border border-border">
            {/* Header */}
            <div className="px-5 py-3.5 bg-gradient-to-r from-accent/8 via-primary/5 to-transparent border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg gradient-blue flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">Marks History</h3>
                  <p className="text-[10px] text-muted-foreground">{marks.length} record{marks.length > 1 ? 's' : ''}</p>
                </div>
              </div>
              <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
                Latest {marks.length > 5 ? 5 : marks.length}
              </span>
            </div>

            <div className="p-4 space-y-2.5">
              {marks.slice(0, 5).map((m, i) =>
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border/40 hover:border-primary/20 transition-colors">
              
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground capitalize truncate">
                      {m.student_type} • {m.class || m.course || m.level || '—'}
                    </p>
                    <p className="text-xs text-muted-foreground">{m.classification}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-base font-extrabold text-foreground">{m.percentage?.toFixed(1)}%</p>
                    {m.cgpa != null && <p className="text-[10px] text-muted-foreground font-medium">CGPA {m.cgpa.toFixed(2)}</p>}
                  </div>
                </motion.div>
            )}
            </div>
          </motion.div>
        }

        {/* Sign Out Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSignOut}
            className="w-full h-12 rounded-2xl border-2 border-destructive/30 text-destructive font-semibold text-sm flex items-center justify-center gap-2.5 bg-destructive/5 hover:bg-destructive/10 hover:border-destructive/50 transition-all">
            
            <LogOut className="w-4 h-4" />
            Sign Out
          </motion.button>
        </motion.div>
      </motion.div>

      <BottomNav />
    </PageWrapper>);

}