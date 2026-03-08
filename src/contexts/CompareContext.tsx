import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { College } from '@/data/colleges';

interface CompareContextType {
  selected: College[];
  toggleCollege: (college: College) => void;
  isSelected: (id: string) => boolean;
  clearAll: () => void;
  canAdd: boolean;
}

const CompareContext = createContext<CompareContextType>({
  selected: [],
  toggleCollege: () => {},
  isSelected: () => false,
  clearAll: () => {},
  canAdd: true,
});

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<College[]>([]);

  const toggleCollege = useCallback((college: College) => {
    setSelected(prev => {
      const exists = prev.find(c => c.id === college.id);
      if (exists) return prev.filter(c => c.id !== college.id);
      if (prev.length >= 3) return prev;
      return [...prev, college];
    });
  }, []);

  const isSelected = useCallback((id: string) => {
    return selected.some(c => c.id === id);
  }, [selected]);

  const clearAll = useCallback(() => setSelected([]), []);

  return (
    <CompareContext.Provider value={{ selected, toggleCollege, isSelected, clearAll, canAdd: selected.length < 3 }}>
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);
