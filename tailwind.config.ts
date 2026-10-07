import type { Config } from "tailwindcss";

// Every colour is a CSS variable (RGB channels) defined in src/styles/theme.css.
// Switch the whole palette by changing data-palette on <html> in index.html.
const c = (v: string) => `rgb(var(--${v}) / <alpha-value>)`;

export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	prefix: "",
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)'],
				display: ['var(--font-sans)'],
				serif: ['var(--font-serif)'],
				mono: ['var(--font-mono)'],
			},
			colors: {
				// Brand tokens
				ink: { DEFAULT: c('ink'), 2: c('ink-2'), 3: c('ink-3') },
				paper: { DEFAULT: c('paper'), 2: c('paper-2'), 3: c('paper-3') },
				light: c('light'),
				soft: c('soft'),
				quiet: c('quiet'),
				mut: c('mut'),
				body: c('body'),
				cream: c('cream'),
				accent: {
					DEFAULT: c('accent'),
					hover: c('accent-hover'),
					ink: c('accent-text'),
					foreground: c('accent-fg'),
				},
				// shadcn tokens mapped onto the brand palette
				border: c('line'),
				input: c('line'),
				ring: c('accent'),
				background: c('paper'),
				foreground: c('ink'),
				primary: { DEFAULT: c('ink'), foreground: c('paper') },
				secondary: { DEFAULT: c('paper-2'), foreground: c('ink') },
				destructive: { DEFAULT: c('danger'), foreground: c('paper') },
				muted: { DEFAULT: c('paper-2'), foreground: c('body') },
				popover: { DEFAULT: c('paper'), foreground: c('ink') },
				card: { DEFAULT: c('card'), foreground: c('ink') },
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'var(--radius)',
				sm: 'var(--radius)',
			},
			spacing: {
				gutter: 'var(--gutter)',
			},
			maxWidth: {
				prose: '50ch',
				read: '700px',
			},
			letterSpacing: {
				label: '0.28em',
				tightest: '-0.03em',
			},
			transitionTimingFunction: {
				ox: 'cubic-bezier(.22,.61,.36,1)',
				wipe: 'cubic-bezier(.76,0,.24,1)',
				accordion: 'cubic-bezier(.4,0,.12,1)',
			},
			keyframes: {
				'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
				'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
				'fade-out': { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
				'caret-blink': { '0%,70%,100%': { opacity: '1' }, '20%,50%': { opacity: '0' } },
				'scroll-cue': { '0%': { transform: 'scaleY(0)', transformOrigin: 'top' }, '50%': { transform: 'scaleY(1)', transformOrigin: 'top' }, '51%': { transformOrigin: 'bottom' }, '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' } },
				'bounce-dot': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-4px)' } },
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'caret-blink': 'caret-blink 1.25s ease-out infinite',
				'scroll-cue': 'scroll-cue 2.2s cubic-bezier(.76,0,.24,1) infinite',
				'bounce-dot': 'bounce-dot 0.6s infinite',
				'bounce-dot-delay-1': 'bounce-dot 0.6s infinite 0.1s',
				'bounce-dot-delay-2': 'bounce-dot 0.6s infinite 0.2s',
			},
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
