import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { User, LogOut, Edit3, CheckCircle, Loader2, GraduationCap, TrendingUp, Bookmark } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';

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
        }
      />
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {/* Avatar & Name */}
        <div className="bg-card rounded-3xl p-6 card-shadow border border-border text-center">
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground">{profile?.full_name || 'Student'}</h2>
          <p className="text-muted-foreground text-sm">{user?.email}</p>
          {profile?.district && (
            <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
              📍 {profile.district}, {profile.state}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-edu-blue-light rounded-2xl p-3 text-center">
            <GraduationCap className="w-6 h-6 text-edu-blue mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{marks.length}</p>
            <p className="text-xs text-edu-blue">Tests</p>
          </div>
          <div className="bg-edu-green-light rounded-2xl p-3 text-center">
            <TrendingUp className="w-6 h-6 text-edu-green mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{latestMark ? `${latestMark.percentage?.toFixed(0)}%` : '—'}</p>
            <p className="text-xs text-edu-green">Latest</p>
          </div>
          <div className="bg-edu-purple-light rounded-2xl p-3 text-center">
            <Bookmark className="w-6 h-6 text-edu-purple mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{savedItems.length}</p>
            <p className="text-xs text-edu-purple">Saved</p>
          </div>
        </div>

        {/* Edit Profile */}
        <div className="bg-card rounded-2xl p-4 card-shadow border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Profile Info</h3>
            <Button variant="ghost" size="sm" onClick={() => setEditing(!editing)} className="rounded-xl gap-1 text-primary">
              <Edit3 className="w-3.5 h-3.5" /> {editing ? 'Cancel' : 'Edit'}
            </Button>
          </div>

          {editing ? (
            <div className="space-y-3">
              <div>
                <Label className="text-sm">Full Name</Label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1.5 rounded-xl" />
              </div>
              <div>
                <Label className="text-sm">Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5 rounded-xl" type="tel" />
              </div>
              <div>
                <Label className="text-sm">State</Label>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>{INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm">District</Label>
                <Select value={district} onValueChange={setDistrict}>
                  <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>{TN_DISTRICTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <Button onClick={handleSave} disabled={saving} className="w-full rounded-xl gradient-primary border-0">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle className="w-4 h-4 mr-2" />Save Changes</>}
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {[
                { label: 'Full Name', value: profile?.full_name || '—' },
                { label: 'Phone', value: profile?.phone || '—' },
                { label: 'State', value: profile?.state || '—' },
                { label: 'District', value: profile?.district || '—' },
                { label: 'Education Type', value: profile?.education_type || '—' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm py-1.5 border-b border-border last:border-0">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Marks History */}
        {marks.length > 0 && (
          <div className="bg-card rounded-2xl p-4 card-shadow border border-border">
            <h3 className="font-semibold text-foreground mb-3">📊 Marks History</h3>
            <div className="space-y-2">
              {marks.slice(0, 5).map((m) => (
                <div key={m.id} className="flex items-center justify-between p-2.5 bg-muted/50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-foreground capitalize">{m.student_type} • {m.class || m.course || m.level || '—'}</p>
                    <p className="text-xs text-muted-foreground">{m.classification}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{m.percentage?.toFixed(1)}%</p>
                    {m.cgpa && <p className="text-xs text-muted-foreground">CGPA: {m.cgpa.toFixed(2)}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          variant="outline"
          onClick={handleSignOut}
          className="w-full rounded-xl border-destructive text-destructive gap-2"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
