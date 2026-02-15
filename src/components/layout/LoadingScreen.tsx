
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + (100 - prevProgress) * 0.1;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);

    // When progress reaches 100, start fade out animation
    if (progress === 100) {
      const fadeTimeout = setTimeout(() => {
        setShowContent(false);
      }, 500);

      return () => {
        clearInterval(timer);
        clearTimeout(fadeTimeout);
      };
    }

    return () => clearInterval(timer);
  }, [progress]);

  // Don't render component when animation is complete
  if (!showContent) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-black",
        progress === 100 ? "animate-fade-out" : ""
      )}
    >
      <div className="w-full max-w-md px-4 space-y-12">
        {/* Brand Name */}
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight" style={{ letterSpacing: '-0.04em' }}>
            VirtusCo
          </h1>
        </div>

        {/* Thin progress bar */}
        <div className="w-48 mx-auto">
          <div className="h-[2px] bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-200 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
