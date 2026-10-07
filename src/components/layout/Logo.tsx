import { cn } from '@/lib/utils';

/*
 * The VirtusCo logo, from the owner's artwork (public/brand/*, cropped from the official PNG).
 * `tone` is the background the logo sits on: on dark surfaces the "-dark" files are used, where the
 * black spokes/letters are recoloured light (the red core is untouched) so the logo stays visible.
 */
type Tone = 'dark' | 'light';

export function LogoMark({ className, tone = 'dark' }: { className?: string; tone?: Tone }) {
  return (
    <img
      src={tone === 'dark' ? '/brand/virtusco-mark-dark-80.webp' : '/brand/virtusco-mark-80.webp'}
      alt=""
      aria-hidden
      width={70}
      height={80}
      decoding="async"
      className={cn('h-8 w-auto select-none', className)}
      draggable={false}
    />
  );
}

export function Logo({ className, wordmark = true, tone = 'dark' }: { className?: string; wordmark?: boolean; tone?: Tone }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark tone={tone} />
      {wordmark && (
        <>
          <img
            src={tone === 'dark' ? '/brand/virtusco-wordmark-dark.webp' : '/brand/virtusco-wordmark.webp'}
            alt="VirtusCo"
            width={147}
            height={28}
            decoding="async"
            className="h-[15px] w-auto select-none"
            draggable={false}
          />
        </>
      )}
    </span>
  );
}
