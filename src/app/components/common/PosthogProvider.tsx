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
    // Defer PostHog initialization to improve initial page load
    const loadPostHog = () => {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        person_profiles: "always", // or 'always' to create profiles for anonymous users as well
        capture_pageview: false, // Disable automatic pageview capture, as we capture manually
        loaded: () => {
          setIsPostHogLoaded(true);
        },
        autocapture: {
          // Disable elements that might impact performance
          element_allowlist: [
            "a",
            "button",
            "form",
            "input",
            "select",
            "textarea",
            "label",
          ],
        },
        // Use supported configuration options only
        capture_performance: true,
        bootstrap: {
          distinctID: localStorage.getItem("ph_distinctid") || undefined,
        },
      });
    };

    // Use requestIdleCallback or setTimeout to defer loading
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        // Use type assertion for requestIdleCallback
        (window as unknown as Window).requestIdleCallback(loadPostHog);
      } else {
        setTimeout(loadPostHog, 1000);
      }
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

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

      posthog.capture("$pageview", { $current_url: url });
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
