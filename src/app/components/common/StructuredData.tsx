"use client";

import { usePathname } from "next/navigation";

interface StructuredDataProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  type?: "WebSite" | "WebPage" | "Article" | "SoftwareApplication";
  datePublished?: string;
  dateModified?: string;
}

export default function StructuredData({
  title = "Zeniary – The Chatty Empathetic Sidekick",
  description = "Transform your journaling experience with Zeniary, a privacy-first journaling app that combines voice and text input with personalized AI insights.",
  imageUrl = "/og-image.svg",
  type = "WebSite",
  datePublished,
  dateModified,
}: StructuredDataProps) {
  const pathname = usePathname();
  const baseUrl = "https://zeniary.app";
  const currentUrl = `${baseUrl}${pathname}`;

  // Base structured data for the website
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Zeniary",
    url: baseUrl,
    description:
      "Privacy-first journaling app with personalized AI insights for emotional wellness and productivity",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Structured data for the current page
  const pageData = {
    "@context": "https://schema.org",
    "@type": type,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": currentUrl,
    },
    headline: title,
    description: description,
    image: `${baseUrl}${imageUrl}`,
    url: currentUrl,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    author: {
      "@type": "Organization",
      name: "Zeniary",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Zeniary",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/zeniary-logo.svg`,
      },
    },
  };

  // Software application specific data
  const appData =
    type === "SoftwareApplication"
      ? {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Zeniary",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "Web, iOS, Android",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/ComingSoon",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: "210",
          },
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageData) }}
      />
      {appData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appData) }}
        />
      )}
    </>
  );
}
