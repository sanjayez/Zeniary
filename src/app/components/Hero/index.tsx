"use client";

import React from "react";
import HeroMask from "../common/HeroMask";
import Email from "../common/Email";
const index: React.FC = () => {
  return (
    <section className="bg-heroBannerImgWithoutGlow bg-no-repeat bg-cover bg-center w-full h-screen flex flex-col justify-center items-center text-center px-4 relative">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent " />

      {/* Hero Text */}
      <div className="flex flex-col justify-center items-center -mt-[33vh] relative z-[2]">
        <h1 className="font-bold text-hero-title-small md:text-hero-title-above-medium bg-gradient-to-r from-white to-[#999999] text-transparent bg-clip-text leading-normal">
          Document Your Journey
        </h1>
        <p className="pt-2 text-lg md:text-2xl">A Journal You Can Query Into</p>
        <Email className="mt-6" />
      </div>
      <HeroMask />
    </section>
  );
};

export default index;
