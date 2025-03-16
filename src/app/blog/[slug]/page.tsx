/* eslint-disable */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '../data';
import MarkdownContent from '../components/MarkdownContent';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Keep a simple interface for the params to avoid complex type issues
type BlogParams = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: BlogParams) {
  const slug = params.slug;
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | Zeniary',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: `${post.title} | Zeniary Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export function generateStaticParams() {
  return blogPosts.map(post => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogParams) {
  // Extract the slug from params
  const slug = params.slug;
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <section className="min-h-screen bg-[#010C0A] pt-32 px-4">
      <div className="mx-auto max-w-[800px] py-8 px-4 md:px-0 md:py-12">
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-[#50BA65] hover:underline mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all posts
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center mb-8">
            {post.author.image && (
              <div className="relative w-10 h-10 mr-3">
                <Image 
                  src={post.author.image}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            )}
            <div>
              <p className="text-[#50BA65] font-medium">{post.author.name}</p>
              <p className="text-sm text-gray-400">
                {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          
          {post.coverImage && (
            <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8 rounded-lg overflow-hidden">
              <Image 
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs bg-[#1c3029] px-3 py-1 rounded-full text-[#50BA65]">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <article className="prose prose-invert prose-green max-w-none">
          <MarkdownContent content={post.content} />
        </article>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <Link href="/blog" className="inline-flex items-center text-[#50BA65] hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </div>
    </section>
  );
} 