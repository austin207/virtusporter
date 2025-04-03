
import React from 'react';
import { useAnimation, useMobileCheck } from '@/hooks/useAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
  triggerOnce?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 800,
  direction = 'up',
  threshold = 0.2,
  triggerOnce = true,
}) => {
  const { ref, isInView } = useAnimation({ threshold, triggerOnce });
  const isMobile = useMobileCheck();
  
  // For mobile devices, reduce motion or apply immediately
  if (isMobile) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }
  
  // Get the appropriate transform based on direction
  const getTransform = () => {
    if (!isInView) {
      switch (direction) {
        case 'up': return 'translateY(30px)';
        case 'down': return 'translateY(-30px)';
        case 'left': return 'translateX(30px)';
        case 'right': return 'translateX(-30px)';
        default: return 'translateY(30px)';
      }
    }
    return 'translate(0)';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
