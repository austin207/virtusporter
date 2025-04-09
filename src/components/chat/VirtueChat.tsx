import { useState, useRef, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/context/AuthContext';
import { supabase } from "@/integrations/supabase/client";
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
  const [conversationId, setConversationId] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Load conversation for authenticated users
    const loadConversation = async () => {
      if (!user) return;
      
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
        console.error('Unexpected error:', error);
      }
    };
    
    loadConversation();
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
    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // If user is authenticated, save the message to Supabase
      if (user && conversationId) {
        await supabase
          .from('chat_messages')
          .insert({
            conversation_id: conversationId,
            role: 'user',
            content
          });
      }

      try {
        // Call the Supabase edge function instead of a direct API
        const { data, error } = await supabase.functions.invoke("generate-with-gemini", {
          body: { prompt: content }
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
        toast({
          title: "API Error",
          description: "Using fallback response system",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error in chat message handling:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message",
        variant: "destructive",
      });
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
        className={`bg-white rounded-2xl shadow-xl w-80 sm:w-96 overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-10 pointer-events-none hidden'
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
