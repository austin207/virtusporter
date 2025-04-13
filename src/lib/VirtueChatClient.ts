import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";
import { Message } from '@/components/chat/types';

interface ChatResponse {
  conversationId: string;
  message: string;
  messages?: Message[];
  error?: boolean;
  errorDetails?: string;
}

interface SendMessageOptions {
  conversationId: string;
  message: string;
  userId?: string;
}

interface ConversationResponse {
  conversationId: string;
  messages: Message[];
}

export class VirtueChatClient {
  private conversations: Map<string, { messages: Message[] }>;
  private retryCount: number = 2;

  constructor() {
    this.conversations = new Map();
  }

  /**
   * Initialize a conversation for a user
   */
  async initializeConversation(userId?: string): Promise<ConversationResponse> {
    // For anonymous users, create an in-memory conversation
    if (!userId) {
      const conversationId = uuidv4();
      const welcomeMessage: Message = {
        role: 'assistant',
        content: 'Hi there! I\'m Virtue, VirtusCo\'s AI assistant. How can I help you today?'
      };
      
      this.conversations.set(conversationId, {
        messages: [welcomeMessage]
      });
      
      return {
        conversationId,
        messages: [welcomeMessage]
      };
    }
    
    try {
      // Try to get the most recent conversation
      const { data: existingConversation, error: fetchError } = await supabase
        .from('chat_conversations')
        .select('id')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching conversation:', fetchError);
        throw new Error('Failed to fetch existing conversations');
      }
      
      if (existingConversation) {
        // Fetch messages for this conversation
        const { data: messageData, error: messageError } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('conversation_id', existingConversation.id)
          .order('created_at', { ascending: true });
          
        if (messageError) {
          console.error('Error fetching messages:', messageError);
          throw new Error('Failed to fetch messages');
        }
        
        const messages = messageData && messageData.length > 0
          ? messageData.map(msg => ({
              role: msg.role as 'user' | 'assistant',
              content: msg.content
            }))
          : [{
              role: 'assistant' as const,
              content: 'Hi there! I\'m Virtue, VirtusCo\'s AI assistant. How can I help you today?'
            }];
        
        // Store in memory
        this.conversations.set(existingConversation.id, { messages });
            
        return {
          conversationId: existingConversation.id,
          messages
        };
      } else {
        // Create a new conversation
        const { data: newConversation, error: createError } = await supabase
          .from('chat_conversations')
          .insert({ user_id: userId })
          .select()
          .single();
          
        if (createError) {
          console.error('Error creating conversation:', createError);
          throw new Error('Failed to create new conversation');
        }
        
        const welcomeMessage: Message = {
          role: 'assistant',
          content: 'Hi there! I\'m Virtue, VirtusCo\'s AI assistant. How can I help you today?'
        };
        
        // Save the welcome message
        const { error: welcomeError } = await supabase
          .from('chat_messages')
          .insert({
            conversation_id: newConversation.id,
            role: 'assistant',
            content: welcomeMessage.content
          });
          
        if (welcomeError) {
          console.error('Error saving welcome message:', welcomeError);
        }
        
        // Store in memory
        this.conversations.set(newConversation.id, {
          messages: [welcomeMessage]
        });
        
        return {
          conversationId: newConversation.id,
          messages: [welcomeMessage]
        };
      }
    } catch (error) {
      console.error('Error initializing conversation:', error);
      
      // Fallback to in-memory conversation
      const conversationId = uuidv4();
      const welcomeMessage: Message = {
        role: 'assistant',
        content: 'Hi there! I\'m Virtue, VirtusCo\'s AI assistant. How can I help you today?'
      };
      
      this.conversations.set(conversationId, {
        messages: [welcomeMessage]
      });
      
      return {
        conversationId,
        messages: [welcomeMessage]
      };
    }
  }

  /**
   * Send a message and get a response
   */
  async sendMessage(options: SendMessageOptions): Promise<ChatResponse> {
    const { conversationId, message, userId } = options;
    
    if (!conversationId || !this.conversations.has(conversationId)) {
      return {
        conversationId,
        error: true,
        message: "Invalid conversation",
        errorDetails: 'Conversation not found or expired'
      };
    }
    
    try {
      const conversation = this.conversations.get(conversationId);
      if (!conversation) {
        throw new Error('Conversation not found in memory');
      }
      
      // Add user message to in-memory conversation
      conversation.messages.push({
        role: 'user',
        content: message
      });
      
      // Save message to database if authenticated
      if (userId) {
        await supabase
          .from('chat_messages')
          .insert({
            conversation_id: conversationId,
            role: 'user',
            content: message
          });
      }
      
      // Get conversational context for better responses
      const conversationContext = conversation.messages
        .slice(-5) // Last 5 messages for context
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');
      
      // Call the Gemini API with retry logic
      let apiResponse = null;
      let apiError = null;
      
      for (let attempt = 0; attempt <= this.retryCount; attempt++) {
        try {
          const { data, error } = await supabase.functions.invoke("generate-with-gemini", {
            body: { 
              prompt: message,
              context: conversationContext
            }
          });
          
          if (error) throw new Error(error.message);
          
          apiResponse = data;
          break; // Success, exit retry loop
        } catch (err) {
          console.error(`API call attempt ${attempt + 1} failed:`, err);
          apiError = err;
          
          // Only wait if we're going to retry
          if (attempt < this.retryCount) {
            await new Promise(r => setTimeout(r, 1000 * attempt)); // Exponential backoff
          }
        }
      }
      
      if (!apiResponse && apiError) {
        throw apiError;
      }
      
      // Handle the response
      const generatedText = apiResponse?.generatedText || 
                            "I'm sorry, I couldn't process your request at the moment.";
      
      // Add AI response to in-memory conversation
      conversation.messages.push({
        role: 'assistant',
        content: generatedText
      });
      
      // Save AI response to database if authenticated
      if (userId) {
        await supabase
          .from('chat_messages')
          .insert({
            conversation_id: conversationId,
            role: 'assistant',
            content: generatedText
          });
      }
      
      return {
        conversationId,
        message: generatedText,
        messages: [...conversation.messages]
      };
    } catch (error) {
      console.error('Error in sendMessage:', error);
      return {
        conversationId,
        error: true,
        message: "I encountered an error processing your request. Please try again.",
        errorDetails: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Clear a conversation history
   */
  async clearConversation(conversationId: string, userId?: string): Promise<boolean> {
    try {
      // Reset in-memory conversation
      if (this.conversations.has(conversationId)) {
        const welcomeMessage: Message = {
          role: 'assistant',
          content: 'Hi there! I\'m Virtue, VirtusCo\'s AI assistant. How can I help you today?'
        };
        
        this.conversations.set(conversationId, {
          messages: [welcomeMessage]
        });
      }
      
      // Clear database conversation if authenticated
      if (userId) {
        await supabase
          .from('chat_messages')
          .delete()
          .eq('conversation_id', conversationId);
          
        // Add welcome message back
        await supabase
          .from('chat_messages')
          .insert({
            conversation_id: conversationId,
            role: 'assistant',
            content: 'Hi there! I\'m Virtue, VirtusCo\'s AI assistant. How can I help you today?'
          });
      }
      
      return true;
    } catch (error) {
      console.error('Error clearing conversation:', error);
      return false;
    }
  }
}
