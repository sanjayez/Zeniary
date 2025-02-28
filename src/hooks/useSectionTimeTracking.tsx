"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";

interface SectionTimeTrackingOptions {
  sectionId: string;
  threshold?: number;
  rootMargin?: string;
}

/**
 * Hook to track time spent in a section using Intersection Observer API
 *
 * @param options Configuration options for section time tracking
 * @returns A ref to attach to the section element
 */
export const useSectionTimeTracking = ({
  sectionId,
  threshold = 0.5,
  rootMargin = "0px",
}: SectionTimeTrackingOptions) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const entryTimeRef = useRef<number | null>(null);
  const totalTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const currentSection = sectionRef.current;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        // Section entered viewport
        entryTimeRef.current = Date.now();
      } else if (entryTimeRef.current !== null) {
        // Section exited viewport
        const timeSpent = Date.now() - entryTimeRef.current;
        totalTimeRef.current += timeSpent;

        // Track time spent in section
        posthog.capture("Section Time", {
          sectionId,
          timeSpent, // in milliseconds
          totalTimeSpent: totalTimeRef.current, // in milliseconds
        });

        entryTimeRef.current = null;
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(currentSection);

    // Cleanup function
    return () => {
      observer.unobserve(currentSection);

      // If the component unmounts while the section is still in view,
      // capture the final time spent
      if (entryTimeRef.current !== null) {
        const timeSpent = Date.now() - entryTimeRef.current;
        totalTimeRef.current += timeSpent;

        posthog.capture("Section Time", {
          sectionId,
          timeSpent, // in milliseconds
          totalTimeSpent: totalTimeRef.current, // in milliseconds
          isFinal: true,
        });
      }
    };
  }, [sectionId, threshold, rootMargin]);

  return sectionRef;
};
