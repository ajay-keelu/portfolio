'use client';

import { useEffect, useState } from 'react';

/**
 * SSR-safe hook that evaluates a CSS media query and reactively
 * returns whether the current viewport matches.
 *
 * Returns `false` during SSR / initial hydration to prevent
 * mismatch between server and client renders.
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const isDesktop = useMediaQuery('(min-width: 1024px)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Guard against SSR — window.matchMedia is browser-only
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQueryList.matches);

    // Modern listener (addEventListener) with fallback for older Safari
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handler);
    } else {
      // Fallback for Safari < 14
      mediaQueryList.addListener(handler);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handler);
      } else {
        mediaQueryList.removeListener(handler);
      }
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
