import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

type OAuthButtonsProps = {
  onOAuthSignIn: (provider: 'google' | 'github' | 'facebook') => Promise<void>;
};

const providers = [
  { id: 'google', label: 'Google', Icon: FaGoogle },
  { id: 'github', label: 'GitHub', Icon: FaGithub },
  { id: 'facebook', label: 'Facebook', Icon: FaFacebook },
] as const;

const OAuthButtons = ({ onOAuthSignIn }: OAuthButtonsProps) => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span aria-hidden className="h-px flex-1 bg-ink/15" />
        <span className="eyebrow text-quiet">Or continue with</span>
        <span aria-hidden className="h-px flex-1 bg-ink/15" />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2">
        {providers.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            aria-label={`Continue with ${label}`}
            onClick={() => onOAuthSignIn(id)}
            className="inline-flex h-11 items-center justify-center gap-2 border border-ink/20 bg-transparent font-mono text-[11px] uppercase tracking-[0.1em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OAuthButtons;
