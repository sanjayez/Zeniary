import React from "react";
import classNames from "classnames";

const Email = ({ className }: { className?: string }) => {
  return (
    <div
      className={classNames(
        "flex flex-col md:flex-row gap-4 items-center w-full justify-center px-8 md:px-0",
        className
      )}
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full max-w-lg md:max-w-md px-6 py-3 rounded bg-white/5 text-white placeholder-white/60 focus:outline-none"
      />
      <button className="px-4 py-1 md:px-8 md:py-2 bg-white text-[#0A0A0A] rounded font-medium text-lg hover:bg-white/95 transition-colors">
        Join Waitlist
      </button>
    </div>
  );
};

export default Email;
