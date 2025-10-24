import React, { useState, useEffect, useRef } from 'react';
import { portfolioContent } from '../../portfolioContent';
import aboutImage from '../../assets/images/laveeshtomar.jpeg';

// Add keyframe animations
const styles = `
  @keyframes gradient-shift {
    0% { background-position: 0 0; }
    100% { background-position: 50px 50px; }
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  @keyframes subtle-rotate {
    0% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(1deg) scale(1.02); }
    75% { transform: rotate(-1deg) scale(1.02); }
    100% { transform: rotate(0deg) scale(1); }
  }

  @keyframes border-flow {
    0% { border-color: rgba(255,255,255,0.1); }
    50% { border-color: rgba(96,165,250,0.3); }
    100% { border-color: rgba(255,255,255,0.1); }
  }

  @keyframes slide-down {
    0% { 
      opacity: 0;
      transform: translateY(-10px);
      height: 0;
    }
    100% { 
      opacity: 1;
      transform: translateY(0);
      height: var(--content-height);
    }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .group:hover .animate-on-hover {
    animation: subtle-rotate 3s ease-in-out infinite;
  }

  .group:hover .animate-border {
    animation: border-flow 2s ease-in-out infinite;
  }

  details[open] .faq-content {
    animation: slide-down 0.3s ease-out forwards;
  }

  details:not([open]) .faq-content {
    display: none;
  }
`;

// Add styles to head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
const { 
  title, 
  titleHighlight, 
  description1, 
  description2, 
  details, 
  resumeButtonText,
  techStack 
} = portfolioContent.about;

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  
  const techSkills = techStack.skills;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const TechCard: React.FC<{
    skill: {
      name: string;
      logo: string;
      color: string;
      bgColor: string;
    };
    index: number;
  }> = ({ skill, index }) => {
    return (
      <div 
        className="group relative"
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          opacity: isVisible ? 1 : 0,
          transitionDelay: `${index * 50}ms`,
          transitionProperty: 'all',
          transitionDuration: '500ms'
        }}
      >
        <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 ${skill.bgColor} rounded-lg md:rounded-xl border border-white/10 hover:border-accent/50 transition-all duration-300 flex items-center justify-center relative group-hover:scale-105 backdrop-blur-sm`}>
          <img src={skill.logo} alt={skill.name} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 transition-transform group-hover:scale-110" />
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-[10px] sm:text-xs text-white/60 whitespace-nowrap bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
              {skill.name}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="w-full min-h-screen border-b border-white/10 text-white py-12 md:py-20 lg:py-24 relative overflow-hidden bg-black"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Vertical lines for structure */}
        <div className="absolute inset-0 flex">
          <div className="h-full w-[15%] border-r border-white/5"></div>
          <div className="h-full w-[23.33%] border-r border-white/5"></div>
          <div className="h-full w-[23.34%] border-r border-white/5"></div>
          <div className="h-full w-[23.33%] border-r border-white/5"></div>
          <div className="h-full w-[15%]"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 z-10 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12 lg:mb-16 relative">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                {title.replace(titleHighlight, "").trim()}{' '}
              </span>
              <span className="bg-gradient-to-r from-accent via-blue-400 to-purple-500 bg-clip-text text-transparent relative">
                {titleHighlight}
                <span className="absolute -bottom-2 md:-bottom-3 left-0 w-16 md:w-24 h-0.5 bg-gradient-to-r from-accent to-purple-500"></span>
              </span>
            </h2>
          </div>

          {/* Main Content Area */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Profile Image and Quick Info */}
            <div 
              className="relative"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.8s ease-out'
              }}
            >
              {/* Image Container with Enhanced Animation */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                
                {/* Image with continuous animation */}
                <div className="relative w-full h-full animate-on-hover">
                  <img 
                    src={aboutImage}
                    alt="Laveesh Tomar"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                
                {/* Animated Border */}
                <div className="absolute inset-0 border-2 border-white/10 rounded-2xl z-20 animate-border">
                  {/* Corner Accents */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-inherit rounded-tl-lg"></div>
                  <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-inherit rounded-tr-lg"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-inherit rounded-bl-lg"></div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-inherit rounded-br-lg"></div>
                </div>

                {/* Quick Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className="space-y-4">
                    {details.map((detail, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-4 text-sm"
                        style={{
                          transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                          opacity: isVisible ? 1 : 0,
                          transition: `all 0.6s ease-out ${index * 0.1 + 0.5}s`
                        }}
                      >
                        <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                          {detail.label === "Location" && (
                            <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          )}
                          {detail.label === "Email" && (
                            <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          )}
                          {detail.label === "Availability" && (
                            <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </span>
                        <span className="text-white/90">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - About Content */}
            <div 
              className="relative"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.8s ease-out',
                transitionDelay: '0.2s'
              }}
            >
              {/* Content Container */}
              <div className="relative">
                {/* Section Label */}
                <div className="inline-block mb-4 md:mb-6">
                  <span className="text-[10px] sm:text-xs tracking-wider text-blue-400 uppercase bg-blue-400/10 px-2 sm:px-3 py-1 rounded-full">
                    Who I Am
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-4 md:space-y-6 lg:space-y-8">
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed">
                    {description1}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed">
                    {description2}
                  </p>
                </div>

                {/* Resume Button */}
                <div className="mt-8 md:mt-10 lg:mt-12 flex justify-center lg:justify-start">
                  <a 
                    href="/src/assets/pdf/LaveeshTomar_WebDev_CV_v2.pdf" 
                    download="LaveeshTomar_CV.pdf"
                    className="group relative inline-flex px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl text-white font-medium text-base md:text-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-2 md:gap-3">
                      {resumeButtonText}
                      <svg 
                        className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-y-[2px] transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a2 2 0 002 2h14a2 2 0 002-2v-3" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 md:mt-24 mb-16 md:mb-24 relative">
            {/* Background blur effect container */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-3xl blur-2xl"></div>
            
            {/* Content container with backdrop blur */}
            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12">
              {/* Section Header */}
              <div className="text-center mb-8 md:mb-12">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                  <span className="bg-gradient-to-r from-white via-blue-400 to-white bg-clip-text text-transparent">
                    {portfolioContent.faq.title}
                  </span>
                </h3>
                <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto">Common questions about my journey and approach</p>
              </div>
              
              <div className="grid gap-4 md:gap-6 mx-auto">
                {portfolioContent.faq.questions.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:bg-white/10"
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between p-4 sm:p-5 md:p-6 cursor-pointer transition-colors duration-300">
                        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-1 min-w-0">
                          <span className="text-sm sm:text-base md:text-lg font-medium text-blue-400 flex-shrink-0">
                            {String(faq.id).padStart(2, '0')}
                          </span>
                          <div className="h-4 w-[2px] bg-gradient-to-b bg-blue-400/40 via-blue-400/50 to-blue-400/20 hidden sm:block"></div>
                          <span className="text-sm sm:text-base md:text-lg font-medium text-white/90 flex-1 pr-2">{faq.question}</span>
                        </div>
                        <span className="transition-transform duration-300 group-open:rotate-180 flex-shrink-0">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </summary>
                      <div className="faq-content overflow-hidden">
                        <div className="p-4 sm:p-5 md:p-6 bg-black/20 border-t border-white/5">
                          <p className="text-sm sm:text-base text-white/80 leading-relaxed" style={{ 
                            transform: 'translateY(0)',
                            opacity: 1,
                            transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
                          }}>
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Skills */}
          <div className="mt-12 md:mt-16 relative">
            {/* Animated background container */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-purple-500/10 to-cyan-500/10 rounded-2xl blur-xl"></div>
            
            <div 
              className="relative bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.8s ease-out',
                transitionDelay: '200ms'
              }}
            >
              {/* Section Header */}
              <div className="text-center mb-8 md:mb-12">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 flex items-center justify-center gap-2 md:gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    {techStack.title.replace(techStack.titleHighlight, '')}{' '}
                    <span className="text-accent">{techStack.titleHighlight}</span>
                  </span>
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-white/60 max-w-2xl mx-auto">Explore the technologies I work with to bring ideas to life</p>
              </div>

              {/* Tech Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
                {/* Frontend */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-white/10">
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-3 md:mb-4 text-blue-400">Frontend Development</h4>
                  <div className="flex flex-wrap md:grid md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                    {techSkills
                      .filter(skill => ['React', 'TypeScript', 'TailwindCSS', 'JavaScript', 'HTML', 'CSS'].includes(skill.name))
                      .map((skill, index) => (
                        <TechCard key={skill.name} skill={skill} index={index} />
                      ))}
                  </div>
                </div>

                {/* Backend */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-white/10">
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-3 md:mb-4 text-green-400">Backend Development</h4>
                  <div className="flex flex-wrap md:grid md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                    {techSkills
                      .filter(skill => ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Python', 'Django', 'SQL'].includes(skill.name))
                      .map((skill, index) => (
                        <TechCard key={skill.name} skill={skill} index={index} />
                      ))}
                  </div>
                </div>

                {/* Tools & Others */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 border border-white/10">
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-3 md:mb-4 text-purple-400">Tools & Deployment</h4>
                  <div className="flex flex-wrap md:grid md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                    {techSkills
                      .filter(skill => ['Git', 'Docker', 'AWS', 'Figma', 'VS Code', 'Webpack', 'Linux'].includes(skill.name))
                      .map((skill, index) => (
                        <TechCard key={skill.name} skill={skill} index={index} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    
  );
};


export default About;