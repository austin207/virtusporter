// pages/Virtue.tsx
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { offlineAnswer } from '@/lib/offlineAnswer';
import { supabase } from "@/integrations/supabase/client";
import { MemoizedMarkdown } from '@/components/chat/MemoizedMarkdown';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '@/components/chat/types';
import { ArrowUpIcon, SparklesIcon, CodeIcon, BookOpenIcon, HelpCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/layout/Logo';
import Seo from '@/seo/Seo';

export default function Virtue() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi there! I\'m Virtue, VirtusCo\'s AI assistant. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const initializeConversation = async () => {
      if (!user) {
        setConversationId(uuidv4());
        return;
      }

      try {
        const { data: existingConversation, error: fetchError } = await supabase
          .from('chat_conversations')
          .select('id')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          console.warn('Error fetching conversation:', fetchError);
          return;
        }

        if (existingConversation) {
          setConversationId(existingConversation.id);

          const { data: messageData, error: messageError } = await supabase
            .from('chat_messages')
            .select('*')
            .eq('conversation_id', existingConversation.id)
            .order('created_at', { ascending: true });

          if (messageError) {
            console.warn('Error fetching messages:', messageError);
            return;
          }

          if (messageData && messageData.length > 0) {
            setMessages(messageData.map(msg => ({
              role: msg.role as 'user' | 'assistant',
              content: msg.content
            })));
          }
        } else {
          const { data: newConversation, error: createError } = await supabase
            .from('chat_conversations')
            .insert({ user_id: user.id })
            .select()
            .single();

          if (createError) {
            console.warn('Error creating conversation:', createError);
            return;
          }

          if (newConversation) {
            setConversationId(newConversation.id);

            const { error: welcomeError } = await supabase
              .from('chat_messages')
              .insert({
                conversation_id: newConversation.id,
                role: 'assistant',
                content: messages[0].content
              });

            if (welcomeError) {
              console.warn('Error saving welcome message:', welcomeError);
            }
          }
        }
      } catch (error) {
        console.warn('Error initializing conversation:', error);
      }
    };

    initializeConversation();
  }, [user]);

  const handleSendMessage = async (content?: string) => {
    const messageText = content || input;
    if (!messageText.trim()) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      if (user && conversationId) {
        await supabase
          .from('chat_messages')
          .insert({
            conversation_id: conversationId,
            role: 'user',
            content: messageText
          });
      }

      const { data, error } = await supabase.functions.invoke("generate-with-gemini", {
        body: {
          prompt: messageText,
          context: messages.slice(-5).map(m => `${m.role}: ${m.content}`).join('\n')
        }
      });

      if (error) {
        throw new Error(`Error: ${error.message}`);
      }

      const botMessage: Message = {
        role: 'assistant',
        content: data?.generatedText || "I'm sorry, I couldn't generate a response at the moment."
      };

      if (user && conversationId) {
        await supabase
          .from('chat_messages')
          .insert({
            conversation_id: conversationId,
            role: 'assistant',
            content: botMessage.content
          });
      }

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.warn('Error calling Gemini API:', error);
      // Backend unreachable: say so honestly (never fabricate an AI reply). Not persisted.
      const botMessage: Message = { role: 'assistant', content: offlineAnswer(messageText) };

      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    { icon: <SparklesIcon className="w-4 h-4" />, label: "What does VirtusCo do?", text: "What does VirtusCo do?" },
    { icon: <CodeIcon className="w-4 h-4" />, label: "Tell me about the porter robot", text: "Tell me about the autonomous porter robot and its features" },
    { icon: <BookOpenIcon className="w-4 h-4" />, label: "Your services", text: "What services does VirtusCo offer?" },
    { icon: <HelpCircleIcon className="w-4 h-4" />, label: "How to get started", text: "How can I get a demo or consultation?" },
  ];

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const showWelcome = messages.length === 1;

  return (
    <div data-tone="dark" className="on-dark flex h-svh flex-col bg-ink text-light">
      <Seo
        path="/virtue"
        title="Virtue: VirtusCo AI Assistant"
        description="Chat with Virtue, VirtusCo's AI assistant, about our robotics services, the autonomous porter robot and how to get a demo or consultation."
        noindex
      />

      {/* Header */}
      <header className="flex-shrink-0 border-b border-light/15">
        <div className="flex items-center justify-between gap-4 px-[var(--gutter-hero)] py-4">
          <div className="flex items-center gap-4">
            <Link to="/" aria-label="VirtusCo home" className="text-light">
              <Logo />
            </Link>
            <span aria-hidden className="h-5 w-px bg-light/20" />
            <span className="eyebrow flex items-center gap-2 text-soft">
              <span aria-hidden className="inline-block h-[7px] w-[7px] bg-accent" />
              Virtue
            </span>
          </div>
          <div className="flex items-center gap-5">
            <Link
              to="/"
              className="group hidden items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-soft transition-colors hover:text-light sm:inline-flex"
            >
              <span aria-hidden className="inline-block transition-transform group-hover:-translate-x-1">
                ←
              </span>
              Back to site
            </Link>
            {user && (
              <div className="flex items-center gap-2">
                <span className="hidden font-mono text-[11px] tracking-wide text-quiet md:block">{user.email}</span>
                <div className="flex h-7 w-7 items-center justify-center border border-light/25 font-mono text-[11px] text-light">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Messages area */}
      <main className="flex-1 overflow-y-auto" data-lenis-prevent>
        <div className="mx-auto max-w-3xl px-5">
          {/* Welcome state */}
          {showWelcome && (
            <div className="flex flex-col pb-8 pt-[clamp(48px,14vh,140px)]">
              <p className="eyebrow mb-6 text-quiet">VirtusCo AI assistant</p>
              <h1 className="h-hero text-light">
                {greeting()}{user ? `, ${user.email?.split('@')[0]}` : ''}
              </h1>
              <p className="lede mt-4 text-quiet">How can I help you today?</p>

              <div className="mt-12 grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSendMessage(s.text)}
                    className="group flex items-center gap-3 border border-light/20 px-4 py-4 text-left font-mono text-[12px] uppercase leading-snug tracking-[0.08em] text-soft transition-colors hover:border-light hover:bg-light hover:text-ink"
                  >
                    <span className="text-quiet transition-colors group-hover:text-ink">{s.icon}</span>
                    <span className="flex-1">{s.label}</span>
                    <span aria-hidden className="arw">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message list */}
          {!showWelcome && (
            <div className="space-y-2 py-8">
              {messages.map((message, index) => (
                <div key={index}>
                  {message.role === 'assistant' ? (
                    <div className="py-4">
                      <p className="mono-tag mb-3 flex items-center gap-2 text-quiet">
                        <span aria-hidden className="inline-block h-[6px] w-[6px] bg-accent" />
                        Virtue
                      </p>
                      <MemoizedMarkdown
                        content={message.content}
                        id={`msg-${index}`}
                        variant="dark"
                        className="text-[1.02rem]"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-end py-4">
                      <div className="max-w-[80%] bg-paper-2 px-5 py-4">
                        <p className="whitespace-pre-wrap text-[0.95rem] leading-relaxed text-ink">{message.content}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="py-4" role="status" aria-label="Virtue is typing">
                  <p className="mono-tag mb-3 flex items-center gap-2 text-quiet">
                    <span aria-hidden className="inline-block h-[6px] w-[6px] bg-accent" />
                    Virtue
                  </p>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 animate-bounce bg-soft" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-1.5 w-1.5 animate-bounce bg-soft" style={{ animationDelay: '150ms' }}></div>
                    <div className="h-1.5 w-1.5 animate-bounce bg-soft" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input area */}
      <div className="flex-shrink-0 px-5 pb-5 pt-2">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-end gap-3 border border-light/20 bg-ink-2 py-2 pl-4 pr-2 transition-colors focus-within:border-accent">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
              }}
              aria-label="Message Virtue"
              placeholder="Ask Virtue anything..."
              className="max-h-40 min-h-[24px] flex-1 resize-none border-none bg-transparent py-2 text-[0.95rem] text-light placeholder:text-quiet focus:outline-none focus:ring-0"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button
              type="button"
              aria-label="Send message"
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-accent text-accent-foreground transition-colors hover:bg-accent-hover disabled:bg-ink-3 disabled:text-quiet"
            >
              <ArrowUpIcon className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-3 text-center font-mono text-[10.5px] tracking-wide text-quiet">
            Virtue may display inaccurate info. Double-check important responses.
          </p>
        </div>
      </div>
    </div>
  );
}
