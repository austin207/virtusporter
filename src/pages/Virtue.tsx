// pages/Virtue.tsx
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from "@/integrations/supabase/client";
import { MemoizedMarkdown } from '@/components/chat/MemoizedMarkdown';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '@/components/layout/Navbar';
import { Message } from '@/components/chat/types';
import { ArrowUpIcon, BotIcon, SearchIcon, LightbulbIcon, BookOpenIcon, BarChartIcon, UserIcon } from 'lucide-react';



export default function Virtue() {
  <Navbar />
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
  const { user } = useAuth();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize or load conversation
  useEffect(() => {
    const initializeConversation = async () => {
      if (!user) {
        // For anonymous users, just generate a local ID
        setConversationId(uuidv4());
        return;
      }
      
      try {
        // Try to get the most recent conversation
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
          
          // Fetch messages for this conversation
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
          // Create a new conversation
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
            
            // Save the welcome message
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

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // If user is authenticated, save the message to Supabase
      if (user && conversationId) {
        await supabase
          .from('chat_messages')
          .insert({
            conversation_id: conversationId,
            role: 'user',
            content: input
          });
      }

      // Call the Supabase edge function for Gemini API
      const { data, error } = await supabase.functions.invoke("generate-with-gemini", {
        body: { 
          prompt: input,
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
      
      // If user is authenticated, save the assistant message to Supabase
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
      // Fallback to placeholder responses if API call fails
      const placeholderResponses = [
        "I'd be happy to tell you more about our autonomous porter robots designed for airports.",
        "VirtusCo specializes in creating tailored robotics solutions for businesses of all sizes.",
        "Our services include custom ROS development, robot prototyping, and full robotics implementation.",
        "We're currently hiring for several positions! Check out our Careers page for more details.",
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

  return (
    <div className="flex flex-col h-screen bg-[#1E1E1E] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BotIcon className="w-6 h-6 text-virtus-red" />
            <h1 className="text-xl font-semibold">Virtue AI</h1>
          </div>
          <div className="flex items-center space-x-2">
            {user && (
              <div className="w-8 h-8 rounded-full bg-virtus-red flex items-center justify-center">
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 container mx-auto p-4 overflow-hidden flex flex-col">
        {/* Welcome message */}
        {messages.length === 1 && (
          <div className="flex flex-col items-center justify-center text-center my-8">
            <h2 className="text-3xl font-bold mb-2">
              {`Good ${new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, ${user?.email?.split('@')[0] || 'there'}!`}
            </h2>
            <p className="text-xl text-gray-400 mb-8">How can I help you today?</p>
          </div>
        )}
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-6">
          {messages.length > 1 && messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-3xl p-4 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-virtus-primary text-white rounded-tr-none' 
                    : 'bg-gray-800 text-white rounded-tl-none'
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
              <div className="bg-gray-800 p-4 rounded-lg rounded-tl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Action buttons */}
        {messages.length === 1 && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg flex flex-col items-center text-center">
              <SearchIcon className="w-6 h-6 mb-2" />
              <span className="font-medium">Research</span>
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg flex flex-col items-center text-center">
              <LightbulbIcon className="w-6 h-6 mb-2" />
              <span className="font-medium">Think</span>
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg flex flex-col items-center text-center">
              <BookOpenIcon className="w-6 h-6 mb-2" />
              <span className="font-medium">How to</span>
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg flex flex-col items-center text-center">
              <BarChartIcon className="w-6 h-6 mb-2" />
              <span className="font-medium">Analyze</span>
            </button>
          </div>
        )}
        
        {/* Input area */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-3">
          <div className="flex items-end space-x-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What do you want to know?"
              className="flex-1 min-h-[60px] max-h-32 resize-none bg-gray-800 border-none rounded-lg py-3 px-4 focus:outline-none focus:ring-0 text-white placeholder-gray-400"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className={`p-3 rounded-lg ${
                !input.trim() || isLoading
                  ? 'bg-gray-700 text-gray-500'
                  : 'bg-virtus-red text-white hover:bg-virtus-red-dark'
              } flex items-center justify-center`}
            >
              <ArrowUpIcon className="w-5 h-5" />
            </button>
          </div>
          
          {/* Quick action buttons */}
          <div className="flex justify-center mt-3 space-x-6">
            <button className="text-gray-400 hover:text-white flex items-center space-x-1">
              <SearchIcon className="w-4 h-4" />
              <span className="text-sm">Research</span>
            </button>
            <button className="text-gray-400 hover:text-white flex items-center space-x-1">
              <LightbulbIcon className="w-4 h-4" />
              <span className="text-sm">Think</span>
            </button>
            <button className="text-gray-400 hover:text-white flex items-center space-x-1">
              <UserIcon className="w-4 h-4" />
              <span className="text-sm">Personas</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
