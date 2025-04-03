
import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { LoaderCircle } from "lucide-react";
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
      }, 500); // delay before starting fade out
      
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
        {/* Logo or Brand */}
        <div className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            Virtus<span className="text-virtus-red">Co</span>
          </h1>
          <p className="text-gray-400 text-sm">Intelligent Robot Assistant</p>
        </div>
        
        {/* Loading Animation */}
        <div className="relative">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <LoaderCircle className="w-12 h-12 text-virtus-red animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-white">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <Progress value={progress} className="h-1 bg-gray-800" indicatorClassName="bg-virtus-red" />
          
          {/* Hexagon Grid Animation */}
          <div className="absolute -z-10 inset-0 overflow-hidden opacity-30">
            <div className="hexagon-grid">
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={i}
                  className="hexagon" 
                  style={{ 
                    animationDelay: `${i * 0.1}s`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    backgroundColor: "#ea384c" // Red color
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Loading Message */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">Initializing <span className="text-virtus-red">VirtusCo</span> systems...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
