import Link from "next/link";
import Logo from "../common/Logo";
import { links } from "../Navbar/constants";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-200 py-8 px-6 border-t border-gray-700">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center md:flex-row md:justify-between md:items-start md:text-left px-4 py-12">
        {/* Left side */}
        <div className="flexspace-y-2 mb-6 md:mb-0">
          <Logo className="justify-center md:justify-start" />
          <p className="text-xs md:text-sm text-gray-400 pt-4">
            © 2025 Sanforge Limited. All rights reserved.
          </p>
          <p className="text-xs md:text-sm text-gray-400 pt-4"></p>
        </div>

        {/* Right side navigation */}
        <nav className="space-y-4">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block hover:text-white transition-colors text-sm lg:text-base text-gray-400"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
