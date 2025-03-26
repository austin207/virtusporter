
import { useState, useRef, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { Message } from './types';

const VirtueChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hi there! I\'m Virtue, VirtusCo\'s AI assistant. How can I help you today?' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const placeholderResponses = [
    "I'd be happy to tell you more about our autonomous porter robots designed for airports.",
    "VirtusCo specializes in creating tailored robotics solutions for businesses of all sizes.",
    "Our services include custom ROS development, robot prototyping, and full robotics implementation.",
    "We're currently hiring for several positions! Check out our Careers page for more details.",
    "Our mission is to bridge the gap between those with resources and those without, while building tailored robotic solutions.",
    "I can help you navigate our website or provide detailed information about our products and services."
  ];

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleSendMessage = (content: string) => {
    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const randomResponse = placeholderResponses[Math.floor(Math.random() * placeholderResponses.length)];
      const botMessage: Message = { role: 'assistant', content: randomResponse };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      <button
        onClick={toggleChat}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 bg-virtus-primary text-white'
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      <div
        className={`bg-white rounded-2xl shadow-xl w-80 sm:w-96 overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
        }`}
        style={{ maxHeight: 'calc(100vh - 100px)' }}
      >
        <ChatHeader onClose={toggleChat} />
        <MessageList messages={messages} isLoading={isLoading} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} inputRef={inputRef} />
      </div>
    </div>
  );
};

export default VirtueChat;
