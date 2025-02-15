"use client";

import React from "react";
import Image from "next/image";
import TimelineColor from "./Timeline/TimelineColor";
import TimelineGray from "./Timeline/TimelineGray";
import Timeline from "./Timeline";

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen text-center px-4 relative bg-gradient-to-t from-[rgba(0,80,15,0.15)] to-transparent before:absolute before:inset-x-0 before:bottom-0 before:h-3/4 before:bg-gradient-to-t before:from-[rgba(0,80,15,0.4)] before:to-transparent overflow-clip">
      {/* Hero Text */}
      <div className="flex flex-col justify-center items-center -mt-[33vh] relative z-10">
        <h1 className="font-bold text-3xl md:text-[64px] bg-gradient-to-r from-white to-[#999999] text-transparent bg-clip-text leading-normal">
          Document Your Journey.
        </h1>
        <p className="text-xl md:text-[36px]">A Journal You Can Query Into</p>
      </div>

      {/* Timeline */}
      <div className="absolute bottom-20 left-0 right-0 mt-8">
        <Timeline />
      </div>
    </section>
  );
};

export default Hero;
