"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Component that implements various performance optimizations
 * - Preconnects to critical domains
 * - Implements font display optimization
 * - Defers non-critical JavaScript
 * - Implements resource hints
 * - Optimizes image loading
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

    // Add DNS prefetch for non-critical domains
    const dnsPrefetchDomains = [
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
    ];

    dnsPrefetchDomains.forEach((domain) => {
      const link = document.createElement("link");
      link.rel = "dns-prefetch";
      link.href = domain;
      document.head.appendChild(link);
    });

    // Optimize image loading
    const optimizeImages = () => {
      // Find all images without loading attribute
      const images = document.querySelectorAll("img:not([loading])");

      images.forEach((img) => {
        // Skip small images or those with priority attribute
        if (!(img instanceof HTMLImageElement)) return;

        if (
          img.hasAttribute("priority") ||
          (img.width && img.width < 100) ||
          (img.height && img.height < 100)
        ) {
          return;
        }

        // Add lazy loading to non-critical images
        img.loading = "lazy";

        // Add decoding async for non-critical images
        if (!img.hasAttribute("decoding")) {
          img.decoding = "async";
        }
      });
    };

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

    // Optimize CSS loading
    const optimizeCSS = () => {
      const styleSheets = document.querySelectorAll('link[rel="stylesheet"]');

      styleSheets.forEach((sheet, index) => {
        // Skip critical CSS (usually the first few stylesheets)
        if (index < 2) return;

        // Add media="print" and then switch to all after load
        if (sheet instanceof HTMLLinkElement) {
          const originalMedia = sheet.media || "all";
          sheet.media = "print";
          sheet.onload = () => {
            sheet.media = originalMedia;
          };
        }
      });
    };

    // Execute optimizations with appropriate timing
    if (document.readyState === "complete") {
      // Page already loaded, run optimizations immediately
      setTimeout(() => {
        deferNonCriticalJS();
        optimizeImages();
        optimizeCSS();
      }, 0);
    } else {
      // Wait for page load for non-critical optimizations
      window.addEventListener("load", () => {
        // Use requestIdleCallback if available
        if ("requestIdleCallback" in window) {
          // Define the type for requestIdleCallback
          interface RequestIdleCallbackOptions {
            timeout: number;
          }

          interface RequestIdleCallbackDeadline {
            didTimeout: boolean;
            timeRemaining: () => number;
          }

          interface WindowWithIdleCallback extends Window {
            requestIdleCallback: (
              callback: (deadline: RequestIdleCallbackDeadline) => void,
              opts?: RequestIdleCallbackOptions
            ) => number;
          }

          (window as WindowWithIdleCallback).requestIdleCallback(
            () => {
              deferNonCriticalJS();
              optimizeImages();
              optimizeCSS();
            },
            { timeout: 2000 }
          );
        } else {
          // Fallback to setTimeout
          setTimeout(() => {
            deferNonCriticalJS();
            optimizeImages();
            optimizeCSS();
          }, 1000);
        }
      });
    }

    return () => {
      // Cleanup if needed
      window.removeEventListener("load", deferNonCriticalJS);
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}
