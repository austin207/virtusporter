// pages/Virtue.tsx
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from "@/integrations/supabase/client";
import { MemoizedMarkdown } from '@/components/chat/MemoizedMarkdown';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '@/components/chat/types';
import { ArrowUpIcon, BotIcon, SparklesIcon, CodeIcon, BookOpenIcon, HelpCircleIcon } from 'lucide-react';

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
          console.error('Error fetching conversation:', fetchError);
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
            console.error('Error fetching messages:', messageError);
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
            console.error('Error creating conversation:', createError);
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
              console.error('Error saving welcome message:', welcomeError);
            }
          }
        }
      } catch (error) {
        console.error('Error initializing conversation:', error);
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
      console.error('Error calling Gemini API:', error);
      const placeholderResponses = [
        "I'd be happy to tell you more about our autonomous porter robots designed for airports.",
        "VirtusCo specializes in creating tailored robotics solutions for businesses of all sizes.",
        "Our services include custom ROS development, robot prototyping, and full robotics implementation.",
        "Our team of talented engineers is dedicated to pushing the boundaries of autonomous robotics.",
        "Our mission is to bridge the gap between those with resources and those without, while building tailored robotic solutions."
      ];

      const randomResponse = placeholderResponses[Math.floor(Math.random() * placeholderResponses.length)];
      const botMessage: Message = { role: 'assistant', content: randomResponse };

      if (user && conversationId) {
        await supabase
          .from('chat_messages')
          .insert({
            conversation_id: conversationId,
            role: 'assistant',
            content: randomResponse
          });
      }

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
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-[#e5e7eb] px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1d1d1f] flex items-center justify-center">
              <BotIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-medium text-[#1d1d1f]">Virtue</span>
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#86868b] hidden sm:block">{user.email}</span>
                <div className="w-7 h-7 rounded-full bg-[#1d1d1f] flex items-center justify-center text-xs text-white font-medium">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Messages area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4">
          {/* Welcome state */}
          {showWelcome && (
            <div className="flex flex-col items-center justify-center pt-24 pb-8">
              <div className="w-12 h-12 rounded-full bg-[#1d1d1f] flex items-center justify-center mb-6">
                <BotIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] mb-2 text-center" style={{ letterSpacing: '-0.02em' }}>
                {greeting()}{user ? `, ${user.email?.split('@')[0]}` : ''}
              </h2>
              <p className="text-lg text-[#86868b] mb-12 text-center">How can I help you today?</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(s.text)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-[#e5e7eb] text-left hover:bg-[#f9fafb] transition-colors group"
                  >
                    <span className="text-[#86868b] group-hover:text-[#1d1d1f] transition-colors">{s.icon}</span>
                    <span className="text-sm text-[#3c3c43]">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message list */}
          {!showWelcome && (
            <div className="py-6 space-y-2">
              {messages.map((message, index) => (
                <div key={index}>
                  {message.role === 'assistant' ? (
                    <div className="flex gap-4 py-4">
                      <div className="w-7 h-7 rounded-full bg-[#1d1d1f] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <BotIcon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <MemoizedMarkdown
                          content={message.content}
                          id={`msg-${index}`}
                          variant="light"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end py-4">
                      <div className="bg-[#f5f5f7] px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                        <p className="text-sm text-[#1d1d1f]">{message.content}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 py-4">
                  <div className="w-7 h-7 rounded-full bg-[#1d1d1f] flex items-center justify-center flex-shrink-0">
                    <BotIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex items-center gap-1.5 pt-2">
                    <div className="w-1.5 h-1.5 bg-[#86868b] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-[#86868b] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-[#86868b] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input area */}
      <div className="flex-shrink-0 px-4 pb-4 pt-2">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#f5f5f7] rounded-2xl px-4 py-3 flex items-end gap-3">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
              }}
              placeholder="Ask Virtue anything..."
              className="flex-1 min-h-[24px] max-h-40 resize-none bg-transparent border-none py-1 text-sm text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-0"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                !input.trim() || isLoading
                  ? 'bg-[#d2d2d7] text-white'
                  : 'bg-[#1d1d1f] text-white hover:bg-[#424245]'
              }`}
            >
              <ArrowUpIcon className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-[#86868b] text-center mt-2">
            Virtue may display inaccurate info. Double-check important responses.
          </p>
        </div>
      </div>
    </div>
  );
}
