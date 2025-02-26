import React from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={classNames("flex items-center", className)}>
      <Link href="/" className="pr-4 flex items-center gap-4">
        <Image
          src="/zeniary-logo.svg"
          alt="Logo"
          width={25}
          height={35}
          className="object-contain"
        />
        <p className="text-white text-xl font-semibold">Zeniary</p>
      </Link>
    </div>
  );
};

export default Logo;
