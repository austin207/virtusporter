import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
				display: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				virtus: {
					primary: '#000000',
					secondary: '#32D74B',
					accent: '#ea384c',
					neutral: '#F2F2F7',
					dark: '#1C1C1E',
					red: '#ea384c',
					'red-dark': '#d02336',
					'red-light': '#f15d6d',
				},
				// Grok-like dark theme colors
				grok: {
					bg: '#111111',
					card: '#1E1E1E',
					input: '#2D2D2D',
					border: '#333333',
					action: '#444444',
					actionHover: '#555555',
					text: {
						primary: '#FFFFFF',
						secondary: '#AAAAAA',
						muted: '#777777',
					}
				},
                // Chatbot specific colors
                chatbot: {
                    bg: '#000000',
                    header: '#000000',
                    userBubble: '#000000',
                    userText: '#FFFFFF',
                    botBubble: '#F2F2F7',
                    botText: '#000000',
                    inputBg: '#FFFFFF',
                    inputText: '#666666',
                    inputBorder: '#E0E0E0',
                    loadingDot: '#CCCCCC',
                }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out': {
					'0%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(10px)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'gradient-x': {
					'0%, 100%': {
						'background-position': '0% 50%'
					},
					'50%': {
						'background-position': '100% 50%'
					}
				},
				'shimmer': {
					'100%': {
						'transform': 'translateX(100%)'
					}
				},
				'typing': {
					'0%': { width: '0' },
					'100%': { width: '100%' }
				},
				'blink': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' }
				},
				'bounce-in': {
					'0%': { transform: 'scale(0)' },
					'80%': { transform: 'scale(1.1)' },
					'100%': { transform: 'scale(1)' }
				},
                'bounce-dot': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-4px)' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-right': 'slide-out-right 0.3s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'gradient-x': 'gradient-x 15s ease infinite',
				'shimmer': 'shimmer 2s infinite',
				'typing': 'typing 3.5s steps(40, end)',
				'blink': 'blink 1s step-end infinite',
				'bounce-in': 'bounce-in 0.5s ease-out',
                'bounce-dot': 'bounce-dot 0.6s infinite',
                'bounce-dot-delay-1': 'bounce-dot 0.6s infinite 0.1s',
                'bounce-dot-delay-2': 'bounce-dot 0.6s infinite 0.2s'
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(20px)'
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '100%',
						color: 'var(--foreground)',
						a: {
							color: 'var(--primary)',
							'&:hover': {
								color: 'var(--primary-foreground)',
							},
						},
						h1: {
							color: 'var(--foreground)',
						},
						h2: {
							color: 'var(--foreground)',
						},
						h3: {
							color: 'var(--foreground)',
						},
						h4: {
							color: 'var(--foreground)',
						},
						code: {
							color: 'var(--foreground)',
							backgroundColor: 'var(--muted)',
							borderRadius: '0.25rem',
							padding: '0.15rem 0.3rem',
						},
						pre: {
							backgroundColor: 'var(--card)',
							borderRadius: '0.5rem',
						},
					},
				},
				// Styles for dark mode
				invert: {
					css: {
						color: 'white',
						a: {
							color: '#ea384c',
							'&:hover': {
								color: '#f15d6d',
							},
						},
						h1: {
							color: 'white',
						},
						h2: {
							color: 'white',
						},
						h3: {
							color: 'white',
						},
						h4: {
							color: 'white',
						},
						strong: {
							color: 'white',
						},
						code: {
							color: 'white',
							backgroundColor: '#2D2D2D',
							borderRadius: '0.25rem',
							padding: '0.15rem 0.3rem',
						},
						pre: {
							backgroundColor: '#1E1E1E',
							color: 'white',
							borderRadius: '0.5rem',
						},
						blockquote: {
							color: '#AAAAAA',
							borderLeftColor: '#333333',
						},
						hr: {
							borderColor: '#333333',
						},
						ol: {
							li: {
								'&::marker': {
									color: '#AAAAAA',
								},
							},
						},
						ul: {
							li: {
								'&::marker': {
									color: '#AAAAAA',
								},
							},
						},
						table: {
							thead: {
								borderBottomColor: '#333333',
								th: {
									color: 'white',
								},
							},
							tbody: {
								tr: {
									borderBottomColor: '#333333',
								},
							},
						},
					},
				},
                // Styles specifically for chatbot markdown content
                chatbot: {
                    css: {
                        color: '#000000',
                        backgroundColor: 'transparent',
                        fontSize: '0.9rem',
                        lineHeight: '1.4',
                        a: {
                            color: '#ea384c',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        },
                        strong: {
                            fontWeight: '600',
                        },
                        code: {
                            backgroundColor: 'rgba(0,0,0,0.05)',
                            padding: '0.1rem 0.3rem',
                            borderRadius: '0.25rem',
                            fontSize: '0.85em',
                        },
                        pre: {
                            padding: '0.75rem',
                            backgroundColor: 'rgba(0,0,0,0.05)',
                            borderRadius: '0.375rem',
                            overflow: 'auto',
                            code: {
                                backgroundColor: 'transparent',
                                padding: '0',
                            }
                        },
                    }
                }
			},
            // Specific utility classes for chatbot
            spacing: {
                'chat-input-height': '44px',
                'chat-header-height': '56px',
            },
            boxShadow: {
                'chat-bubble': '0 1px 2px rgba(0,0,0,0.1)',
                'chat-window': '0 4px 20px rgba(0,0,0,0.15)',
            },
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
