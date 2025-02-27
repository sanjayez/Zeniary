import React from "react";

const HeroMask = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 w-full">
      <div className="relative h-[500px]">
        {/* Blurred triangle */}
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>
    </div>
  );
};

export default HeroMask;
