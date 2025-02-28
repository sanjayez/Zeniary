"use client";

import Hero from "./components/Hero";
import EarlyAccess from "./components/EarlyAccess";
import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";
import { useSectionTimeTracking } from "@/hooks/useSectionTimeTracking";
import { Suspense, lazy } from "react";

// Use lazy loading for non-critical components
const LazyDashboard = lazy(() => import("./components/Dashboard"));
const LazyPrivacy = lazy(() => import("./components/Security/Privacy"));
const LazyFeatures = lazy(() => import("./features/page"));

// Loading fallbacks
const SectionLoading = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function Home() {
  // Use custom thresholds for the homepage
  useScrollDepthTracking({
    thresholds: [10, 25, 50, 75, 90, 100],
    pageIdentifier: "homepage",
  });

  // Create refs for each section to track time spent
  const heroSectionRef = useSectionTimeTracking({ sectionId: "hero" });
  const featuresSectionRef = useSectionTimeTracking({ sectionId: "features" });
  const dashboardSectionRef = useSectionTimeTracking({
    sectionId: "dashboard",
  });
  const privacySectionRef = useSectionTimeTracking({ sectionId: "privacy" });
  const earlySectionRef = useSectionTimeTracking({ sectionId: "early-access" });

  return (
    <>
      {/* Hero section is critical, load immediately */}
      <section ref={heroSectionRef}>
        <Hero />
      </section>

      {/* Lazy load non-critical sections */}
      <section ref={featuresSectionRef}>
        <Suspense fallback={<SectionLoading />}>
          <LazyFeatures />
        </Suspense>
      </section>

      <section ref={dashboardSectionRef}>
        <Suspense fallback={<SectionLoading />}>
          <LazyDashboard />
        </Suspense>
      </section>

      <section ref={privacySectionRef}>
        <Suspense fallback={<SectionLoading />}>
          <LazyPrivacy />
        </Suspense>
      </section>

      <section ref={earlySectionRef}>
        <EarlyAccess />
      </section>
    </>
  );
}
