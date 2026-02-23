import { useState, useEffect, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  state: string | null;
  district: string | null;
  education_type: string | null;
  avatar_url: string | null;
  created_at: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const loadingDone = useRef(false);

  const finishLoading = () => {
    if (!loadingDone.current) {
      loadingDone.current = true;
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(finishLoading, 5000);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        setProfileLoading(true);
        setTimeout(async () => {
          await fetchProfile(session.user.id);
          setProfileLoading(false);
          finishLoading();
        }, 0);
      } else {
        setProfile(null);
        setProfileLoading(false);
        finishLoading();
      }
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    setProfile(data);
    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ user_id: user.id, ...updates }, { onConflict: 'user_id' })
      .select()
      .single();
    if (!error && data) setProfile(data);
    return { data, error };
  };

  const isProfileComplete = !!(profile?.full_name && profile?.district && profile?.education_type);

  return { user, session, profile, loading, profileLoading, signOut, updateProfile, isProfileComplete, fetchProfile };
}
