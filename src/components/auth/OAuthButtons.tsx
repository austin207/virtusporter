
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

type OAuthButtonsProps = {
  onOAuthSignIn: (provider: 'google' | 'github' | 'facebook') => Promise<void>;
};

const OAuthButtons = ({ onOAuthSignIn }: OAuthButtonsProps) => {
  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            Or continue with
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => onOAuthSignIn('google')}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <FaGoogle className="h-5 w-5 text-red-500" />
        </button>
        <button
          type="button"
          onClick={() => onOAuthSignIn('github')}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <FaGithub className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => onOAuthSignIn('facebook')}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <FaFacebook className="h-5 w-5 text-blue-600" />
        </button>
      </div>
    </div>
  );
};

export default OAuthButtons;
