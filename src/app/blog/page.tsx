import React from "react";
import { blogPosts } from "./data";
import BlogCard from "./components/BlogCard";

export const metadata = {
  title: "Blog | Zeniary",
  description: "Read the latest articles about journaling, mental health, and personal growth from the Zeniary team.",
};

const BlogPage = () => {
  return (
    <section className="min-h-screen bg-[#010C0A] pt-32 px-4">
      <div className="mx-auto max-w-[1200px] py-8 px-4 md:px-12 md:py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Zeniary Blog</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Insights on journaling, mental health, and personal growth
          </p>
        </div>
        
        {blogPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPage;
