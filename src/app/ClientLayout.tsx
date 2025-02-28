"use client";

import { usePathname } from "next/navigation";
import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
