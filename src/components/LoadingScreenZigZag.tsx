import { useEffect, useState } from 'react';

const LoadingScreen = ({ onFinishLoading }: { onFinishLoading: () => void }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stripsHidden, setStripsHidden] = useState([false, false, false, false, false]);

  useEffect(() => {
    // Simulate loading progress - faster now (increment by 2 instead of 1)
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 2; // Faster progress
        if (newProgress >= 100) {
          clearInterval(interval);
          // Start hiding strips animation immediately after loading completes
          setTimeout(() => {
            // Hide strips one by one with a shorter delay
            const stripDelay = 120; // Reduced delay between strips
            
            // Hide strips from bottom to top
            // Since we're positioning strips differently now, we want to hide them in order from bottom to top
            const stripOrder = [4, 3, 2, 1, 0];
            
            stripOrder.forEach((stripIndex, i) => {
              setTimeout(() => {
                setStripsHidden(prev => {
                  const newStrips = [...prev];
                  newStrips[stripIndex] = true;
                  return newStrips;
                });
                
                // When all strips are hidden, notify parent component
                if (i === stripOrder.length - 1) {
                  setTimeout(() => {
                    setLoading(false);
                    onFinishLoading();
                  }, 150); // Reduced final delay
                }
              }, stripDelay * i);
            });
          }, 200); // Reduced delay before starting animation
          return 100;
        }
        return newProgress;
      });
    }, 15); // Faster interval

    return () => clearInterval(interval);
  }, [onFinishLoading]);

  if (!loading) return null;

  // Define strip widths - middle ones are wider (used for visual reference)

  return (
    <div className="fixed inset-0 z-50">
      {/* Yellow strips - stacked in a zigzag pattern */}
      <div className="h-screen w-full relative overflow-hidden">
        {/* Create a zigzag pattern with strips of different widths */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-accent transition-transform ease-in-out ${stripsHidden[0] ? '-translate-y-full' : ''}`}
          style={{ height: '100vh', clipPath: 'polygon(0 80%, 100% 100%, 100% 100%, 0 100%)', transitionDelay: '0ms', transitionDuration: '500ms' }}
        />
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-accent transition-transform ease-in-out ${stripsHidden[1] ? '-translate-y-full' : ''}`}
          style={{ height: '100vh', clipPath: 'polygon(0 60%, 100% 80%, 100% 100%, 0 100%)', transitionDelay: '100ms', transitionDuration: '500ms' }}
        />
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-accent transition-transform ease-in-out ${stripsHidden[2] ? '-translate-y-full' : ''}`}
          style={{ height: '100vh', clipPath: 'polygon(0 30%, 100% 60%, 100% 100%, 0 100%)', transitionDelay: '200ms', transitionDuration: '500ms' }}
        />
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-accent transition-transform ease-in-out ${stripsHidden[3] ? '-translate-y-full' : ''}`}
          style={{ height: '100vh', clipPath: 'polygon(0 15%, 100% 30%, 100% 100%, 0 100%)', transitionDelay: '300ms', transitionDuration: '500ms' }}
        />
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-accent transition-transform ease-in-out ${stripsHidden[4] ? '-translate-y-full' : ''}`}
          style={{ height: '100vh', clipPath: 'polygon(0 0%, 100% 15%, 100% 100%, 0 100%)', transitionDelay: '400ms', transitionDuration: '500ms' }}
        />
      </div>

      {/* Loading content - positioned absolutely in center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-black mb-4">Knox</h1>
        <div className="w-64 h-1 bg-black/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-black rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
