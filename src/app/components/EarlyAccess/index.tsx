import React from "react";
import Email from "../common/Email";
import Link from "next/link";
const index = () => {
  return (
    <div className="min-h-96 mt-8 flex flex-col gap-4 items-center w-full justify-center">
      <div className="w-full mx-auto max-w-7xl text-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          Get Access To Early Beta.
        </h1>
      </div>
      <Email location="bottom_cta" />
      <p className="mt-8 text-center px-6">
        Like what you see? Mind taking a{" "}
        <Link href="/survey">
          <span className="text-green-500 underline"> quick survey </span>
        </Link>{" "}
        to provide valuable feedback?
      </p>
    </div>
  );
};

export default index;
