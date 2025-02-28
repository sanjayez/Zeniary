"use client";

import React, { useEffect, useState } from "react";
import HeroMask from "../common/HeroMask";
import Email from "../common/Email";
import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-green-500"
        viewBox="0 0 696 316"
        fill="none"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

const Hero: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center text-center px-4 relative">
      {isClient && (
        <>
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-black/100 to-transparent" />

      <div className="flex flex-col justify-center items-center -mt-[33vh] relative z-[2]">
        <h1 className="font-bold text-hero-title-small md:text-hero-title-above-medium bg-gradient-to-r from-white to-[#999999] text-transparent bg-clip-text leading-normal">
          Document Your Journey
        </h1>
        <p className="pt-2 text-lg md:text-2xl">A Journal You Can Query Into</p>
        <Email className="mt-6" location="hero_cta" />
      </div>
      <HeroMask />
    </section>
  );
};

export default Hero;
