export const portfolioContent = {
  faq: {
    title: "Know More About Me",
    questions: [
      {
        id: 1,
        question: "What inspired you to become a developer?",
        answer: "My journey into development started with a fascination for creating things. The ability to transform ideas into functional applications and solve real-world problems through code captured my interest, leading me to pursue this path professionally."
      },
      {
        id: 2,
        question: "What's your preferred tech stack and why?",
        answer: "I particularly enjoy working with React, TypeScript, and Node.js. This stack offers great developer experience, strong typing, and excellent performance. The robust ecosystem and community support make it ideal for building modern web applications."
      },
      {
        id: 3,
        question: "How do you approach learning new technologies?",
        answer: "I believe in hands-on learning. When exploring new technologies, I start with official documentation, build small projects, and gradually scale up to more complex applications. I also actively participate in tech communities and share knowledge with fellow developers."
      },
      {
        id: 4,
        question: "What's your favorite project you've worked on?",
        answer: "One of my most rewarding projects was developing a real-time collaboration platform. It challenged me to deal with complex state management, WebSocket integration, and performance optimization, ultimately helping me grow as a developer."
      }
    ]
  },

  header: {
    name: "Laveesh Tomar",
    navLinks: [
      { id: 'home', href: '#hero', iconPlaceholder: '[H]', label: 'Home' }, // Special case for home/name
      { id: 'about', href: '#about', iconPlaceholder: '[A]', label: 'About' },
      { id: 'projects', href: '#projects', iconPlaceholder: '[P]', label: 'Projects' },
      { id: 'experience', href: '#experience', iconPlaceholder: '[E]', label: 'Experience' },
      { id: 'contact', href: '#contact', iconPlaceholder: '[C]', label: 'Contact' },
    ],
    mobileMenuButton: 'Open main menu',
    mobileMenuIcon: '☰'
  },



  hero: {
    location: "Roorkee, Uttarakhand",
    title: "Fullstack",
    titleImage: "LaveeshProfile00.jpg", // This will be a placeholder until you add an actual image
    titleAfter: "Software Developer",
    subtitle: "& Indie game developer",
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
    description1: "I am experienced in building dynamic, responsive web applications and professional exprerience as a backend developer. With a strong foundation in both frontend and backend technologies, I create seamless user experiences and robust server-side solutions.",
    description2: "I have also worked with unity game development ",
    details: [
      { label: "Location", value: "Roorkee, Uttarakhand" },
      { label: "Email", value: "laveeshtomar2681@gmail.com" },
      { label: "Availability", value: "Open to opportunities" }
    ],
    profilePic: "LaveeshProfile00.jpeg",
    resumeButtonText: "Download Resume",
    techStack: {
      title: "Tech Stack",
      titleHighlight: "Stack",
      skills: [
        {
          name: "React",
          logo: "/src/assets/tech-logos/react.svg",
          category: "Frontend",
          color: "text-blue-400",
          bgColor: "bg-blue-400/10"
        },
        {
          name: "JavaScript",
          logo: "/src/assets/tech-logos/javascript.svg",
          category: "Language",
          color: "text-yellow-400",
          bgColor: "bg-yellow-400/10"
        },
        {
          name: "Tailwind CSS",
          logo: "/src/assets/tech-logos/tailwindcss.svg",
          category: "Frontend",
          color: "text-cyan-400",
          bgColor: "bg-cyan-400/10"
        },
        {
          name: "Node.js",
          logo: "/src/assets/tech-logos/nodejs.svg",
          category: "Backend",
          color: "text-green-400",
          bgColor: "bg-green-400/10"
        },
        {
          name: "SQL",
          logo: "/src/assets/tech-logos/sql.svg",
          category: "Backend",
          color: "text-blue-500",
          bgColor: "bg-blue-500/10"
        },
        {
          name: "Java",
          logo: "/src/assets/tech-logos/java.svg",
          category: "Backend",
          color: "text-orange-400",
          bgColor: "bg-orange-400/10"
        },
        {
          name: "TypeScript",
          logo: "/src/assets/tech-logos/typescript.svg",
          category: "Language",
          color: "text-blue-500",
          bgColor: "bg-blue-500/10"
        },
        {
          name: "MongoDB",
          logo: "/src/assets/tech-logos/mongodb.svg",
          category: "Database",
          color: "text-green-500",
          bgColor: "bg-green-500/10"
        },
        {
          name: "Firebase",
          logo: "/src/assets/tech-logos/firebase.svg",
          category: "Backend",
          color: "text-orange-400",
          bgColor: "bg-orange-400/10"
        },
        {
          name: "AWS",
          logo: "/src/assets/tech-logos/aws.svg",
          category: "Cloud",
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10"
        },
        {
          name: "Git",
          logo: "/src/assets/tech-logos/git.svg",
          category: "Tool",
          color: "text-gray-400",
          bgColor: "bg-gray-400/10"
        }
        ,{
          name: "Linux",
          logo: "/src/assets/tech-logos/linux.svg",
          category: "Tool",
          color: "text-yellow-300",
          bgColor: "bg-yellow-300/10"
        }
      ]
    }
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
    titleHighlight: "EXPERIENCE",
    experienceItems: [
      {
        id: 1,
        jobTitle: "Web Development Intern",
        company: "Kindlife",
        duration: "Sep 2024 - Sep 2025",
        description: [
          "As a backend developer intern at Kindlife (a growing e-commerce platform), I've worked across multiple critical backend systems — from core business logic to third-party integrations.",
          "My work includes building new features, fixing bugs that directly impact business performance, and optimizing backend performance across the board.",
          "<b>Tech Used</b>: PHP, Javascript, MySQL, Redis, CS-Cart, Smarty, AJAX, Rest APIs, Git, SVN",
        ],
        points: [
          "Integrated EKART logistics API into the platform backend, improving shipment tracking and delivery efficiency.",
          "Collaborated on GoKwik payment flow fixes, reducing failures and improving conversion",
          "Built and maintained REST APIs to support internal operations and external tools",
          "Worked extensively with SQL query optimization, reducing redundant calls and improving performance",
          "Fixed and improved AJAX-based logic in CS-Cart using Smarty, increasing responsiveness and code clarity",
          "Proactively identified and fixed issues in coupon systems, improving user experience and revenue impact",
          "Learned and applied principles of clean architecture, DRY code, and collaborative development under guidance from senior engineers",
        ]
      },
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
      { type: "Location", value: "Roorkee, Uttarakhand, India" },
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
