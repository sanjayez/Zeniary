import { useEffect, useState } from "react";
import posthog from "posthog-js";

interface ScrollDepthOptions {
  thresholds?: number[]; // Percentage thresholds to track (e.g. [25, 50, 75, 100])
  throttleWait?: number; // Time in ms to throttle scroll events
  pageIdentifier?: string; // Optional identifier for the page being tracked
}

/**
 * Hook to track scroll depth using PostHog
 */
export const useScrollDepthTracking = ({
  thresholds = [25, 50, 75, 100],
  throttleWait = 500,
  pageIdentifier = window.location.pathname,
}: ScrollDepthOptions = {}) => {
  const [maxScrollDepth, setMaxScrollDepth] = useState<number>(0);
  const [trackedThresholds, setTrackedThresholds] = useState<number[]>([]);

  useEffect(() => {
    let throttleTimeout: NodeJS.Timeout | null = null;

    const calculateScrollDepth = () => {
      // Calculate total document height
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );

      // Calculate viewport height
      const viewportHeight = window.innerHeight;

      // Calculate how far the user has scrolled
      const scrollY = window.scrollY;
      const scrollDistance = scrollY + viewportHeight;

      // Calculate scroll percentage (0-100)
      const scrollPercentage = Math.min(
        Math.round((scrollDistance / docHeight) * 100),
        100
      );

      return scrollPercentage;
    };

    const handleScroll = () => {
      // Skip if we're throttling
      if (throttleTimeout) return;

      throttleTimeout = setTimeout(() => {
        const currentScrollDepth = calculateScrollDepth();

        // Only process if we've scrolled further than before
        if (currentScrollDepth > maxScrollDepth) {
          setMaxScrollDepth(currentScrollDepth);

          // Check which thresholds have been passed
          thresholds.forEach((threshold) => {
            if (
              currentScrollDepth >= threshold &&
              !trackedThresholds.includes(threshold)
            ) {
              // Track the event in PostHog
              posthog.capture("scroll_depth_milestone", {
                depth_percentage: threshold,
                page: pageIdentifier,
                url: window.location.href,
              });

              // Add to tracked thresholds
              setTrackedThresholds((prev) => [...prev, threshold]);
            }
          });
        }

        throttleTimeout = null;
      }, throttleWait);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, [
    maxScrollDepth,
    trackedThresholds,
    thresholds,
    throttleWait,
    pageIdentifier,
  ]);

  return { maxScrollDepth, trackedThresholds };
};
