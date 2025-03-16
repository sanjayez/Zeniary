import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-screen bg-[#010C0A] pt-32 px-4 flex flex-col items-center">
      <div className="mx-auto max-w-[800px] py-8 px-4 md:px-0 md:py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Page Not Found</h1>
        <p className="text-xl text-gray-300 mb-8">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center bg-[#50BA65] text-black font-medium py-3 px-6 rounded-full hover:bg-opacity-90 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
} 