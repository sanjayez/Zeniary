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
  const [reachedBottom, setReachedBottom] = useState<boolean>(false);

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
      return Math.min(Math.round((scrollDistance / docHeight) * 100), 100);
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

              // If we've reached 100%, track the "Reached Bottom" event
              if (threshold === 100 && !reachedBottom) {
                posthog.capture("Reached Bottom", {
                  page: pageIdentifier,
                  url: window.location.href,
                });
                setReachedBottom(true);
              }
            }
          });
        }

        throttleTimeout = null;
      }, throttleWait);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track final scroll depth when user leaves the page
    const handleBeforeUnload = () => {
      const finalScrollDepth = calculateScrollDepth();
      posthog.capture("Final Scroll Depth", {
        depth_percentage: finalScrollDepth,
        page: pageIdentifier,
        url: window.location.href,
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
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
    reachedBottom,
  ]);

  return { maxScrollDepth, trackedThresholds, reachedBottom };
};
