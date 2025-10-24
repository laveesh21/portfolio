import { portfolioContent } from '../../portfolioContent';
import { useState } from 'react';
import { motion } from 'framer-motion';
import profileImage from '../../assets/images/LaveeshProfile00.jpg';

interface Particle {
  id: number;
  left: number;
  delay: number;
  size: number;
}

const { location, title, titleAfter, subtitle, ctaButtonText, stats } = portfolioContent.hero;

const Hero: React.FC = () => {
  const [particles] = useState<Particle[]>(() => 
    Array.from({ length: 10 }, (_, i): Particle => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      size: Math.random() * 2 + 1
    }))
  );

  const handleImageExpand = (img: HTMLImageElement) => {
    img.style.transform = 'scale(3.5)';
  };

  const handleImageShrink = (img: HTMLImageElement) => {
    img.style.transform = 'scale(0.8)';
  };

  const handleStatHover = (e: React.MouseEvent<HTMLDivElement>, isEnter: boolean) => {
    const el = e.currentTarget;
    if (isEnter) {
      Object.assign(el.style, {
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
        height: '120px',
        marginTop: '-20px',
        marginBottom: '-20px',
        zIndex: '20',
        borderRadius: '16px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
        border: '1px solid rgba(59, 130, 246, 0.2)'
      });
    } else {
      Object.assign(el.style, {
        background: 'none',
        height: '100px',
        marginTop: '0',
        marginBottom: '0',
        zIndex: '0',
        borderRadius: '0',
        backdropFilter: 'none',
        boxShadow: 'none',
        border: 'none'
      });
    }
  };

  return (
    <section id="hero" className="min-h-screen w-full text-white flex items-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      
      {/* Background Effects - reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/5 md:from-blue-500/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-[800px] h-[800px] bg-gradient-to-tl from-cyan-500/5 md:from-cyan-500/15 to-transparent rounded-full blur-3xl"></div>
        
        <div className="absolute top-1/4 left-1/4 w-24 h-24">
          <div className="w-2 h-2 bg-blue-400 rounded-full absolute animate-orbit shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
        </div>
        
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-blue-400/60 animate-particle-float"
            style={{
              left: `${particle.left}%`,
              bottom: '0',
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
        
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Vertical Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none flex opacity-20">
        <div className="h-full w-[15%] border-r border-blue-500/20"></div>
        <div className="h-full w-[23.33%] border-r border-white/10"></div>
        <div className="h-full w-[23.34%] border-r border-blue-500/10"></div>
        <div className="h-full w-[23.33%] border-r border-white/10"></div>
        <div className="h-full w-[15%]"></div>
      </div>

      {/* Main Content - shifted down on mobile */}
      <div className="w-full z-10 px-4 sm:px-8 md:pl-[17%] md:pr-[17%] mt-8 md:-mt-16">
        
        {/* Location Badge */}
        <div className="flex items-center mb-6 md:mb-10 animate-fadeInUp">
          <div className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/20 hover:border-blue-400/50 transition-all duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-[10px] md:text-xs tracking-[0.15em] text-white uppercase font-semibold">{location}</span>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          </div>
        </div>
        
        {/* Title with Profile Image */}
        <div className="mb-4 md:mb-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-black mb-4 flex flex-wrap items-center tracking-tight leading-tight md:leading-none">
            <span className="text-white drop-shadow-lg">{title}</span>
            {' '}
            <div className="relative inline-flex mx-2 md:mx-4 my-1 md:my-2 w-14 h-14 sm:w-20 sm:h-20 md:w-20 md:h-20 lg:w-28 lg:h-28 cursor-pointer">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full transition-all duration-500"
                style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
                onMouseEnter={(e) => handleImageExpand(e.currentTarget)}
                onMouseLeave={(e) => handleImageShrink(e.currentTarget)}
              />
            </div>
            {' '}
            <span className="bg-gradient-to-r from-white via-blue-300 to-white bg-clip-text text-transparent animate-gradient-flow-slow" style={{ backgroundSize: '200% auto' }}>
              {titleAfter}
            </span>
          </h1>
        </div>
        
        {/* Subtitle */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-2 mb-8 md:mb-16 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
          {subtitle}
        </h2>
        
        {/* CTA Button - Clean & Professional Framer Motion */}
        <motion.div 
          className="mb-16 md:mb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          <motion.a 
            href="/projects" 
            className="relative inline-flex px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl text-white font-semibold text-sm md:text-base overflow-hidden cursor-pointer"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            variants={{
              hover: {
                scale: 1.05,
                transition: {
                  duration: 0.3,
                  ease: "easeInOut"
                }
              }
            }}
          >
            {/* Glow effect on hover */}
            <motion.div 
              className="absolute inset-0 bg-blue-400 blur-xl opacity-0 -z-10"
              variants={{
                hover: { opacity: 0.5 }
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Shine effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              initial={{ x: "-200%" }}
              variants={{
                hover: { 
                  x: "200%",
                  transition: {
                    duration: 0.6,
                    ease: "easeInOut"
                  }
                }
              }}
            />
            
            <span className="relative z-10 flex items-center gap-2 md:gap-3 font-semibold tracking-wide">
              {ctaButtonText}
              <motion.svg 
                className="w-4 h-4 md:w-5 md:h-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2.5}
                variants={{
                  hover: { 
                    x: 4,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut"
                    }
                  }
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </span>
          </motion.a>
        </motion.div>
        
        {/* Stats - Responsive Grid */}
        <div className="grid grid-cols-2 md:flex md:absolute md:bottom-48 md:left-0 md:right-0 md:w-full gap-4 md:gap-0 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          <div className="hidden md:block md:w-[15%]"></div>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="px-4 py-4 md:py-0 relative cursor-pointer transition-all duration-500 group flex items-center bg-white/5 md:bg-transparent rounded-lg md:rounded-none border border-white/10 md:border-none"
              style={{ width: index === 0 ? 'auto' : index === 1 ? 'auto' : 'auto' }}
              onMouseEnter={(e) => handleStatHover(e, true)}
              onMouseLeave={(e) => handleStatHover(e, false)}
            >
              <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-blue-400 to-cyan-500 opacity-30 group-hover:opacity-100 transition-all duration-500 group-hover:w-[3px] group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] hidden md:block"></div>
              <div className="md:pl-8 relative w-full">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent group-hover:scale-110 transition-all duration-500">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-white/40 group-hover:text-white/80 transition-all duration-500 font-semibold tracking-wide uppercase">
                  {stat.label}
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-10 h-[2px] bg-gradient-to-l from-blue-400 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-[2px] h-10 bg-gradient-to-b from-blue-400 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
