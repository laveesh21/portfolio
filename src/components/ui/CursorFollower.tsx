import { useEffect, useState, useRef } from 'react';

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smoother cursor following with slight delay
    const updatePosition = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      
      // Using requestAnimationFrame for smoother animation
      requestAnimationFrame(() => {
        if (cursorRef.current) {
          setPosition({ x: e.clientX, y: e.clientY });
        }
      });
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [visible]);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed z-50 h-6 w-6 rounded-full bg-white opacity-40 mix-blend-difference transition-all duration-300 ease-out ${visible ? 'scale-100' : 'scale-0'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 0 25px 8px rgba(255, 255, 255, 0.4)',
        animation: 'cursorPulse 3s infinite alternate ease-in-out',
        willChange: 'left, top, transform, opacity, box-shadow',
        backdropFilter: 'blur(1px)',
      }}
    />
  );
};

export default CursorFollower;
