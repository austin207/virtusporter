
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

type OAuthButtonsProps = {
  onOAuthSignIn: (provider: 'google' | 'github' | 'facebook') => Promise<void>;
};

const OAuthButtons = ({ onOAuthSignIn }: OAuthButtonsProps) => {
  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#d2d2d7]" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[#f5f5f7] text-[#86868b]">
            Or continue with
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => onOAuthSignIn('google')}
          className="inline-flex justify-center py-2.5 px-4 border border-[#d2d2d7] rounded-xl bg-white text-sm font-medium text-[#86868b] hover:bg-[#f5f5f7] transition-colors"
        >
          <FaGoogle className="h-5 w-5 text-[#1d1d1f]" />
        </button>
        <button
          type="button"
          onClick={() => onOAuthSignIn('github')}
          className="inline-flex justify-center py-2.5 px-4 border border-[#d2d2d7] rounded-xl bg-white text-sm font-medium text-[#86868b] hover:bg-[#f5f5f7] transition-colors"
        >
          <FaGithub className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => onOAuthSignIn('facebook')}
          className="inline-flex justify-center py-2.5 px-4 border border-[#d2d2d7] rounded-xl bg-white text-sm font-medium text-[#86868b] hover:bg-[#f5f5f7] transition-colors"
        >
          <FaFacebook className="h-5 w-5 text-[#1d1d1f]" />
        </button>
      </div>
    </div>
  );
};

export default OAuthButtons;
