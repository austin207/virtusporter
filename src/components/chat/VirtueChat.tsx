import { useState, useRef, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/context/AuthContext';
import { VirtueChatClient } from "@/lib/VirtueChatClient";
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { Message } from './types';
import { MemoizedMarkdown } from './MemoizedMarkdown'; // Import markdown renderer

// Initialize the client once (singleton pattern)
const chatClient = new VirtueChatClient();

const VirtueChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hi there! I\'m Virtue, VirtusCo\'s AI assistant. How can I help you today?' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
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
        console.error('Failed to initialize chat:', error);
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
      console.error('Error in chat message handling:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message",
        variant: "destructive",
      });
      
      const placeholderResponses = [
        "I'd be happy to tell you more about our autonomous porter robots designed for airports.",
        "VirtusCo specializes in creating tailored robotics solutions for businesses of all sizes.",
        "Our services include custom ROS development, robot prototyping, and full robotics implementation.",
        "We're currently hiring for several positions! Check out our Careers page for more details.",
        "Our mission is to bridge the gap between those with resources and those without, while building tailored robotic solutions."
      ];
      
      const randomResponse = placeholderResponses[Math.floor(Math.random() * placeholderResponses.length)];
      const botMessage: Message = { role: 'assistant', content: randomResponse };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-virtus-primary text-white hover:bg-virtus-primary/90 transition-all"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      <div
        className={`bg-white dark:bg-gray-900 text-black dark:text-white rounded-2xl shadow-xl w-80 sm:w-96 overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-10 pointer-events-none hidden'
        }`}
        style={{ maxHeight: 'calc(100vh - 100px)' }}
      >
        <ChatHeader onClose={toggleChat} />
        <div className="p-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-virtus-primary text-white rounded-tr-none'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-none'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <MemoizedMarkdown 
                      content={message.content} 
                      id={`msg-${index}`} 
                    />
                  ) : (
                    <div>{message.content}</div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
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
