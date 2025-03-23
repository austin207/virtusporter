
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const VirtueChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hi there! I\'m Virtue, VirtusCo\'s AI assistant. How can I help you today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Add these variables to make the component respond without real API calls for now
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API response
    setTimeout(() => {
      const randomResponse = placeholderResponses[Math.floor(Math.random() * placeholderResponses.length)];
      const botMessage: Message = { role: 'assistant', content: randomResponse };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);

    // In a real implementation, we would call the Claude API here
    // For example:
    /*
    const fetchAIResponse = async (userInput: string) => {
      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'YOUR_CLAUDE_API_KEY',
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20240620',
            messages: messages.concat([userMessage]),
            max_tokens: 1024
          })
        });
        
        const data = await response.json();
        const botMessage: Message = { 
          role: 'assistant', 
          content: data.content[0].text 
        };
        
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error('Error fetching AI response:', error);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again later.' 
        }]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAIResponse(input);
    */
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle textarea height
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 bg-virtus-primary text-white'
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat window */}
      <div
        className={`bg-white rounded-2xl shadow-xl w-80 sm:w-96 overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
        }`}
        style={{ maxHeight: 'calc(100vh - 100px)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-virtus-primary text-white">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Virtue</h3>
          </div>
          <button
            onClick={toggleChat}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-virtus-primary text-white rounded-tr-none'
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3">
          <div className="flex items-end space-x-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              placeholder="Ask Virtue anything..."
              className="flex-1 max-h-32 resize-none border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-virtus-primary focus:border-transparent"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`p-2 rounded-lg ${
                !input.trim() || isLoading
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-virtus-primary text-white'
              }`}
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VirtueChat;
