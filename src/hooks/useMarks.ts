import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface MarksEntry {
  id?: string;
  user_id?: string;
  student_type: 'school' | 'college';
  class?: string;
  stream?: string;
  level?: string;
  course?: string;
  subjects?: Record<string, number>;
  cgpa?: number;
  percentage?: number;
  grade?: string;
  classification?: string;
  semester_data?: unknown;
  created_at?: string;
}

export function useMarks() {
  const { user } = useAuth();
  const [marks, setMarks] = useState<MarksEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMarks = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from('marks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setMarks((data as unknown as MarksEntry[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMarks();
  }, [user]);

  const saveMarks = async (entry: MarksEntry) => {
    if (!user) return { error: 'Not authenticated' };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = {
      student_type: entry.student_type,
      user_id: user.id,
      class: entry.class ?? null,
      stream: entry.stream ?? null,
      level: entry.level ?? null,
      course: entry.course ?? null,
      subjects: entry.subjects ?? null,
      cgpa: entry.cgpa ?? null,
      percentage: entry.percentage ?? null,
      grade: entry.grade ?? null,
      classification: entry.classification ?? null,
      semester_data: entry.semester_data ?? null,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from('marks') as any)
      .insert(payload)
      .select()
      .single();
    if (!error) await fetchMarks();
    return { data, error };
  };

  const deleteMarks = async (id: string) => {
    const { error } = await supabase.from('marks').delete().eq('id', id);
    if (!error) await fetchMarks();
    return { error };
  };

  const latestMarks = marks[0] || null;

  return { marks, latestMarks, loading, saveMarks, deleteMarks, fetchMarks };
}
