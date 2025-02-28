"use client";

import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import Privacy from "./components/Security/Privacy";
import EarlyAccess from "./components/EarlyAccess";
import Features from "./features/page";
import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";

export default function Home() {
  // Use custom thresholds for the homepage
  useScrollDepthTracking({
    thresholds: [10, 25, 50, 75, 90, 100],
    pageIdentifier: "homepage",
  });

  return (
    <>
      <Hero />
      <Features />
      <Dashboard />
      {/* <GreenBlobSidekick /> */}
      <Privacy />
      <EarlyAccess />
    </>
  );
}
