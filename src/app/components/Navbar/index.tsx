"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "../common/Logo";

const LinkComponent = (link: any) => {
  return (
    <Link
      href={link.href}
      className="text-white px-4 py-2 rounded-full transition-all hover:bg-[#50BA65]"
    >
      {link.name}
    </Link>
  );
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Sample navigation links
  const links = [
    { name: "Features", href: "/#features" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-[rgba(118, 118, 118, 0.2)] backdrop-blur-md shadow-md fixed top-0 left-0 z-50">
      <div className="md:max-w-[1200px] mx-auto px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo on the left */}
          <Logo />

          {/* Navigation links for desktop */}
          <div className="hidden md:flex md:w-1/3 justify-between">
            {links.map((link) => (
              <LinkComponent key={link.name} {...link} />
            ))}
          </div>

          {/* Hamburger menu button for mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  // Close icon (X)
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  // Hamburger icon
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu; shows the nav links on mobile devices */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/10 backdrop-blur-md h-screen flex flex-col justify-center items-center">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-200 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
