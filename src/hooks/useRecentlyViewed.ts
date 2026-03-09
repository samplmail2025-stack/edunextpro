import { useState, useEffect, useCallback } from 'react';

export interface RecentItem {
  id: string;
  type: 'college' | 'course';
  name: string;
  subtitle: string; // district for college, category for course
  timestamp: number;
}

const STORAGE_KEY = 'edunext-recently-viewed';
const MAX_ITEMS = 10;

function getStored(): RecentItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(item: Omit<RecentItem, 'timestamp'>) {
  const items = getStored().filter(i => !(i.id === item.id && i.type === item.type));
  items.unshift({ ...item, timestamp: Date.now() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
  window.dispatchEvent(new Event('recently-viewed-updated'));
}

export function useRecentlyViewed() {
  const [items, setItems] = useState<RecentItem[]>(getStored);

  useEffect(() => {
    const handler = () => setItems(getStored());
    window.addEventListener('recently-viewed-updated', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('recently-viewed-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  return items;
}
