import { useState, useEffect } from 'react';
import { FaGithub, FaPlay } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Featured projects - Top 4 showcase
const featuredProjects = [
  {
    id: 1,
    title: "Neural Combat System",
    description: "AI-powered combat mechanics with machine learning adaptive difficulty. Features real-time decision making, dynamic enemy behavior, and procedural animation blending.",
    tags: ["Unity", "C#", "ML-Agents", "AI"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=800&fit=crop&crop=entropy&auto=format",
    gradient: "from-blue-500 to-purple-600",
    github: "#",
    live: "#",
    featured: true
  },
  {
    id: 2,
    title: "Cyber Racing Arena",
    description: "Futuristic racing game with real-time multiplayer and custom vehicle physics. Built with high-performance networking and advanced rendering techniques.",
    tags: ["Unreal Engine", "C++", "Multiplayer", "Physics"],
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop&crop=entropy&auto=format",
    gradient: "from-cyan-500 to-blue-600",
    github: "#",
    live: "#",
    featured: true
  },
  {
    id: 3,
    title: "VR Space Explorer",
    description: "Virtual reality space exploration with procedural planet generation. Immersive VR experience with realistic physics and breathtaking visuals.",
    tags: ["Unity", "VR", "Procedural Gen", "XR"],
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=800&fit=crop&crop=entropy&auto=format",
    gradient: "from-purple-500 to-pink-600",
    github: "#",
    live: "#",
    featured: true
  },
  {
    id: 4,
    title: "Neon Warrior",
    description: "Cyberpunk action RPG with dynamic lighting and particle effects. Features fluid combat system, rich storytelling, and stunning visual effects.",
    tags: ["Godot", "GDScript", "2D", "RPG"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop&crop=entropy&auto=format",
    gradient: "from-pink-500 to-orange-600",
    github: "#",
    live: "#",
    featured: true
  }
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      id="projects" 
      className="w-full min-h-screen border-b border-white/10 text-white py-12 md:py-20 lg:py-32 relative overflow-hidden bg-black/50"
    >
      {/* Epic Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Large gradient orbs */}
        <div className="absolute top-20 left-20 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-bounce"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Vertical accent lines */}
      <div className="absolute inset-0 z-0 pointer-events-none flex">
        <div className="h-full w-[15%] border-r border-white/5"></div>
        <div className="h-full w-[23.33%] border-r border-white/5"></div>
        <div className="h-full w-[23.34%] border-r border-white/5"></div>
        <div className="h-full w-[23.33%] border-r border-white/5"></div>
        <div className="h-full w-[15%]"></div>
      </div>
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 z-10 relative max-w-[1400px]">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Featured
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent via-blue-400 to-purple-500 bg-clip-text text-transparent relative">
              PROJECTS
              <span className="absolute -bottom-2 left-0 w-20 md:w-24 h-0.5 bg-gradient-to-r from-accent to-purple-500"></span>
            </span>
          </h2>
          
          <p className="text-white/60 text-sm md:text-base lg:text-lg max-w-2xl mx-auto mt-4 md:mt-6">
            Explore my latest work showcasing cutting-edge technology and creative innovation
          </p>
        </div>
        
        {/* Projects Grid - 2x2 layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-[1300px] mx-auto">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Card Container with 3D effect */}
              <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] rounded-2xl overflow-hidden bg-black/40 border border-white/10 backdrop-blur-sm
                transform transition-all duration-500 ease-out
                hover:scale-[1.02] hover:border-accent/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]
                hover:-translate-y-2">
                
                {/* Animated gradient border on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
                
                {/* Project Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  {/* Dark overlay - lighter on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 
                    group-hover:from-black group-hover:via-black/80 group-hover:to-black/40 transition-all duration-500"></div>
                </div>
                
                {/* Animated corner accents */}
                <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-accent/0 group-hover:border-accent transition-all duration-500"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-accent/0 group-hover:border-accent transition-all duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-6 md:p-8">
                  {/* Number badge with animation */}
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 
                    flex items-center justify-center font-bold text-xl sm:text-2xl text-accent
                    transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Project info - slides up on hover */}
                  <div className="transform transition-all duration-500 group-hover:-translate-y-4">
                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-white leading-tight
                      transform transition-all duration-500">
                      {project.title}
                    </h3>
                    
                    {/* Description - reveals on hover */}
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-4 md:mb-6 max-h-0 opacity-0 overflow-hidden
                      group-hover:max-h-32 group-hover:opacity-100 transition-all duration-500">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 md:mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tag}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/5 backdrop-blur-sm border border-white/20 
                            text-[10px] sm:text-xs text-white/80 font-medium rounded-full
                            hover:bg-accent/20 hover:border-accent/50 hover:text-white
                            transform hover:scale-110 transition-all duration-300"
                          style={{ transitionDelay: `${tagIndex * 50}ms` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action Buttons - fade in on hover */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <a
                        href={project.github}
                        className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 
                          text-white rounded-lg font-medium text-sm sm:text-base hover:bg-accent hover:border-accent hover:scale-105
                          transition-all duration-300 group/btn"
                      >
                        <FaGithub className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                        <span>Code</span>
                      </a>
                      
                      <a
                        href={project.live}
                        className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-accent to-blue-600 
                          text-white rounded-lg font-medium text-sm sm:text-base hover:shadow-lg hover:shadow-accent/50 hover:scale-105
                          transition-all duration-300 group/btn"
                      >
                        <FaPlay className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        <span>Demo</span>
                      </a>
                    </div>
                  </div>
                  
                  {/* Hover indicator line */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-accent via-blue-400 to-purple-500 
                    group-hover:w-full transition-all duration-700"></div>
                </div>
              </div>
              
              {/* External glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.gradient} opacity-0 blur-2xl -z-10
                ${activeProject === project.id ? 'opacity-30' : ''} transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>
        
        {/* View All Projects Button - Cool Framer Motion Animation */}
        <div className={`text-center mt-8 md:mt-12 lg:mt-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
          <motion.a
            href="/projects"
            className="inline-block"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="relative px-6 py-2.5 md:px-8 md:py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl text-white font-semibold text-sm md:text-base overflow-hidden cursor-pointer"
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
              
              <span className="relative z-10 flex items-center gap-2 md:gap-3 font-semibold">
                View All Projects
                <motion.svg 
                  className="w-4 h-4 md:w-5 md:h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={2.5}
                  variants={{
                    hover: { 
                      x: 4,
                      y: -4,
                      transition: {
                        duration: 0.3,
                        ease: "easeOut"
                      }
                    }
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </motion.svg>
              </span>
            </motion.div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Projects;