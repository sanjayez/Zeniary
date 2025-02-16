import React from "react";

const Start = ({
  className,
  width,
  height,
}: {
  className?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <div className={className}>
      <svg
        width={width || 68}
        height={height || 68}
        viewBox="0 0 68 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="34" cy="34" r="15.75" fill="white" stroke="white" />
        <circle cx="34" cy="34" r="30" stroke="white" strokeWidth="8" />
      </svg>
    </div>
  );
};

export default Start;
