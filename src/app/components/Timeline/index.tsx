import React from "react";
import { motion, useAnimation } from "framer-motion";
import TimelineGray from "./TimelineGray";
import TimelineColor from "./TimelineColor";

const Timeline: React.FC = () => {
  const controls = useAnimation();

  return (
    <div className="relative max-w-6xl -translate-x-1/2">
      <motion.div
        drag="x"
        dragElastic={0.2}
        dragMomentum={false}
        animate={controls}
        initial={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onMouseDown={() => {
          console.log("Mouse down.");
        }}
        onMouseUp={() => {
          console.log("Mouse released.");
          controls.start({ x: 0 });
        }}
        onMouseLeave={() => {
          console.log("Mouse left the draggable area.");
          controls.start({ x: 0 });
        }}
      >
        <TimelineGray />
        <TimelineColor />
      </motion.div>
    </div>
  );
};

export default Timeline;
