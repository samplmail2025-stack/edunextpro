import { createContext, useContext, useState, ReactNode, useCallback, useRef } from 'react';

type Direction = 'left' | 'right' | 'none';

interface NavigationDirectionContextType {
  direction: Direction;
  setDirection: (dir: Direction) => void;
}

const NavigationDirectionContext = createContext<NavigationDirectionContextType>({
  direction: 'none',
  setDirection: () => {},
});

// Route order for determining slide direction
const ROUTE_ORDER = [
  '/student-type',
  '/school-marks',
  '/college-marks',
  '/results',
  '/recommendations',
  '/college-finder',
  '/jobs',
  '/bookmarks',
  '/profile',
];

function getRouteIndex(path: string): number {
  const idx = ROUTE_ORDER.indexOf(path);
  return idx >= 0 ? idx : -1;
}

export function NavigationDirectionProvider({ children }: { children: ReactNode }) {
  const [direction, setDirection] = useState<Direction>('none');

  return (
    <NavigationDirectionContext.Provider value={{ direction, setDirection }}>
      {children}
    </NavigationDirectionContext.Provider>
  );
}

export function useNavigationDirection() {
  return useContext(NavigationDirectionContext);
}

export { getRouteIndex };
