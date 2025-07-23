import React, { useState, useEffect, useRef } from 'react';
import { portfolioContent } from '../../portfolioContent';

// Import tech logos
import reactLogo from '../../assets/tech-logos/react.svg';
import nodejsLogo from '../../assets/tech-logos/nodejs.svg';
import pythonLogo from '../../assets/tech-logos/python.svg';
import typescriptLogo from '../../assets/tech-logos/typescript.svg';
import mongodbLogo from '../../assets/tech-logos/mongodb.svg';
import firebaseLogo from '../../assets/tech-logos/firebase.svg';
import awsLogo from '../../assets/tech-logos/aws.svg';
import gitLogo from '../../assets/tech-logos/git.svg';
import javaLogo from '../../assets/tech-logos/java.svg';

const { title, titleHighlight, description1, description2, details, resumeButtonText } = portfolioContent.about;

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  const techSkills = [
    { name: 'React', logo: reactLogo, color: 'text-blue-400', bgColor: 'bg-blue-400/10' },
    { name: 'Node.js', logo: nodejsLogo, color: 'text-green-400', bgColor: 'bg-green-400/10' },
    { name: 'Python', logo: pythonLogo, color: 'text-yellow-400', bgColor: 'bg-yellow-400/10' },
    { name: 'Java', logo: javaLogo, color: 'text-green-400', bgColor: 'bg-green-400/10' },
    { name: 'TypeScript', logo: typescriptLogo, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { name: 'MongoDB', logo: mongodbLogo, color: 'text-green-500', bgColor: 'bg-green-500/10' },
    { name: 'Firebase', logo: firebaseLogo, color: 'text-orange-400', bgColor: 'bg-orange-400/10' },
    { name: 'AWS', logo: awsLogo, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
    { name: 'Git', logo: gitLogo, color: 'text-gray-400', bgColor: 'bg-gray-400/10' }
  ];

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

  const TechCard = ({ skill, index }) => {
    return (
      <div 
        className={`px-3 py-2 ${skill.bgColor} rounded-md border border-white/10 hover:border-blue-400/50 transition-all duration-300 flex items-center gap-3`}
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          opacity: isVisible ? 1 : 0,
          transitionDelay: `${index * 50}ms`,
          transitionProperty: 'all',
          transitionDuration: '500ms'
        }}
      >
        <img src={skill.logo} alt={skill.name} className="w-5 h-5" />
        <span className="text-white/80">{skill.name}</span>
      </div>
    );
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="w-full border-b border-white/10 text-white py-24 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>
      
      {/* Vertical lines for structure */}
      <div className="absolute inset-0 z-0 pointer-events-none flex">
        <div className="h-full w-[15%] border-r border-white/10"></div>
        <div className="h-full w-[23.33%] border-r border-white/10"></div>
        <div className="h-full w-[23.34%] border-r border-white/10"></div>
        <div className="h-full w-[23.33%] border-r border-white/10"></div>
        <div className="h-full w-[15%]"></div>
      </div>
      
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-8 z-10 relative">
        <div className="max-w-5xl mx-auto">
          {/* Section title with animated underline */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white inline-block relative">
              {title.replace(titleHighlight, "").trim()} <span className="text-blue-400">{titleHighlight}</span>
            </h2>
          </div>
          
          {/* Main content with cards layout */}
          <div className="grid md:grid-cols-12 gap-8">
            {/* Left column - About content */}
            <div 
              className="md:col-span-7 bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10 shadow-xl"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.6s ease-out'
              }}
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-blue-400 flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Who I Am
                </h3>
                <div className="space-y-4 text-lg">
                  <p className="text-white/90 leading-relaxed">{description1}</p>
                  <p className="text-white/90 leading-relaxed">{description2}</p>
                </div>
                
                {/* Resume button */}
                <div className="pt-6">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/20">
                    <span>{resumeButtonText}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right column - Details */}
            <div 
              className="md:col-span-5 bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10 shadow-xl"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.6s ease-out',
                transitionDelay: '100ms'
              }}
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Details
              </h3>
              <div className="space-y-4">
                {details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-3 border-b border-white/10 pb-3 group hover:border-blue-400/30 transition-colors duration-300">
                    <span className="text-blue-400 font-semibold min-w-[100px]">{detail.label}:</span>
                    <span className="text-white/80 group-hover:text-white transition-colors duration-300">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Tech Skills */}
          <div 
            className="mt-16 bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10 shadow-xl"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s ease-out',
              transitionDelay: '200ms'
            }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Tech <span className="text-blue-400">Skills</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {techSkills.map((skill, index) => (
                <TechCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;