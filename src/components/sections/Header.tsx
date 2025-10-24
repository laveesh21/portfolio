import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { portfolioContent } from '../../portfolioContent';
import { FaHome, FaUser, FaCode, FaBriefcase, FaEnvelope } from 'react-icons/fa';

const { name, navLinks } = portfolioContent.header;

// Assuming the first navLink is always the 'home' link with the main name
const homeLink = navLinks.find(link => link.id === 'home') || navLinks[0]; 
const otherNavLinks = navLinks.filter(link => link.id !== 'home');



// Function to get the appropriate icon component
const getIcon = (id: string) => {
  switch (id) {
    case 'home': return <FaHome className="text-xs md:text-sm" />;
    case 'about': return <FaUser className="text-xs md:text-sm" />;
    case 'projects': return <FaCode className="text-xs md:text-sm" />;
    case 'experience': return <FaBriefcase className="text-xs md:text-sm" />;
    case 'contact': return <FaEnvelope className="text-xs md:text-sm" />;
    default: return null;
  }
};

const NavLinkComponent = ({ id, href, children, isActive, onClick }: { id: string, href: string, icon?: string, children: React.ReactNode, isActive: boolean, onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) => (
  <a 
    id={`nav-link-${id}`}
    href={href} 
    onClick={onClick}
    className={`flex items-center space-x-1 px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm font-medium relative z-10
                transition-all duration-200 ease-out
                ${isActive 
                  ? 'text-white' 
                  : 'text-white/60 hover:text-white/80'}`}
  >
    <span className="flex items-center justify-center w-3 h-3 md:w-4 md:h-4 mr-0.5 md:mr-1">{getIcon(id)}</span>
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
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(homeLink.id);
  const [glowPosition, setGlowPosition] = useState({ left: 0, width: 0 });
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0
  });
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Hide header on projects page
  if (location.pathname === '/projects') {
    return null;
  }
  
  // Handle scroll to show/hide header (only on mobile)
  useEffect(() => {
    const handleScroll = () => {
      // Only apply auto-hide on mobile devices (screen width < 768px)
      const isMobile = window.innerWidth < 768;
      
      if (!isMobile) {
        setIsHeaderVisible(true);
        return;
      }
      
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsHeaderVisible(true);
      } 
      // Hide header when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
        setIsMobileMenuOpen(false); // Close mobile menu when hiding
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  // Handle clicking on navigation items
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    // Close mobile menu
    setIsMobileMenuOpen(false);
    
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
      <header className={`fixed top-2 md:top-4 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-[95vw] transition-transform duration-300 ease-in-out ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-24'
      }`}>
        <div className="bg-black rounded px-1 py-0.5 md:py-1 shadow-[0_0_10px_rgba(0,0,0,0.5)] border-b border-white/5 relative">
          {/* Sliding indicator - hidden on mobile */}
          <div 
            className="hidden md:block absolute top-0 h-full bg-gradient-to-r from-white/15 via-white/20 to-white/15 rounded transition-all duration-300 ease-out shadow-[0_0_8px_rgba(255,255,255,0.15)] border border-white/15" 
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          />
          <div className="flex items-center justify-between space-x-2 md:space-x-4 relative z-10">
            {/* Active tab name on mobile, Laveesh Tomar on desktop */}
            <div className="md:hidden flex items-center gap-2 px-2 py-1 text-sm font-medium text-white">
              <span className="flex items-center justify-center w-4 h-4">{getIcon(activeLink)}</span>
              <span>{navLinks.find(link => link.id === activeLink)?.label || 'Home'}</span>
            </div>
            
            {/* Desktop Home/Name link */}
            <div className="hidden md:block">
              <NavLinkComponent 
                id={homeLink.id}
                href={`#${homeLink.id}`}
                isActive={activeLink === homeLink.id}
                onClick={(e) => handleNavClick(e, homeLink.id)}
              >
                {name}
              </NavLinkComponent>
            </div>

            {/* Navigation links - hidden on mobile */}
            <nav className="hidden md:flex space-x-1">
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
            <button 
              className="md:hidden text-white/70 hover:text-white focus:outline-none p-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown - More Compact */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-1 bg-black/95 backdrop-blur-lg rounded-lg border border-white/10 shadow-xl overflow-hidden">
            <nav className="flex flex-col py-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-200
                    ${activeLink === link.id 
                      ? 'text-white bg-white/10 border-l-2 border-accent' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                >
                  <span className="flex items-center justify-center w-4 h-4">{getIcon(link.id)}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
