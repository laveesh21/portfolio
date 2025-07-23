import { useEffect, useState } from 'react';

const LoadingScreen = ({ onFinishLoading }: { onFinishLoading: () => void }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setAnimationStarted(true);
            setTimeout(() => {
              setLoading(false);
              onFinishLoading();
            }, 1500);
          }, 200);
          return 100;
        }
        return newProgress;
      });
    }, 15);

    return () => clearInterval(interval);
  }, [onFinishLoading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      <div className="h-screen w-full flex relative overflow-hidden">
        <div 
          className="h-full bg-accent transition-transform duration-700 ease-in-out"
          style={{ 
            width: '15%',
            transform: animationStarted ? 'translateY(-100%)' : 'translateY(0)',
            transitionDelay: '0ms'
          }}
        />
        <div 
          className="h-full bg-accent transition-transform duration-700 ease-in-out"
          style={{ 
            width: '23.33%',
            transform: animationStarted ? 'translateY(-100%)' : 'translateY(0)',
            transitionDelay: '60ms'
          }}
        />
        <div 
          className="h-full bg-accent transition-transform duration-700 ease-in-out"
          style={{ 
            width: '23.34%',
            transform: animationStarted ? 'translateY(-100%)' : 'translateY(0)',
            transitionDelay: '120ms'
          }}
        />
        <div 
          className="h-full bg-accent transition-transform duration-700 ease-in-out"
          style={{ 
            width: '23.33%',
            transform: animationStarted ? 'translateY(-100%)' : 'translateY(0)',
            transitionDelay: '180ms'
          }}
        />
        <div 
          className="h-full bg-accent transition-transform duration-700 ease-in-out"
          style={{ 
            width: '15%',
            transform: animationStarted ? 'translateY(-100%)' : 'translateY(0)',
            transitionDelay: '240ms'
          }}
        />
      </div>

      <div 
        className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500"
        style={{ opacity: animationStarted ? 0 : 1 }}
      >
        <h1 className="text-3xl font-bold text-black mb-4">Laveesh Tomar</h1>
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
