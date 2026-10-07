import { useState } from 'react';
import { ArrowUp } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="border-t border-light/15 p-3">
      <div className="flex items-end gap-2 border border-light/20 bg-ink-2 py-1.5 pl-3 pr-1.5 transition-colors focus-within:border-accent">
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          aria-label="Message Virtue"
          placeholder="Ask Virtue anything..."
          className="max-h-32 flex-1 resize-none border-none bg-transparent py-1.5 text-[0.9rem] text-light placeholder:text-quiet focus:outline-none focus:ring-0"
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
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center bg-accent text-accent-foreground transition-colors hover:bg-accent-hover disabled:bg-ink-3 disabled:text-quiet"
          aria-label="Send message"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
