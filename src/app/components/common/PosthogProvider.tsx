// app/providers.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense, useState } from "react";
import { usePostHog } from "posthog-js/react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [isPostHogLoaded, setIsPostHogLoaded] = useState(false);

  useEffect(() => {
    // Only load PostHog in production
    if (process.env.NODE_ENV === "development") {
      console.log("PostHog disabled in development");
      return;
    }

    // Simple initialization with minimal configuration
    const loadPostHog = () => {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        capture_pageview: false, // We'll handle pageviews manually
        loaded: () => {
          setIsPostHogLoaded(true);
        },
        // Minimal configuration for essential metrics
        autocapture: {
          element_allowlist: ["a", "button", "form"],
        },
        // Use sessionStorage instead of localStorage
        persistence: "sessionStorage",
        // Disable features we don't need
        disable_session_recording: true,
        disable_cookie: true,
        respect_dnt: true,
      });
    };

    // Load after a short delay to prioritize page rendering
    if (typeof window !== "undefined") {
      setTimeout(loadPostHog, 1500);
    }

    return () => {
      // No cleanup needed
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

// Wrap PostHogPageView in Suspense to avoid client-side rendering issues
function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}
