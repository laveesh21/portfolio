import { useState, useEffect } from 'react';
import { portfolioContent } from '../../portfolioContent';
import { FaHome, FaUser, FaCode, FaBriefcase, FaEnvelope } from 'react-icons/fa';

const { name, navLinks, mobileMenuButton, mobileMenuIcon } = portfolioContent.header;

// Assuming the first navLink is always the 'home' link with the main name
const homeLink = navLinks.find(link => link.id === 'home') || navLinks[0]; 
const otherNavLinks = navLinks.filter(link => link.id !== 'home');



// Function to get the appropriate icon component
const getIcon = (id: string) => {
  switch (id) {
    case 'home': return <FaHome className="text-sm" />;
    case 'about': return <FaUser className="text-sm" />;
    case 'projects': return <FaCode className="text-sm" />;
    case 'experience': return <FaBriefcase className="text-sm" />;
    case 'contact': return <FaEnvelope className="text-sm" />;
    default: return null;
  }
};

const NavLinkComponent = ({ id, href, children, isActive, onClick }: { id: string, href: string, icon?: string, children: React.ReactNode, isActive: boolean, onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) => (
  <a 
    id={`nav-link-${id}`}
    href={href} 
    onClick={onClick}
    className={`flex items-center space-x-1 px-3 py-1.5 text-sm font-medium relative z-10
                transition-all duration-200 ease-out
                ${isActive 
                  ? 'text-white' 
                  : 'text-white/60 hover:text-white/80'}`}
  >
    <span className="flex items-center justify-center w-4 h-4 mr-1">{getIcon(id)}</span>
    <span>{children}</span>
    {/* Tube light effect - always present but with opacity transition */}
    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-[2px] transition-opacity duration-300 ease-out ${isActive ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-full h-full bg-white/90 rounded-full"></div>
      {/* Glow effect */}
      <div className="absolute -inset-1 blur-[2px] bg-white/30 rounded-full"></div>
      <div className="absolute -inset-2 blur-[4px] bg-white/10 rounded-full"></div>
      <div className="absolute -inset-3 blur-[6px] bg-white/5 rounded-full"></div>
    </div>
    {/* Extended glow effect on page - always present but with opacity transition */}
    <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full h-16 bg-gradient-to-b from-white/5 to-transparent blur-xl pointer-events-none transition-opacity duration-300 ease-out ${isActive ? 'opacity-50' : 'opacity-0'}`}></div>
  </a>
);

const Header = () => {
  const [activeLink, setActiveLink] = useState(homeLink.id);
  const [glowPosition, setGlowPosition] = useState({ left: 0, width: 0 });
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0
  });
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Handle clicking on navigation items
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    // Set active link immediately so the indicator moves right away
    setActiveLink(id);
    
    // Set navigating state to prevent the scroll handler from interfering
    setIsNavigating(true);
    
    // Scroll to the section
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      
      // After scrolling is complete (roughly), re-enable scroll detection
      // The delay should match or exceed the smooth scroll duration
      setTimeout(() => {
        setIsNavigating(false);
      }, 800); // Approximate smooth scroll duration
    }
  };
  
  // Update active link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Skip scroll handling if user is actively navigating
      if (isNavigating) return;
      
      // Get all sections
      const sections = Array.from(document.querySelectorAll('section[id]'));
      
      // Find the section that's currently in view (most in view)
      let currentSectionId = '';
      let maxVisibleHeight = 0;
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate how much of the section is visible in the viewport
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight;
          currentSectionId = section.id;
        }
      });
      
      // Set active link based on the section most in view
      if (currentSectionId) {
        setActiveLink(currentSectionId);
      }
    };
    
    // Add scroll event listener with throttling for performance
    let scrollTimeout: number | null = null;
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = window.setTimeout(() => {
          handleScroll();
          scrollTimeout = null;
        }, 100); // Throttle to run at most every 100ms
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial check on mount
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
    };
  }, [isNavigating]);

  // Update the glow position and indicator style based on the active link
  useEffect(() => {
    // Find the active link element
    const activeElement = document.getElementById(`nav-link-${activeLink}`);
    if (activeElement) {
      // Get the position of the active link
      const rect = activeElement.getBoundingClientRect();
      const headerRect = document.querySelector('header')?.getBoundingClientRect();
      
      // The tube light is centered in the link, so we use the link's center
      const tubePosition = rect.left + (rect.width / 2);
      
      // Set the glow position to match the tube light
      setGlowPosition({
        left: tubePosition,
        width: rect.width / 2
      });

      // Calculate the indicator position relative to the header
      if (headerRect) {
        const left = rect.left - headerRect.left;
        setIndicatorStyle({
          left: left,
          width: rect.width,
          opacity: 1
        });
      }
    }
  }, [activeLink]);

  return (
    <>
      {/* Global tube light glow effect */}
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-40 overflow-hidden"
        aria-hidden="true"
      >
        {/* Extremely subtle hemisphere glow effect */}
        <div 
          className="fixed w-[90vw] h-[70vh] opacity-[0.03] blur-[100px] transition-all duration-700"
          style={{
            top: '2.5rem', // Position just below the header
            left: `${glowPosition.left}px`,
            background: 'radial-gradient(ellipse at center top, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 85%)',
            transform: 'translateX(-50%)',
            pointerEvents: 'none'
          }}
        ></div>
        
        {/* Very subtle secondary glow */}
        <div 
          className="fixed w-[70vw] h-[60vh] opacity-[0.015] blur-[80px] transition-all duration-700"
          style={{
            top: '2rem', // Slightly higher than main glow
            left: `${glowPosition.left}px`,
            background: 'radial-gradient(ellipse at center top, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 80%)',
            transform: 'translateX(-50%)',
            pointerEvents: 'none'
          }}
        ></div>
      </div>
      
      {/* Animation is handled via CSS classes in the global stylesheet */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-auto">
        <div className="bg-black rounded px-1 py-1 shadow-[0_0_10px_rgba(0,0,0,0.5)] border-b border-white/5 relative">
          {/* Sliding indicator */}
          <div 
            className="absolute top-0 h-full bg-gradient-to-r from-white/15 via-white/20 to-white/15 rounded transition-all duration-300 ease-out shadow-[0_0_8px_rgba(255,255,255,0.15)] border border-white/15" 
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          />
          <div className="flex items-center justify-between space-x-4 relative z-10">
            {/* Home/Name link */}
            <NavLinkComponent 
              id={homeLink.id}
              href={`#${homeLink.id}`}
              isActive={activeLink === homeLink.id}
              onClick={(e) => handleNavClick(e, homeLink.id)}
            >
              {name}
            </NavLinkComponent>

            {/* Navigation links */}
            <nav className="flex space-x-1">
              {otherNavLinks.map((link) => (
                <NavLinkComponent
                  key={link.id}
                  id={link.id}
                  href={`#${link.id}`}
                  isActive={activeLink === link.id}
                  onClick={(e) => handleNavClick(e, link.id)}
                >
                  {link.label}
                </NavLinkComponent>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden text-white/70 hover:text-white focus:outline-none">
              <span className="sr-only">{mobileMenuButton}</span>
              <span>{mobileMenuIcon}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
