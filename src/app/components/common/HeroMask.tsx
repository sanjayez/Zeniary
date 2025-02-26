import React from "react";

const HeroMask = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 w-full">
      <div className="relative h-[500px]">
        {/* Blurred triangle */}
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-background via-background/80 to-transparent" />

        {/* Sharp triangle */}
        {/* <div
          className="absolute bottom-0 w-full h-0"
          style={{
            borderLeft: "50vw solid transparent",
            borderRight: "50vw solid transparent",
            borderBottom: "100px solid var(--background)",
          }}
        /> */}
      </div>
    </div>
  );
};

export default HeroMask;
