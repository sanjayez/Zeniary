"use client";

import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import Privacy from "./components/Security/Privacy";
import EarlyAccess from "./components/EarlyAccess";
import Features from "./features/page";
import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";
import { useSectionTimeTracking } from "@/hooks/useSectionTimeTracking";

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
      <section ref={heroSectionRef}>
        <Hero />
      </section>
      <section ref={featuresSectionRef}>
        <Features />
      </section>
      <section ref={dashboardSectionRef}>
        <Dashboard />
      </section>
      <section ref={privacySectionRef}>
        <Privacy />
      </section>
      <section ref={earlySectionRef}>
        <EarlyAccess />
      </section>
    </>
  );
}
