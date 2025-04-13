// components/chat/MemoizedMarkdown.tsx
import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Define component props interface
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const MemoizedMarkdown = memo(
  ({ content, id }: { content: string; id: string }) => {
    return (
      <div className="prose prose-invert prose-sm max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            code({ node, inline, className, children, ...props }: CodeProps) {
              const match = /language-(\w+)/.exec(className || '');
              
              return !inline && match ? (
                <div className="relative group">
                  <SyntaxHighlighter
                    style={oneDark as any}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                  <button 
                    className="absolute top-2 right-2 p-2 rounded bg-gray-700 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
              ) : (
                <code className="bg-gray-700 rounded px-1 py-0.5" {...props}>
                  {children}
                </code>
              );
            },
            // Customize other markdown elements
            h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-bold mt-5 mb-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-bold mt-4 mb-2">{children}</h3>,
            p: ({ children }) => <p className="mb-4">{children}</p>,
            ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
            a: ({ href, children }) => (
              <a href={href} className="text-virtus-red hover:underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-600 pl-4 italic">{children}</blockquote>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700 mb-4">{children}</table>
              </div>
            ),
            thead: ({ children }) => <thead className="bg-gray-700">{children}</thead>,
            tbody: ({ children }) => <tbody className="divide-y divide-gray-700">{children}</tbody>,
            tr: ({ children }) => <tr>{children}</tr>,
            th: ({ children }) => <th className="px-4 py-2 text-left text-sm font-medium text-gray-200 uppercase tracking-wider">{children}</th>,
            td: ({ children }) => <td className="px-4 py-2 text-sm">{children}</td>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.content === nextProps.content
);

MemoizedMarkdown.displayName = 'MemoizedMarkdown';
