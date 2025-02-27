import Image from "next/image";

export default function index() {
  return (
    <div
      id="features"
      className="bg-background min-h-screen flex items-center justify-center p-4 w-full"
    >
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
        <div className="bg-gradient-to-b from-black/40 to-black/5 backdrop-blur-sm rounded-3xl p-8 border-x border-t border-b border-emerald-900/30 border-b-transparent h-[600px] ">
          <div className="flex flex-col-reverse md:flex-row h-full">
            <div className="flex flex-col w-full md:w-1/2 h-full justify-center">
              {/* Chat Mode */}
              <div className="mb-8 max-w-sm mx-auto text-center md:text-left">
                <h2 className="text-white text-lg md:text-xl font-semibold mb-2 ">
                  Chat Mode
                </h2>
                <p className="text-sm md:text-base text-gray-400">
                  Spill all the tea - from cringy moments to &quot;what on earth
                  was I thinking&quot; reflections without judgment
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-emerald-900/30 mb-8" />

              {/* Vent Mode */}
              <div className="max-w-sm mx-auto text-center md:text-left">
                <h2 className="text-white text-lg md:text-xl font-semibold mb-2 ">
                  Vent Mode
                </h2>
                <p className="text-sm md:text-base text-gray-400">
                  Rant away, empty your emotional bucket. Zeniary won&apos;t try
                  to fix you with unsolicited advice.
                </p>
              </div>
            </div>
            <div className="w-1/2 h-full relative">
              <Image
                src="/iPhone-left.png"
                alt="Sidekick"
                width={1200}
                height={900}
                className="object-cover absolute w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
