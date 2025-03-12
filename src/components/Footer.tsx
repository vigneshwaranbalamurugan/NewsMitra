
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer id="contact" className="bg-white dark:bg-gray-900 py-12 px-6 md:px-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4">
              NewsMitra
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your AI-powered assistant for Indian current affairs and news updates.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/vigneshwaranbalamurugan" className="text-gray-500 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/vigneshwaran30/" className="text-gray-500 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:vigneshsobalamurugan2005@gmail.com" className="text-gray-500 hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a  onClick={()=>{scrollToSection('home')}} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer">Home</a></li>
              <li><a  onClick={()=>{scrollToSection('chat')}}  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer">Chat</a></li>
              <li><a  onClick={()=>{scrollToSection('features')}}   className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer">News</a></li>
              <li><a  onClick={()=>{scrollToSection('home')}} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer">About</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Categories</h4>
            <ul className="space-y-2">
              <li><a href="/politics" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Politics</a></li>
              <li><a href="/economy" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Economy</a></li>
              <li><a href="/sports" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Sports</a></li>
              <li><a href="/technology" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Technology</a></li>
              <li><a href="/science" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Science</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/legal" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="/disclaimer" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} NewsMitra. All rights reserved.
          </p>
          <div>
            <span className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-3 py-1 rounded-full">
              Powered by AI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
