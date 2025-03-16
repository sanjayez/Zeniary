export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: {
    name: string;
    image?: string;
  };
  tags?: string[];
}; 