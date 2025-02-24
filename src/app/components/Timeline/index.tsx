import React, { useRef, useLayoutEffect, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import TimelineGray from "./TimelineGray";
import TimelineColor from "./TimelineColor";
import Start from "./Start";

// This is a half baked version of the timeline.
// It's not being used in the project.
// If it has to be used, import index.ts from the Timeline folder.

const Timeline: React.FC = () => {
  const controls = useAnimation();
  const timelineRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState<{
    left: number;
    right: number;
  }>({
    left: -Infinity,
    right: Infinity,
  });

  // Function to calculate and set drag constraints
  const computeConstraints = useCallback(() => {
    if (timelineRef.current && anchorRef.current && containerRef.current) {
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const anchorRect = anchorRef.current.getBoundingClientRect();
      // const containerRect = containerRef.current.getBoundingClientRect();

      // Right constraint: stops dragging when timeline's left edge reaches the anchor's right edge.
      const maxDragX = anchorRect.right - timelineRect.left;
      // Left constraint: stops dragging further left than half of the timeline remains visible.
      const leftConstraint = -timelineRect.width / 2 - timelineRect.left;

      setDragConstraints({ left: leftConstraint, right: maxDragX });
    }
  }, []);

  useLayoutEffect(() => {
    // Initial calculation on mount.
    computeConstraints();

    // Recalculate constraints on window resize.
    window.addEventListener("resize", computeConstraints);
    return () => {
      window.removeEventListener("resize", computeConstraints);
    };
  }, [computeConstraints]);

  // TODO: Add the anchor in the parent component.
  // Then we'll have a good refernece to the dge of the container.
  // Then we can fix the left anchor to left of the container.
  return (
    <div ref={containerRef} className="relative">
      <div className="relative max-w-6xl -translate-x-1/2">
        <motion.div
          drag="x"
          ref={timelineRef}
          dragConstraints={dragConstraints}
          dragElastic={0.2}
          dragMomentum={false}
          animate={controls}
          initial={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <TimelineGray />
          <TimelineColor />
          {/* Top must be checked for different screen sizes */}
          <Start
            className="absolute top-[55px] -translate-y-1/2 -left-8"
            width={28}
            height={28}
          />
        </motion.div>
      </div>
      <div
        ref={anchorRef}
        id="anchor"
        className="w-4 h-4 absolute top-1/2 -translate-y-1/2 translate-x-24"
      ></div>
    </div>
  );
};

export default Timeline;
