"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Sample navigation links
  const links = [
    { name: "Features", href: "/" },
    { name: "Blog", href: "/about" },
    { name: "Contact", href: "/services" },
  ];

  return (
    <nav className="w-full bg-[rgba(118, 118, 118, 0.2)] backdrop-blur-md shadow-md fixed top-0 left-0 z-50 font-[family-name:var(--font-roboto)]">
      <div className="max-w-[1200px] mx-auto px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <div className="flex items-center">
            <Link href="/" className="pr-4">
              <Image
                src="/zeniary-logo.svg"
                alt="Logo"
                width={25}
                height={35}
                className="object-contain"
              />
            </Link>
            <p className="text-white text-xl font-semibold">Zeniary</p>
          </div>

          {/* Navigation links for desktop */}
          <div className="hidden md:flex md:w-1/3 justify-between">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white hover:text-gray-600 transition-colors"
              >
                {link.name}
              </Link>
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
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/10 backdrop-blur-md h-screen flex flex-col justify-center items-center">
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
