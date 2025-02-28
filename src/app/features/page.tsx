"use client";

import React, { useRef as UseRef } from "react";
import Image from "next/image";
import GreenBlobSidekick from "../components/common/GreenBlobSidekick";
import Divider from "../components/common/Divider";
import CardDetail from "../components/common/CardDetail";
import { motion, useInView } from "framer-motion";

const Page = () => {
  const sectionRef = UseRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Add these variant definitions
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const imageContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.1,
      },
    },
  };

  const imageItemVariants = {
    hidden: { opacity: 0, y: 120 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        opacity: { duration: 1.2 },
      },
    },
  };

  return (
    <div
      id="features"
      className="bg-background min-h-screen flex items-center justify-center p-4 w-full relative mt-64 mb-64"
    >
      <div className="absolute -top-36 md:-top-[500px] left-0 w-full h-full">
        <GreenBlobSidekick />
      </div>
      <div className="w-full md:max-w-7xl text-center md:px-16">
        {/* Icon */}
        <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 flex items-center justify-center">
          <Image src="/Chat.svg" width={108} alt="chat-icon" height={108} />
        </div>

        {/* Heading */}
        <p className="text-3xl md:text-4xl font-bold text-white mb-2 w-full">
          Your Chatty Empathetic Sidekick
        </p>
        <p className="mb-12 md:text-lg">
          No more &quot;Dear Diary&quot; - Speak your mind
        </p>

        {/* Modes Container */}
        <div className="bg-gradient-to-b from-black/40 to-black/5 backdrop-blur-sm rounded-3xl p-8 border-x border-t border-b border-emerald-900/30 border-b-transparent min-h-[600px]">
          <div
            className="flex flex-col-reverse md:flex-row h-full min-h-full flex-1"
            ref={sectionRef}
          >
            {/* Text Container */}
            <motion.div
              className="flex flex-col w-full md:w-1/3 justify-center z-10 mt-16 md:mt-24 h-full"
              variants={textContainerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Chat Mode */}
              <motion.div variants={textItemVariants}>
                <CardDetail
                  title="Chat Mode"
                  description='Spill all the tea - from cringy moments to "what on earth was I thinking" reflections without judgment'
                />
              </motion.div>
              <motion.div variants={textItemVariants}>
                <Divider />
              </motion.div>

              {/* Vent Mode */}
              <motion.div variants={textItemVariants}>
                <CardDetail
                  title="Vent Mode"
                  description="Rant away, empty your emotional bucket. Zeniary won't try to fix it with unsolicited advice."
                />
              </motion.div>
              <motion.div variants={textItemVariants}>
                <Divider />
              </motion.div>

              {/* A true friend */}
              <motion.div variants={textItemVariants}>
                <CardDetail
                  title="A true friend"
                  description="Unsure what to say? Our chat templates will help you like a caring buddy who's always there."
                />
              </motion.div>
            </motion.div>

            {/* Image Container - Mobile: fixed height, Desktop: full height */}
            <motion.div
              className="w-full md:w-2/3 relative h-[300px] md:h-full overflow-visible"
              variants={imageContainerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Mobile-only images - shown on mobile, hidden on desktop */}
              <div className="md:hidden flex justify-center items-center h-full relative">
                <motion.div
                  variants={imageItemVariants}
                  className="w-1/2 flex justify-center items-center"
                >
                  <Image
                    src="/left-high-res.png"
                    alt="Sidekick"
                    width={280}
                    height={280}
                    className="object-contain max-h-full transform translate-x-6 -translate-y-2 scale-150"
                  />
                </motion.div>
                <motion.div
                  variants={imageItemVariants}
                  className="w-1/2 flex justify-center items-center"
                >
                  <Image
                    src="/right-high-res.png"
                    alt="Sidekick"
                    width={280}
                    height={280}
                    className="object-contain max-h-full transform -translate-x-6 translate-y-6 scale-150"
                  />
                </motion.div>
              </div>

              {/* Desktop-only images - hidden on mobile, shown on desktop */}
              <div className="hidden md:block relative h-full">
                <motion.div variants={imageItemVariants}>
                  <Image
                    src="/left-high-res.png"
                    alt="Sidekick"
                    width={600}
                    height={200}
                    className="object-cover absolute top-12 -left-16"
                  />
                </motion.div>
                <motion.div variants={imageItemVariants}>
                  <Image
                    src="/right-high-res.png"
                    alt="Sidekick"
                    width={600}
                    height={200}
                    className="object-cover absolute top-28 -right-20"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
