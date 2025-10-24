import { portfolioContent } from '../../portfolioContent';

const { titleHighlight, experienceItems } = portfolioContent.experience;

const Experience = () => {
  return (
    <section 
      id="experience" 
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
      
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-black/50 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-8 z-10 relative">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Work
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent via-blue-400 to-purple-500 bg-clip-text text-transparent relative">
              {titleHighlight}
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 md:w-24 h-0.5 bg-gradient-to-r from-accent to-purple-500"></span>
            </span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line with gradient - thinner on mobile */}
          <div className="absolute left-3 md:left-0 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-blue-400/80 via-blue-400/60 to-blue-400/20"></div>

          {/* Experience Items */}
          {experienceItems.map((item, index) => (
            <div 
              key={item.id} 
              className="mb-12 md:mb-16 relative pl-8 md:pl-12 group"
              style={{
                opacity: 1,
                transform: 'translateY(0)',
                transition: `all 0.5s ease-out ${index * 0.2}s`
              }}
            >
              {/* Timeline dot with pulse effect */}
              <div className="absolute left-[7px] md:-left-[5px] top-0 flex items-center justify-center">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-blue-400 rounded-full z-10 ring-2 ring-black"></div>
                <div className="absolute w-4 h-4 md:w-5 md:h-5 bg-blue-400/20 rounded-full animate-ping"></div>
              </div>

              {/* Content Card */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 lg:p-8 transition-all duration-300 hover:bg-white/10 hover:border-blue-400/30 group-hover:translate-x-1">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {item.jobTitle}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-white/60">
                    <span className="text-blue-400 font-medium">{item.company}</span>
                    <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-blue-400/40"></span>
                    <span className="font-light">{item.duration}</span>
                  </div>
                </div>

                {/* Description with improved readability */}
                <div className="space-y-3">
                  {item.description.map((desc, index) => (
                    <p 
                      key={`desc-${index}`} 
                      className="text-sm md:text-base text-white/90 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: desc }}
                    />
                  ))}
                </div>

                {/* Achievements/Points with enhanced styling */}
                {item.points && item.points.length > 0 && (
                  <div className="mt-6 space-y-3">
                    {item.points.map((point, index) => (
                      <div 
                        key={`point-${index}`} 
                        className="flex items-start gap-2 md:gap-3 group/item hover:bg-blue-400/5 p-2 rounded-lg transition-colors"
                      >
                        <span className="text-blue-400 mt-1 md:mt-1.5 flex-shrink-0">
                          <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                        <span className="text-sm md:text-base text-white/90 leading-relaxed group-hover/item:text-white transition-colors">{point}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative bottom gradient - reduced opacity */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent z-0 pointer-events-none"></div>
    </section>
  );
};

export default Experience;
