import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-light/15 px-4 py-3">
      <div className="flex items-center gap-2.5">
        <span aria-hidden className="inline-block h-[7px] w-[7px] bg-accent" />
        <h3 className="eyebrow text-light">Virtue</h3>
        <span className="mono-tag text-quiet">AI assistant</span>
      </div>
      <div className="flex items-center gap-1">
        <Link
          to="/virtue"
          className="px-2 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-quiet transition-colors hover:text-light"
        >
          Full screen
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center text-soft transition-colors hover:bg-light/10 hover:text-light"
          aria-label="Close chat"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
