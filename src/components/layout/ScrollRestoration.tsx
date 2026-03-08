import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const scrollPositions = new Map<string, number>();

export function ScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const prevKey = useRef(location.key);

  useEffect(() => {
    // Save scroll position before leaving
    return () => {
      scrollPositions.set(prevKey.current, window.scrollY);
    };
  }, [location.key]);

  useEffect(() => {
    prevKey.current = location.key;

    if (navigationType === 'POP') {
      // Back/forward: restore saved position
      const saved = scrollPositions.get(location.key);
      requestAnimationFrame(() => {
        window.scrollTo(0, saved ?? 0);
      });
    } else {
      // Push/Replace: scroll to top
      window.scrollTo(0, 0);
    }
  }, [location.key, navigationType]);

  return null;
}
