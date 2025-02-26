"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Security = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  // Transform scrollYProgress to scale from 2 (start) to 1 (end)
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [3, 1], {
    clamp: true,
  });
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1], {
    clamp: true,
  });

  return (
    <motion.div ref={ref} className="min-h-[200vh] w-full mx-auto">
      <motion.img
        src="/Lock.svg"
        alt="security"
        style={{
          scale: scaleProgress,
          opacity: opacityProgress,
        }}
        width={150}
        height={150}
        className="object-contain min-w-[80px]"
      />
    </motion.div>
  );
};

export default Security;
