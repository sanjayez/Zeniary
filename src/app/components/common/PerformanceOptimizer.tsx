"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Component that implements various performance optimizations
 * - Preconnects to critical domains
 * - Implements font display optimization
 * - Defers non-critical JavaScript
 */
export default function PerformanceOptimizer() {
  const pathname = usePathname();

  useEffect(() => {
    // Add preconnect for critical third-party domains
    const preconnectDomains = [
      "https://us.i.posthog.com",
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
    ];

    preconnectDomains.forEach((domain) => {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = domain;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });

    // Defer non-critical JavaScript
    const deferNonCriticalJS = () => {
      // Find all script tags without async or defer
      const scripts = document.querySelectorAll(
        "script:not([async]):not([defer])"
      );

      scripts.forEach((script) => {
        // Ensure script is an HTMLScriptElement
        if (!(script instanceof HTMLScriptElement)) return;

        // Skip critical scripts
        if (
          script.src.includes("chunk-") ||
          script.src.includes("webpack-") ||
          script.src.includes("main-")
        ) {
          return;
        }

        // Clone and replace with deferred version
        const newScript = document.createElement("script");
        Array.from(script.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.defer = true;

        if (script.parentNode) {
          script.parentNode.replaceChild(newScript, script);
        }
      });
    };

    // Execute after a short delay to not block initial rendering
    setTimeout(deferNonCriticalJS, 1000);

    return () => {
      // Cleanup if needed
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}
