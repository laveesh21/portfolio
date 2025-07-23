export const portfolioContent = {
  header: {
    name: "Laveesh Tomar",
    navLinks: [
      { id: 'home', href: '#hero', iconPlaceholder: '[H]', label: 'Knox' }, // Special case for home/name
      { id: 'about', href: '#about', iconPlaceholder: '[A]', label: 'About' },
      { id: 'projects', href: '#projects', iconPlaceholder: '[P]', label: 'Projects' },
      { id: 'experience', href: '#experience', iconPlaceholder: '[E]', label: 'Experience' },
      { id: 'contact', href: '#contact', iconPlaceholder: '[C]', label: 'Contact' },
    ],
    mobileMenuButton: 'Open main menu',
    mobileMenuIcon: '☰'
  },
  hero: {
    location: "Gurugram, Haryana",
    title: "Fullstack",
    titleImage: "LaveeshProfile00.jpeg", // This will be a placeholder until you add an actual image
    titleAfter: "Web Developer",
    subtitle: "also a Gamer",
    ctaButtonText: "View My Work",
    stats: [
      {
        value: "1+ year",
        label: "of professional experience"
      },
      {
        value: "5+",
        label: "completed web projects"
      },
      {
        value: "3",
        label: "tech stacks mastered"
      }
    ]
  },
  about: {
    title: "About Me",
    titleHighlight: "Me",
    aboutImage: "LaveeshProfile00.jpeg",
    whoAmITitle: "Who I Am",
    description1: "I'm a dedicated frontend web developer based in Roorkee, Uttarakhand, with over a year of professional experience building responsive and intuitive web applications.",
    description2: "Specializing in React, TypeScript, and modern CSS frameworks like Tailwind, I focus on creating clean, maintainable code that delivers exceptional user experiences. I'm passionate about web accessibility and performance optimization.",
    details: [
      { label: "Location", value: "Gurugram, Haryana" },
      { label: "Email", value: "laveeshtomar2681@gmail.com" },
      { label: "Availability", value: "Open to opportunities" }
    ],
    resumeButtonText: "Download Resume"
  },
  projects: {
    title: "My Projects",
    titleHighlight: "Projects",
    projectCards: [
      {
        id: 1,
        title: "E-Commerce Dashboard",
        description: "A responsive admin dashboard for online retailers with real-time analytics, inventory management, and order processing capabilities.",
        tags: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
        imagePlaceholder: "ecommerce-dashboard.png"
      },
      {
        id: 2,
        title: "Personal Portfolio",
        description: "A modern, responsive portfolio website with subtle animations and a clean UI, showcasing my skills and projects.",
        tags: ["React", "TypeScript", "Vite", "Tailwind CSS"],
        imagePlaceholder: "portfolio-website.png"
      },
      {
        id: 3,
        title: "Task Management App",
        description: "A collaborative task management application with drag-and-drop functionality, user assignments, and progress tracking.",
        tags: ["React", "Redux", "Firebase", "Styled Components"],
        imagePlaceholder: "task-management-app.png"
      },
      {
        id: 4,
        title: "Weather Dashboard",
        description: "A weather application that provides current conditions and forecasts using geolocation and a third-party weather API.",
        tags: ["JavaScript", "HTML5", "CSS3", "OpenWeather API"],
        imagePlaceholder: "weather-dashboard.png"
      }
    ]
  },
  experience: {
    title: "Work Experience",
    titleHighlight: "Experience",
    experienceItems: [
      {
        id: 1,
        jobTitle: "Frontend Web Developer",
        company: "TechSolutions Inc.",
        duration: "2024 - Present",
        description: "Develop and maintain responsive web applications using React and TypeScript. Collaborate with designers and backend developers to implement user interfaces and integrate APIs. Optimize website performance and ensure cross-browser compatibility."
      },
      {
        id: 2,
        jobTitle: "Web Development Intern",
        company: "Digital Innovations",
        duration: "2023 - 2024",
        description: "Assisted in building and maintaining client websites using HTML, CSS, and JavaScript. Gained hands-on experience with React and modern frontend frameworks. Participated in code reviews and implemented feedback from senior developers."
      },
      {
        id: 3,
        jobTitle: "Freelance Web Developer",
        company: "Self-employed",
        duration: "2022 - 2023",
        description: "Designed and developed custom websites for small businesses and individuals. Implemented responsive designs and ensured accessibility compliance. Managed client relationships and delivered projects on schedule."
      }
    ]
  },
  contact: {
    title: "Get In Touch",
    titleHighlight: "Touch",
    description: "I'm currently open to new opportunities and collaborations. Feel free to reach out if you'd like to discuss a project or potential position.",
    formLabels: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message"
    },
    contactInfo: [
      { type: "Email", value: "laveeshtomar.royalking@gmail.com" },
      { type: "Location", value: "Gurugram, Haryana, India" },
      { type: "Availability", value: "Weekdays 9AM - 6PM IST" }
    ],
    submitButtonText: "Send Message"
  },
  footer: {
    socialLinks: [
      { id: 'github', url: 'https://github.com/laveesh21', iconPlaceholder: '[GH]' },
      { id: 'linkedin', url: 'https://linkedin.com/in/laveesh21', iconPlaceholder: '[LI]' },
      { id: 'instagram', url: 'https://instagram.com/laveesh_21', iconPlaceholder: '[IG]' }
    ],
    copyrightText: `© ${new Date().getFullYear()} Laveesh Tomar. All rights reserved.`
  }
};
