import { Bot, X } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-virtus-primary text-white">
      <div className="flex items-center space-x-2">
        <Bot className="w-5 h-5" />
        <h3 className="font-semibold text-lg">Virtue</h3>
      </div>
      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Close chat"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ChatHeader;
