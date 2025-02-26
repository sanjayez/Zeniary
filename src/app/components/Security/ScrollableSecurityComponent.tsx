import React from "react";
import Security from "./Security";

const ScrollableSecurityComponent = () => {
  return (
    <>
      <Security />
      <div className="w-full mx-auto max-w-7xl text-center -mt-[500px]">
        <section className="relative w-full px-4 py-16">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-white">
              <span className={` inline-block text-2xl italic sm:text-3xl`}>
                Journal without fear
              </span>
              <span className="ml-2 font-light">- We Keep The Snoops Out</span>
            </h2>

            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-emerald-100/90 sm:text-base">
              At Zeniary, your privacy is our top priority. With on-device
              storage and private cloud, only you can access your data. Our
              platform runs on a personalized AI, so you can explore, reflect,
              and evolve with complete peace of mind.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default ScrollableSecurityComponent;
