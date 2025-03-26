
import { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  inputRef?: React.RefObject<HTMLTextAreaElement>;
}

const ChatInput = ({ onSendMessage, isLoading, inputRef }: ChatInputProps) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    onSendMessage(input);
    setInput('');
    
    // Reset the textarea height
    if (inputRef?.current) {
      inputRef.current.style.height = 'auto';
    }
  };

  return (
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
  );
};

export default ChatInput;
