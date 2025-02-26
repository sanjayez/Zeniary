import Image from "next/image";

export default function EmotionTracker() {
  return (
    <div className="relative">
      <Image
        src="/EmotionTracker.svg"
        width={600}
        height={400}
        alt="Emotion tracking visualization"
      />
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">
        😇
      </div>
    </div>
  );
}
