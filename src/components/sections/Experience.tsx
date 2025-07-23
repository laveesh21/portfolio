import { portfolioContent } from '../../portfolioContent';

const { title, titleHighlight, experienceItems } = portfolioContent.experience;

const Experience = () => {
  return (
    <section 
      id="experience" 
      className="w-full border-b border-white/10 text-white py-24 relative overflow-hidden"
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
      
      <div className="container mx-auto px-4 md:px-8 z-10 relative">
        <h2 className="text-4xl font-bold mb-16 text-center text-white">
          {title.replace(titleHighlight, "").trim()} <span className="text-blue-400">{titleHighlight}</span>
        </h2>
        <div className="max-w-3xl mx-auto pl-[5%]">
          {experienceItems.map((item) => (
            <div key={item.id} className="mb-12 relative pl-8 border-l-2 border-blue-400/50 bg-neutral-800 p-4 rounded-r-lg">
              <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-blue-400 ring-4 ring-black"></div>
              <h3 className="text-xl font-bold mb-1 text-white">{item.jobTitle}</h3>
              <p className="text-blue-400 mb-2 text-sm">{item.company} • {item.duration}</p>
              <p className="text-white/80 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
