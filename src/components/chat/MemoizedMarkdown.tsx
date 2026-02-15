// components/chat/MemoizedMarkdown.tsx
import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
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
  ({ content, id, variant = 'dark' }: { content: string; id: string; variant?: 'light' | 'dark' }) => {
    const isLight = variant === 'light';

    return (
      <div className={`prose prose-sm max-w-none ${isLight ? 'prose-neutral' : 'prose-invert'}`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            code({ node, inline, className, children, ...props }: CodeProps) {
              const match = /language-(\w+)/.exec(className || '');

              return !inline && match ? (
                <div className="relative group my-4">
                  <div className={`text-xs px-3 py-1.5 font-mono ${isLight ? 'bg-[#f6f8fa] text-[#57606a] border border-[#d0d7de] rounded-t-lg' : 'bg-gray-700 text-gray-400 rounded-t-md'}`}>
                    {match[1]}
                  </div>
                  <SyntaxHighlighter
                    style={(isLight ? oneLight : oneDark) as any}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      ...(isLight ? { border: '1px solid #d0d7de', borderTop: 'none', background: '#f6f8fa' } : {}),
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                  <button
                    className={`absolute top-10 right-2 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity ${isLight ? 'bg-white text-[#57606a] border border-[#d0d7de] hover:bg-[#f3f4f6]' : 'bg-gray-700 text-white'}`}
                    onClick={() => {
                      navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
              ) : (
                <code className={`rounded px-1.5 py-0.5 text-sm ${isLight ? 'bg-[#eff1f3] text-[#1f2328]' : 'bg-gray-700'}`} {...props}>
                  {children}
                </code>
              );
            },
            h1: ({ children }) => <h1 className={`text-2xl font-semibold mt-6 mb-4 pb-2 border-b ${isLight ? 'border-[#d0d7de] text-[#1f2328]' : 'border-gray-700'}`}>{children}</h1>,
            h2: ({ children }) => <h2 className={`text-xl font-semibold mt-5 mb-3 pb-2 border-b ${isLight ? 'border-[#d0d7de] text-[#1f2328]' : 'border-gray-700'}`}>{children}</h2>,
            h3: ({ children }) => <h3 className={`text-lg font-semibold mt-4 mb-2 ${isLight ? 'text-[#1f2328]' : ''}`}>{children}</h3>,
            p: ({ children }) => <p className={`mb-3 leading-relaxed ${isLight ? 'text-[#1f2328]' : ''}`}>{children}</p>,
            ul: ({ children }) => <ul className="list-disc pl-6 mb-3 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-6 mb-3 space-y-1">{children}</ol>,
            li: ({ children }) => <li className="mb-0.5">{children}</li>,
            a: ({ href, children }) => (
              <a href={href} className={`hover:underline ${isLight ? 'text-[#0969da]' : 'text-virtus-red'}`} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
            blockquote: ({ children }) => (
              <blockquote className={`border-l-4 pl-4 my-3 ${isLight ? 'border-[#d0d7de] text-[#656d76]' : 'border-gray-600 italic'}`}>{children}</blockquote>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-3">
                <table className={`min-w-full mb-0 ${isLight ? 'border border-[#d0d7de]' : 'divide-y divide-gray-700'}`}>{children}</table>
              </div>
            ),
            thead: ({ children }) => <thead className={isLight ? 'bg-[#f6f8fa]' : 'bg-gray-700'}>{children}</thead>,
            tbody: ({ children }) => <tbody className={`divide-y ${isLight ? 'divide-[#d0d7de]' : 'divide-gray-700'}`}>{children}</tbody>,
            tr: ({ children }) => <tr>{children}</tr>,
            th: ({ children }) => <th className={`px-4 py-2 text-left text-sm font-semibold ${isLight ? 'text-[#1f2328] border border-[#d0d7de]' : 'text-gray-200'}`}>{children}</th>,
            td: ({ children }) => <td className={`px-4 py-2 text-sm ${isLight ? 'border border-[#d0d7de]' : ''}`}>{children}</td>,
            hr: () => <hr className={`my-4 ${isLight ? 'border-[#d0d7de]' : 'border-gray-700'}`} />,
            strong: ({ children }) => <strong className={`font-semibold ${isLight ? 'text-[#1f2328]' : ''}`}>{children}</strong>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.content === nextProps.content && prevProps.variant === nextProps.variant
);

MemoizedMarkdown.displayName = 'MemoizedMarkdown';
