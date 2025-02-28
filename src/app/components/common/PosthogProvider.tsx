// app/providers.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense, useState } from "react";
import { usePostHog } from "posthog-js/react";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

// Define the requestIdleCallback type
interface RequestIdleCallbackOptions {
  timeout: number;
}

type RequestIdleCallbackHandle = number;

interface Window {
  requestIdleCallback: (
    callback: (deadline: RequestIdleCallbackDeadline) => void,
    opts?: RequestIdleCallbackOptions
  ) => RequestIdleCallbackHandle;
}

interface RequestIdleCallbackDeadline {
  didTimeout: boolean;
  timeRemaining: () => number;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [isPostHogLoaded, setIsPostHogLoaded] = useState(false);

  useEffect(() => {
    // Only load PostHog after the page has fully loaded
    const loadPostHog = () => {
      // Check if we should initialize PostHog (don't initialize in development)
      if (process.env.NODE_ENV === "development") {
        console.log("PostHog disabled in development");
        return;
      }

      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        person_profiles: "always",
        capture_pageview: false, // Disable automatic pageview capture
        loaded: () => {
          setIsPostHogLoaded(true);
        },
        autocapture: {
          // Limit element capturing to essential elements
          element_allowlist: ["a", "button", "form"],
        },
        // Disable features that aren't critical
        capture_performance: true,
        bootstrap: {
          distinctID: localStorage.getItem("ph_distinctid") || undefined,
        },
        // Reduce network requests
        request_batching: true,
      });
    };

    // Use a more aggressive deferral strategy
    if (typeof window !== "undefined") {
      // Option 1: Load after page is fully loaded
      if (document.readyState === "complete") {
        setTimeout(loadPostHog, 2000); // Delay by 2 seconds after load
      } else {
        window.addEventListener("load", () => {
          // Use requestIdleCallback with a longer timeout if available
          if ("requestIdleCallback" in window) {
            (window as unknown as Window).requestIdleCallback(loadPostHog, {
              timeout: 4000,
            });
          } else {
            // Fallback to setTimeout with a longer delay
            setTimeout(loadPostHog, 3000);
          }
        });
      }
    }

    return () => {
      // Cleanup if needed
      window.removeEventListener("load", loadPostHog);
    };
  }, []);

  // Only render the page view tracker if PostHog is loaded
  return (
    <PHProvider client={posthog}>
      {isPostHogLoaded && <SuspendedPostHogPageView />}
      {children}
    </PHProvider>
  );
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + "?" + searchParams.toString();
      }

      // Delay pageview capture slightly to prioritize rendering
      setTimeout(() => {
        posthog.capture("$pageview", { $current_url: url });
      }, 300);
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

// Wrap PostHogPageView in Suspense to avoid the useSearchParams usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}
