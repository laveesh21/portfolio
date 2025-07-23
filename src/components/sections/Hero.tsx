import { portfolioContent } from '../../portfolioContent';
// Import the image directly
import profileImage from '../../assets/images/LaveeshProfile00.jpeg';
import { useEffect, useState } from 'react';

const { 
  location, 
  title, 
  titleAfter, 
  subtitle, 
  ctaButtonText, 
  stats 
} = portfolioContent.hero;

const Hero = () => {
  // Add subtle parallax effect on scroll
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="hero" 
      className="min-h-[90vh] w-full border-b border-white/10 text-white flex items-center py-24 relative overflow-hidden"
    >
      {/* Vertical lines matching loading screen stripes */}
      <div className="absolute inset-0 z-0 pointer-events-none flex">
        <div className="h-full w-[15%] border-r border-white/10"></div>
        <div className="h-full w-[23.33%] border-r border-white/10"></div>
        <div className="h-full w-[23.34%] border-r border-white/10"></div>
        <div className="h-full w-[23.33%] border-r border-white/10"></div>
        <div className="h-full w-[15%]"></div>
      </div>
      
      {/* Background gradient effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-0"
      ></div>

      <div className="w-full z-10 pt-16 pl-[17%]">
        {/* Location indicator */}
        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-5 h-5 rounded-full mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4 text-white/70" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-xs tracking-widest text-white/70 uppercase">{location}</span>
        </div>
        
        {/* Main title with image */}
        <h1 
          className="text-5xl md:text-7xl font-semibold mb-2 flex flex-wrap items-center tracking-tight"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          {title} {' '}
          <div 
            className="inline-block w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-500 mx-2 overflow-visible relative cursor-pointer transition-all duration-500"
            onMouseEnter={(e) => {
              const imgContainer = e.currentTarget;
              const img = imgContainer.querySelector('img');
              if (img) {
                imgContainer.style.zIndex = '50';
                imgContainer.style.overflow = 'visible';
                img.style.transform = 'scale(6)';
                img.style.borderRadius = '50%';
                img.style.boxShadow = '0 0 30px rgba(255,255,255,0.4)';
              }
            }}
            onMouseLeave={(e) => {
              const imgContainer = e.currentTarget;
              const img = imgContainer.querySelector('img');
              if (img) {
                imgContainer.style.zIndex = '10';
                img.style.transform = 'scale(1)';
                img.style.borderRadius = '50%';
                img.style.boxShadow = 'none';
              }
            }}
          >
            {/* Use the imported image */}
            <img 
              src={profileImage} 
              alt="Profile" 
              className="w-full h-full object-cover rounded-full transition-all duration-500"
              onError={(e) => {
                // If image fails to load, show placeholder
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'bg-gray-600');
                target.parentElement!.innerHTML = '<span class="text-xs">🧑‍💻</span>';
              }}
            />
          </div>
          {' '} {titleAfter}
        </h1>
        
        {/* Subtitle */}
        <h2 
          className="text-3xl md:text-5xl font-bold text-gray-500 mt-2 mb-16"
        >
          {subtitle}
        </h2>
        
        {/* CTA Button */}
        <button className="bg-accent text-black px-6 py-3 font-bold rounded-md hover:bg-primary/90 transition-all mb-24 shadow-[0_0_15px_rgba(238,255,0,0.3)]">
          {ctaButtonText}
        </button>
        
        {/* Stats */}
        <div className="absolute bottom-22 left-0 right-0 w-full flex">
          <div className="w-[15%]"></div>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="px-4 relative cursor-pointer transition-all duration-300 group flex items-center"
              style={{
                width: index === 0 ? '23.33%' : index === 1 ? '23.34%' : '23.33%',
                height: '70px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)';
                e.currentTarget.style.height = '80px';
                e.currentTarget.style.marginTop = '-10px';
                e.currentTarget.style.marginBottom = '-10px';
                e.currentTarget.style.zIndex = '10';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.height = '70px';
                e.currentTarget.style.marginTop = '0';
                e.currentTarget.style.marginBottom = '0';
                e.currentTarget.style.zIndex = '0';
              }}
            >
              <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-white to-white/20"></div>
              <div className="pl-6 relative w-full">
                <div className="text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
