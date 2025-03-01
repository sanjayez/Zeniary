"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface StructuredDataProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  type?: "WebSite" | "WebPage" | "Article" | "SoftwareApplication";
}

export default function StructuredData({
  title = "Zeniary – Your Thoughts, Smarter.",
  description = "Transform your journaling experience with Zeniary, a privacy-first journaling app that combines voice and text input with personalized AI insights.",
  imageUrl = "/og-image.svg",
  type = "WebSite",
}: StructuredDataProps) {
  const pathname = usePathname();
  const baseUrl = "https://zeniary.app";
  const currentUrl = `${baseUrl}${pathname}`;

  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Create a single structured data object with essential information
    const structuredData = {
      "@context": "https://schema.org",
      "@type": type,
      name: "Zeniary",
      url: currentUrl,
      description: description,
      image: `${baseUrl}${imageUrl}`,
    };

    // Create and append script safely
    if (typeof window !== "undefined") {
      if (!scriptRef.current) {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
        scriptRef.current = script;
      } else {
        scriptRef.current.textContent = JSON.stringify(structuredData);
      }
    }

    // Cleanup function
    return () => {
      if (scriptRef.current) {
        scriptRef.current.remove();
      }
    };
  }, [baseUrl, currentUrl, title, description, imageUrl, type]);

  // Component doesn't render anything visible
  return null;
}
