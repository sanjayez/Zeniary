interface InsightsMetricProps {
  isPositive: boolean;
  value: number;
  label: string;
}

export default function InsightsMetric({
  isPositive = true,
  value,
  label,
}: InsightsMetricProps) {
  return (
    <div className="text-center space-y-2">
      <div className="text-7xl font-bold bg-gradient-to-r from-white to-[#c0c0c0] text-transparent bg-clip-text flex items-baseline">
        <span className="text-5xl">{isPositive ? "+" : "-"}</span>
        {value}
        <span className="text-5xl">%</span>
      </div>
      <div
        className={`${
          isPositive ? "text-emerald-500" : "text-red-400"
        } flex items-center justify-center gap-1 bg-emerald-500/10 px-4 py-1 rounded-full`}
      >
        {label} {isPositive ? " ↑ " : " ↓ "}
      </div>
    </div>
  );
}
