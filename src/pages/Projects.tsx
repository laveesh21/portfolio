import { motion } from 'framer-motion';
import { portfolioContent } from '../portfolioContent';
import repairLogo from '../assets/tech-logos/repairing-service-white.svg';

const Projects = () => {
  const { projects } = portfolioContent;

  return (
    <div className="min-h-screen bg-dark pt-8 md:pt-12 pb-12 md:pb-20 relative">
      <div className="absolute inset-0 bg-black/70 z-10 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Back to Home Button */}
        <motion.div 
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-xl text-white font-medium transition-all group"
          >
            <motion.svg 
              className="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={2}
              whileHover={{ x: -3 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </motion.svg>
            <span className="group-hover:text-blue-400 transition-colors">Back to Home</span>
          </a>
        </motion.div>

        {/* Under Development Notice */}
        <motion.div
          className="flex flex-col items-center justify-center my-12 md:my-20 p-8 md:p-12 border-4 border-yellow-400 rounded-2xl bg-dark z-30 relative shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <img
            src={repairLogo}
            alt="Under Development"
            className="w-40 h-40 mb-6 animate-bounce drop-shadow-lg"
          />
          <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-4 text-center">Page Under Development</h2>
          <p className="text-white text-center max-w-md text-lg md:text-xl font-medium">
            I'm working hard to bring you an awesome projects showcase. Please check back soon!
          </p>
        </motion.div>

        {/* Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            My{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
            A collection of my recent work and creative experiments
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.projectCards.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="text-white/20 text-6xl font-bold">{index + 1}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/70 text-sm md:text-base mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-white text-sm font-medium transition-all">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;