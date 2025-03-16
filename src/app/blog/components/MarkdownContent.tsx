/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactMarkdown from 'react-markdown';

type MarkdownContentProps = {
  content: string;
};

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  const components = {
    h1: (props: any) => <h1 className="text-3xl font-bold mb-6 mt-8" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-bold mb-4 mt-8" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-bold mb-3 mt-6" {...props} />,
    h4: (props: any) => <h4 className="text-lg font-bold mb-2 mt-4" {...props} />,
    p: (props: any) => <p className="mb-5 text-gray-200 leading-relaxed" {...props} />,
    ul: (props: any) => <ul className="list-disc pl-8 mb-5" {...props} />,
    ol: (props: any) => <ol className="list-decimal pl-8 mb-5" {...props} />,
    li: (props: any) => <li className="mb-2" {...props} />,
    a: (props: any) => <a className="text-[#50BA65] hover:underline" {...props} />,
    strong: (props: any) => <strong className="font-bold" {...props} />,
    em: (props: any) => <em className="italic" {...props} />,
    blockquote: (props: any) => (
      <blockquote className="border-l-4 border-[#50BA65] pl-4 italic my-5" {...props} />
    ),
    code: (props: any) => (
      <code className="bg-[#1c3029] rounded px-1 py-0.5 text-sm font-mono" {...props} />
    ),
    pre: (props: any) => (
      <pre className="bg-[#1c3029] rounded p-4 overflow-x-auto my-5 text-sm font-mono" {...props} />
    ),
  };

  return (
    <ReactMarkdown components={components}>
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownContent; 