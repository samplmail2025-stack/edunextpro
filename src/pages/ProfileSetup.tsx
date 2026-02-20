import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AppHeader } from '@/components/layout/AppHeader';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { TN_DISTRICTS, INDIAN_STATES } from '@/data/districts';
import { useToast } from '@/hooks/use-toast';
import { User, Loader2 } from 'lucide-react';

const EDUCATION_TYPES = ['School Student', 'College Student', 'Working Professional', 'Other'];

export default function ProfileSetup() {
  const { user, profile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [state, setState] = useState(profile?.state || 'Tamil Nadu');
  const [district, setDistrict] = useState(profile?.district || '');
  const [educationType, setEducationType] = useState(profile?.education_type || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!fullName || !district) {
      toast({ title: 'Required', description: 'Please fill name and district.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const { error } = await updateProfile({ full_name: fullName, phone, state, district, education_type: educationType });
    setLoading(false);
    if (error) {
      toast({ title: 'Error', description: 'Failed to save profile.', variant: 'destructive' });
    } else {
      toast({ title: '✅ Profile saved!', description: 'Welcome to EduNext!' });
      navigate('/student-type');
    }
  };

  return (
    <PageWrapper hasBottomNav={false}>
      <AppHeader title="Setup Profile" subtitle="Tell us about yourself" gradient />
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        <div className="flex justify-center py-4">
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 space-y-4 card-shadow border border-border">
          <div>
            <Label className="text-sm font-medium">Full Name *</Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" className="mt-1.5 rounded-xl" />
          </div>
          <div>
            <Label className="text-sm font-medium">Phone Number</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className="mt-1.5 rounded-xl" type="tel" />
          </div>
          <div>
            <Label className="text-sm font-medium">State</Label>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger className="mt-1.5 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium">District *</Label>
            <Select value={district} onValueChange={setDistrict}>
              <SelectTrigger className="mt-1.5 rounded-xl">
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                {TN_DISTRICTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium">Education Type</Label>
            <Select value={educationType} onValueChange={setEducationType}>
              <SelectTrigger className="mt-1.5 rounded-xl">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {EDUCATION_TYPES.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={loading}
          className="w-full h-12 rounded-xl gradient-primary border-0 text-base font-semibold"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : '🚀 Save & Continue'}
        </Button>
      </div>
    </PageWrapper>
  );
}
