import Image from "next/image";

export default function ExplorerGraph() {
  return (
    <div className="relative w-full h-full min-h-[500px]">
      <Image
        src="/graph.svg"
        alt="Explorer graph visualization"
        width={400}
        height={800}
        className="w-full h-full object-cover object-left"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#040E09] to-[transparent]" />
    </div>
  );
}
