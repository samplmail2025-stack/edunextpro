import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export interface SavedItem {
  id: string;
  user_id: string;
  item_type: 'college' | 'job' | 'course';
  item_data: Record<string, unknown>;
  created_at: string;
}

export function useBookmarks() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSavedItems = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from('saved_items')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setSavedItems((data as unknown as SavedItem[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchSavedItems();
  }, [user]);

  const saveItem = async (itemType: 'college' | 'job' | 'course', itemData: Record<string, unknown>) => {
    if (!user) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from('saved_items') as any).insert({
      user_id: user.id,
      item_type: itemType,
      item_data: itemData,
    });
    if (!error) {
      await fetchSavedItems();
      toast({ title: '✅ Saved!', description: 'Added to your bookmarks.' });
    }
  };

  const removeItem = async (id: string) => {
    const { error } = await supabase.from('saved_items').delete().eq('id', id);
    if (!error) {
      await fetchSavedItems();
      toast({ title: 'Removed', description: 'Removed from bookmarks.' });
    }
  };

  const isItemSaved = (itemId: string) => {
    return savedItems.some((s) => (s.item_data as Record<string, unknown>)?.id === itemId);
  };

  return { savedItems, loading, saveItem, removeItem, isItemSaved, fetchSavedItems };
}
