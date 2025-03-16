import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '../types';

type BlogCardProps = {
  post: BlogPost;
};

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <div className="bg-[#17201e] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] h-full flex flex-col">
        {post.coverImage && (
          <div className="relative w-full h-56">
            <Image 
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex items-center mb-4">
            {post.author.image && (
              <div className="relative w-8 h-8 mr-3">
                <Image 
                  src={post.author.image}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
            )}
            <p className="text-sm text-gray-300">{post.author.name} • {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <h3 className="text-xl font-bold mb-2 group-hover:text-[#50BA65] transition-colors">
            {post.title}
          </h3>
          
          <p className="text-gray-300 mb-4 flex-grow">
            {post.excerpt}
          </p>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs bg-[#1c3029] px-2 py-1 rounded-full text-[#50BA65]">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard; 