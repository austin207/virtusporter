import { useState, useRef, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { VirtueChatClient } from "@/lib/VirtueChatClient";
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import { Message } from './types';
import { offlineAnswer } from '@/lib/offlineAnswer';
import { MemoizedMarkdown } from './MemoizedMarkdown'; // Import markdown renderer

// Initialize the client once (singleton pattern)
const chatClient = new VirtueChatClient();

const VirtueChat = ({ defaultOpen = false }: { defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hi there! I\'m Virtue, VirtusCo\'s AI assistant. How can I help you today?' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus the message box when the panel opens; Escape closes it
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  // Keep the newest message in view (scrolls only the panel, never the page)
  useEffect(() => {
    const el = listRef.current;
    if (el && isOpen) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading, isOpen]);
  const { user } = useAuth();

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const { conversationId: chatId, messages: chatHistory } = 
          await chatClient.initializeConversation(user?.id);
        
        setConversationId(chatId);
        
        if (chatHistory && chatHistory.length > 0) {
          setMessages(chatHistory);
        }
      } catch (error) {
        console.warn('Failed to initialize chat:', error);
      }
    };
    
    initializeChat();
  }, [user]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await chatClient.sendMessage({
        conversationId: conversationId as string,
        message: content,
        userId: user?.id
      });
      
      if (response.error) throw new Error(response.errorDetails || 'Unknown error');
      
      const botMessage: Message = { 
        role: 'assistant', 
        content: response.message
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.warn('Error in chat message handling:', error);
      // Backend unreachable: say so honestly (never fabricate an AI reply).
      const botMessage: Message = { role: 'assistant', content: offlineAnswer(content) };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[45] flex flex-col items-end">
      {!isOpen && (
        <button
          type="button"
          onClick={toggleChat}
          className="flex h-14 w-14 items-center justify-center bg-accent text-accent-foreground transition-colors hover:bg-accent-hover"
          aria-label="Open chat"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      )}

      <div
        role="dialog"
        aria-label="Virtue chat"
        className={`on-dark flex w-[calc(100vw-40px)] max-w-[384px] flex-col overflow-hidden border border-light/15 bg-ink text-light transition-all duration-300 ${
          isOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none hidden translate-y-10 opacity-0'
        }`}
        style={{ maxHeight: 'calc(100svh - 100px)' }}
      >
        <ChatHeader onClose={toggleChat} />
        <div ref={listRef} className="overflow-y-auto p-4" style={{ maxHeight: '400px' }} data-lenis-prevent>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' ? (
                  <div className="max-w-[92%]">
                    <MemoizedMarkdown
                      content={message.content}
                      id={`msg-${index}`}
                      variant="dark"
                    />
                  </div>
                ) : (
                  <div className="max-w-[80%] whitespace-pre-wrap bg-paper-2 px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-ink">
                    {message.content}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start" role="status" aria-label="Virtue is typing">
                <div className="flex items-center gap-1.5 py-2">
                  <div className="h-1.5 w-1.5 animate-bounce bg-soft" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-1.5 w-1.5 animate-bounce bg-soft" style={{ animationDelay: '150ms' }}></div>
                  <div className="h-1.5 w-1.5 animate-bounce bg-soft" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} inputRef={inputRef} />
      </div>
    </div>
  );
};

export default VirtueChat;
