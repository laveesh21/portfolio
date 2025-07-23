import { portfolioContent } from '../../portfolioContent';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const { socialLinks, copyrightText } = portfolioContent.footer;
const { name: headerName } = portfolioContent.header; // For consistent branding

const Footer = () => {
  return (
    <footer className="py-8 bg-black border-t border-white/5" id="footer">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-bold mb-6 md:mb-0">
            <span className="text-white">{headerName}</span>
            <div className="text-sm text-white/40 mt-2 font-normal">Fullstack Web Developer</div>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map(link => {
              // Get the appropriate icon based on the social media platform
              const getIcon = (id: string) => {
                switch (id) {
                  case 'github': return <FaGithub className="w-5 h-5" />;
                  case 'linkedin': return <FaLinkedinIn className="w-5 h-5" />;
                  case 'instagram': return <FaInstagram className="w-5 h-5" />;
                  default: return null;
                }
              };
              
              return (
                <a 
                  key={link.id} 
                  href={link.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-all duration-300 flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 hover:scale-110" 
                  aria-label={link.id}
                >
                  {getIcon(link.id)}
                </a>
              );
            })}
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-white/40 text-sm">
            <div>{copyrightText}</div>
            <div className="mt-4 md:mt-0">Made with React + TypeScript + Tailwind</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
