import React from "react";

interface DividerProps {
  className?: string;
  color?: string;
  marginBottom?: string;
}

const Divider: React.FC<DividerProps> = ({
  className = "",
  color = "emerald-900/30",
  marginBottom = "8",
}) => {
  return (
    <div
      className={`border-t border-${color} mb-${marginBottom} ${className}`}
    />
  );
};

export default Divider;
