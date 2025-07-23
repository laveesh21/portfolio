import React from 'react';

// Mock data for demonstration with gaming-themed images
const mockProjects = [
  {
    id: 1,
    title: "Neural Combat System",
    description: "AI-powered combat mechanics with machine learning adaptive difficulty",
    tags: ["Unity", "C#", "ML-Agents"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop&crop=entropy&auto=format"
  },
  {
    id: 2,
    title: "Cyber Racing Arena",
    description: "Futuristic racing game with real-time multiplayer and custom vehicle physics",
    tags: ["Unreal Engine", "C++", "Multiplayer"],
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop&crop=entropy&auto=format"
  },
  {
    id: 3,
    title: "VR Space Explorer",
    description: "Virtual reality space exploration with procedural planet generation",
    tags: ["Unity", "VR", "Procedural Gen"],
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop&crop=entropy&auto=format"
  },
  {
    id: 4,
    title: "Neon Warrior",
    description: "Cyberpunk action RPG with dynamic lighting and particle effects",
    tags: ["Godot", "GDScript", "2D"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=entropy&auto=format"
  },
  {
    id: 5,
    title: "Quantum Puzzle Lab",
    description: "Mind-bending puzzle game exploring quantum mechanics principles",
    tags: ["React", "WebGL", "Three.js"],
    image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&h=600&fit=crop&crop=entropy&auto=format"
  },
  {
    id: 6,
    title: "Mech Commander",
    description: "Strategic mech combat with customizable units and tactical gameplay",
    tags: ["Unity", "C#", "Strategy"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=entropy&auto=format"
  },
  {
    id: 7,
    title: "Pixel Dungeon Crawler",
    description: "Retro-style roguelike with procedural dungeon generation",
    tags: ["Godot", "Pixel Art", "Roguelike"],
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=600&fit=crop&crop=entropy&auto=format"
  },
  {
    id: 8,
    title: "Holographic Arena",
    description: "AR battle arena where digital creatures fight in real environments",
    tags: ["AR Core", "Unity", "Mobile"],
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&h=600&fit=crop&crop=entropy&auto=format"
  },
  {
    id: 9,
    title: "Synthwave Racer",
    description: "Retro-futuristic racing game with procedural music sync",
    tags: ["Unity", "Audio", "Procedural"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=entropy&auto=format"
  }
];

const Projects = () => {
  // Matrix layout configuration - you can modify this to change the grid layout
  // Each row defines column spans for that row's items
  const gridMatrix = [
    [2, 1],    // Row 1: First item spans 2 columns, second item spans 1 column
    [1, 2],    // Row 2: First item spans 1 column, second item spans 2 columns  
    [1, 1, 1]  // Row 3: Three items, each spanning 1 column
  ];

  // Flatten the matrix to get project assignments
  const getProjectLayout = () => {
    const layout = [];
    let projectIndex = 0;
    
    gridMatrix.forEach((row, rowIndex) => {
      row.forEach((colSpan, colIndex) => {
        if (projectIndex < mockProjects.length) {
          layout.push({
            ...mockProjects[projectIndex],
            colSpan,
            rowIndex,
            colIndex
          });
          projectIndex++;
        }
      });
    });
    
    return layout;
  };

  const projectLayout = getProjectLayout();

  return (
    <section 
      id="projects" 
      className="w-full border-b border-white/10 text-white py-24 relative overflow-hidden bg-black"
    >
      {/* Animated background grid */}
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
          Latest <span className="text-accent">Projects</span>
        </h2>
        
        {/* Modern Grid Layout */}
        <div className="max-w-6xl mx-auto">
          {gridMatrix.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-3 gap-2 mb-2">
              {row.map((colSpan, colIndex) => {
                const project = projectLayout.find(p => p.rowIndex === rowIndex && p.colIndex === colIndex);
                if (!project) return null;
                
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                      relative group overflow-hidden bg-neutral-900 border border-white/20
                      ${colSpan === 2 ? 'col-span-2' : colSpan === 3 ? 'col-span-3' : 'col-span-1'}
                      ${rowIndex === 0 ? 'h-80' : rowIndex === 1 ? 'h-72' : 'h-64'}
                      transition-all duration-300 hover:scale-[1.02] hover:border-accent/50
                      hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]
                    `}
                  >
                    {/* Project Image */}
                    <div className="absolute inset-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>
                    </div>
                    
                    {/* Project Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                      <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                      <p className="text-white/80 mb-3 text-sm leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-primary/20 border border-accent/30 text-xs text-theme-300 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Project Title Always Visible */}
                    <div className="absolute bottom-4 left-4 right-4 group-hover:opacity-0 transition-opacity duration-300">
                      <h3 className="text-xl font-bold text-white drop-shadow-lg">{project.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;