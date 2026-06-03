'use client';

import { useEffect, useState, useRef } from 'react';
import { navLinks } from '@/data/navigation';

/**
 * Observes all navigation-target sections and returns the ID of the
 * section currently most visible in the viewport.
 *
 * Uses IntersectionObserver with a 0.3 threshold so the section is
 * considered "active" when at least 30% is visible.
 */
export function useScrollSpy(): string {
  const [activeSection, setActiveSection] = useState<string>(navLinks[0]?.sectionId ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Map to track the intersection ratio of each observed section
    const ratioMap = new Map<string, number>();

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        ratioMap.set(entry.target.id, entry.intersectionRatio);
      });

      // Find the section with the highest intersection ratio
      let maxRatio = 0;
      let maxId = activeSection;

      ratioMap.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          maxId = id;
        }
      });

      if (maxRatio > 0) {
        setActiveSection(maxId);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null, // viewport
      rootMargin: '0px 0px -10% 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1.0],
    });

    // Observe every section referenced in navLinks
    const sectionIds = navLinks.map((link) => link.sectionId);
    const elements: Element[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observerRef.current?.observe(el);
        elements.push(el);
      }
    });

    return () => {
      elements.forEach((el) => observerRef.current?.unobserve(el));
      observerRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activeSection;
}

export default useScrollSpy;
