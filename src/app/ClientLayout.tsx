"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PerformanceOptimizer from "./components/common/PerformanceOptimizer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Initialize scroll tracking for the current page
  useScrollDepthTracking({
    pageIdentifier: pathname,
  });

  return (
    <>
      <PerformanceOptimizer />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
