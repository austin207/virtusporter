
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  isLoading?: boolean;
  href?: string;
  to?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    asChild = false,
    isLoading = false,
    href,
    to,
    children, 
    ...props 
  }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-virtus-primary disabled:opacity-50 disabled:pointer-events-none btn-hover-effect";
    
    const variantStyles = {
      primary: "bg-virtus-primary text-white hover:bg-virtus-primary/90",
      secondary: "bg-virtus-secondary text-white hover:bg-virtus-secondary/90",
      outline: "bg-transparent border border-virtus-primary text-virtus-primary hover:bg-virtus-primary/10",
      ghost: "bg-transparent text-virtus-primary hover:bg-virtus-primary/10",
      link: "bg-transparent text-virtus-primary underline-offset-4 hover:underline p-0",
    };
    
    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 rounded-full",
      md: "text-sm px-5 py-2 rounded-full",
      lg: "text-base px-6 py-3 rounded-full",
    };

    const classes = cn(
      baseStyles,
      variantStyles[variant],
      variant !== 'link' && sizeStyles[size],
      className
    );

    const content = (
      <>
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </>
    );

    if (href) {
      return (
        <a 
          href={href} 
          className={classes}
          target="_blank" 
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }

    if (to) {
      return (
        <Link to={to} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
