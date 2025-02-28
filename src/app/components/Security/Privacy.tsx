import React from "react";
import Image from "next/image";

const Privacy = () => {
  return (
    <div className="w-full bg-background md:min-h-96 md:flex md:flex-col md:items-center md:justify-center">
      <div className="w-24 h-24 mx-auto flex items-center justify-center">
        <Image src="/Lock.svg" width={108} alt="chat-icon" height={108} />
      </div>
      <div className="w-full mx-auto max-w-7xl text-center">
        <section className="relative w-full px-4 pb-16 pt-8">
          <div className="container mx-auto max-w-4xl text-center px-8 md:px-0">
            <h2 className="mb-6 text-white">
              <span
                className={`font-dawning inline-block text-[36px] md:text-[48px] italic`}
              >
                Journal without fear
              </span>
              <span className="ml-2 font-light text-xl md:text-2xl">
                &mdash; We Keep The Snoops Out 🤫
              </span>
            </h2>

            <p className="mx-auto leading-relaxed text-base md:text-lg">
              At Zeniary, your privacy is our top priority. With{" "}
              <span className="text-green-500">on-device storage</span> and{" "}
              <span className="text-green-500">private cloud</span>, only you
              can access your data. Our platform uses a personalized AI, so you
              can explore, reflect, and evolve with complete peace of mind.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
