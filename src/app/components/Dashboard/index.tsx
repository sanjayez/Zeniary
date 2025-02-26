"use client";

import Card from "../common/Card";
import ExplorerGraph from "./ExplorerGraph";
import EmotionTracker from "./EmotionTracker";
import JourneyTracker from "./JourneyTracker";
import Insights from "./Insights";
import Image from "next/image";
import { motion } from "framer-motion";

export default function index() {
  return (
    <main className="min-h-screen md:min-h-full bg-background text-white p-8 mb-24 cursor-default">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-10 flex items-center justify-center">
            <Image
              src="/Insights.svg"
              alt="insights-icon"
              width={70}
              height={70}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Explore and Uncover Timeless Insights
          </h1>
          <p className="max-w-3xl mx-auto md:text-lg">
            Explore your past and discover trends in your behavior and mood with
            Zeniary. Harness personalized, data-driven insights to make smarter
            decisions and elevate your self-awareness.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-[#040E09] border-gray-800 col-span-1 lg:col-span-1 row-span-2">
            <div className="p-4 relative h-full">
              <div className="h-full min-h-[300px] w-full relative">
                <ExplorerGraph />
              </div>
              <div className="absolute bottom-8 left-4 z-1 max-w-64 md:max-w-80">
                <h2 className="text-lg font-bold mb-2">Relive Experiences</h2>
                <p className="text-sm md:text-base text-gray-400">
                  Your experiences aren't just linear. Recall, Relive and Query
                  the rich network your mind has built.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-[#040E09] border-gray-800 ">
            <div className="p-4">
              <h2 className="text-lg font-medium mb-2">Emotion Tracker</h2>
              <div className="aspect-video pt-4">
                <EmotionTracker />
              </div>
            </div>
          </Card>

          <Card className="bg-[#040E09] border-gray-800 row-span-2 cursor-default">
            <div className="p-4 h-full flex flex-col min-h-[300px]">
              <h2 className="text-lg font-medium mb-2">
                Insights and weekly life reviews
              </h2>
              <motion.div
                className="flex-1 flex items-center justify-center relative min-h-[300px]"
                initial="initial"
                whileHover="hover"
              >
                <motion.div
                  variants={{
                    initial: { opacity: 1, y: 0 },
                    hover: { opacity: 0, y: -20 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center z-20"
                >
                  <Insights isPositive={true} value={37} label="Happiness" />
                </motion.div>
                <motion.div
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    hover: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center z-10"
                >
                  <Insights isPositive={false} value={17} label="Stress" />
                </motion.div>
              </motion.div>
            </div>
          </Card>

          <Card className="bg-[#040E09] border-gray-800">
            <div className="p-4">
              <h2 className="text-lg font-medium mb-2">Journey Tracker</h2>
              <div className="aspect-video">
                <JourneyTracker />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
