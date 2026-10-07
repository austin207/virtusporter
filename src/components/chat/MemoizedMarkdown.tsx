// components/chat/MemoizedMarkdown.tsx
import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
// PrismLight + a curated language set (robotics chat) instead of the full Prism bundle,
// and no KaTeX math pipeline: keeps the chat chunk small.
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import remarkGfm from 'remark-gfm';

Object.entries({ python, py: python, cpp, 'c++': cpp, c, bash, sh: bash, shell: bash, javascript, js: javascript, typescript, ts: typescript, json, yaml, yml: yaml, xml: markup, html: markup }).forEach(
  ([name, lang]) => SyntaxHighlighter.registerLanguage(name, lang),
);
import { cn } from '@/lib/utils';

// Define component props interface
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

/** Token classes per surface: `light` renders on paper, `dark` on ink. */
const tones = {
  light: {
    text: 'text-ink',
    body: 'text-body',
    line: 'border-ink/15',
    divide: 'divide-ink/15',
    codeBg: 'bg-paper-2',
    codeBar: 'bg-paper-3 text-body',
    copyBtn: 'bg-card text-body border border-ink/15 hover:bg-paper-2',
    link: 'text-ink hover:text-accent-ink',
    thead: 'bg-paper-2',
    blockBg: 'rgb(var(--paper-2))',
    blockLine: 'rgb(var(--ink) / 0.15)',
  },
  dark: {
    text: 'text-light',
    body: 'text-soft',
    line: 'border-light/15',
    divide: 'divide-light/15',
    codeBg: 'bg-light/10',
    codeBar: 'bg-ink-3 text-soft',
    copyBtn: 'bg-ink-3 text-light border border-light/15 hover:bg-ink-2',
    link: 'text-light hover:text-accent-ink',
    thead: 'bg-light/5',
    blockBg: 'rgb(var(--ink-2))',
    blockLine: 'rgb(var(--light) / 0.15)',
  },
} as const;

export const MemoizedMarkdown = memo(
  ({ content, id, variant = 'dark', className }: { content: string; id: string; variant?: 'light' | 'dark'; className?: string }) => {
    const isLight = variant === 'light';
    const t = tones[variant];

    return (
      <div
        data-md-id={id}
        className={cn('prose prose-sm max-w-none font-serif', isLight ? 'prose-neutral' : 'prose-invert', t.body, className)}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }: CodeProps) {
              const match = /language-(\w+)/.exec(className || '');

              return !inline && match ? (
                <div className="not-prose group relative my-4">
                  <div className={cn('mono-tag border border-b-0 px-3 py-2', t.line, t.codeBar)}>{match[1]}</div>
                  <SyntaxHighlighter
                    style={(isLight ? oneLight : oneDark) as any}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      border: `1px solid ${t.blockLine}`,
                      background: t.blockBg,
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                  <button
                    type="button"
                    aria-label="Copy code"
                    className={cn('absolute right-2 top-10 p-1.5 opacity-0 transition-opacity group-hover:opacity-100', t.copyBtn)}
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
                <code className={cn('px-1.5 py-0.5 font-mono text-[0.85em] before:content-none after:content-none', t.codeBg, t.text)} {...props}>
                  {children}
                </code>
              );
            },
            h1: ({ children }) => <h1 className={cn('mb-4 mt-6 border-b pb-2 font-sans text-2xl font-semibold', t.line, t.text)}>{children}</h1>,
            h2: ({ children }) => <h2 className={cn('mb-3 mt-5 border-b pb-2 font-sans text-xl font-semibold', t.line, t.text)}>{children}</h2>,
            h3: ({ children }) => <h3 className={cn('mb-2 mt-4 font-sans text-lg font-semibold', t.text)}>{children}</h3>,
            p: ({ children }) => <p className={cn('mb-3 leading-relaxed', t.body)}>{children}</p>,
            ul: ({ children }) => <ul className="mb-3 list-disc space-y-1 pl-6">{children}</ul>,
            ol: ({ children }) => <ol className="mb-3 list-decimal space-y-1 pl-6">{children}</ol>,
            li: ({ children }) => <li className={cn('mb-0.5', t.body)}>{children}</li>,
            a: ({ href, children }) => (
              <a href={href} className={cn('ulink', t.link)} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
            blockquote: ({ children }) => (
              <blockquote className={cn('my-3 border-l-2 border-accent pl-4 not-italic', t.body)}>{children}</blockquote>
            ),
            table: ({ children }) => (
              <div className="my-3 overflow-x-auto">
                <table className={cn('mb-0 min-w-full border', t.line)}>{children}</table>
              </div>
            ),
            thead: ({ children }) => <thead className={t.thead}>{children}</thead>,
            tbody: ({ children }) => <tbody className={cn('divide-y', t.divide)}>{children}</tbody>,
            tr: ({ children }) => <tr>{children}</tr>,
            th: ({ children }) => <th className={cn('border px-4 py-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.1em]', t.line, t.text)}>{children}</th>,
            td: ({ children }) => <td className={cn('border px-4 py-2 text-sm', t.line)}>{children}</td>,
            hr: () => <hr className={cn('my-4', t.line)} />,
            strong: ({ children }) => <strong className={cn('font-semibold', t.text)}>{children}</strong>,
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
