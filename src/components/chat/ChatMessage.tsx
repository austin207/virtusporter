
import { Message } from './types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
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
  );
};

export default ChatMessage;
