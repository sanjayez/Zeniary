import { Metadata } from 'next';
import { ReactNode } from 'react';

// Override Next.js types for App Router
declare module 'next' {
  // Extend PageProps interface to accept simple params
  interface PageProps {
    params?: Record<string, string | string[]>;
    searchParams?: Record<string, string | string[] | undefined>;
  }
  
  // Override types for metadata generation
  export function generateMetadata(
    props: PageProps,
    parent?: ResolvingMetadata
  ): Promise<Metadata> | Metadata;
}

// Make TypeScript happy with dynamic route params
declare module 'next/navigation' {
  interface Params {
    [key: string]: string | string[];
  }
} 