
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "false" ? false : true;
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 useEffect(() => {
    // Apply dark mode class based on state
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Store preference in localStorage
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleTheme = () => setDarkMode(!darkMode);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4
      ${scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          NewsMitra
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
            <NavLink onClick={() => scrollToSection("home")} label="Home" />
            <NavLink onClick={() => scrollToSection("chat")} label="Chat" />
            <NavLink onClick={() => scrollToSection("features")} label="Recent Affairs" />
            <NavLink onClick={() => scrollToSection("contact")} label="Contact" />
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="hidden md:block bg-primary hover:bg-primary/70 text-white px-5 py-2 rounded-full transition-colors cursor-not-allowed">
            Sign In
          </button>
          <button 
            className="md:hidden text-gray-600 dark:text-gray-300"
            onClick={toggleMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full px-6 py-4 bg-white dark:bg-gray-900 shadow-md transition-all duration-300 ease-in-out transform ${
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-4">
          <MobileNavLink href="#home" label="Home" onClick={toggleMenu} />
          <MobileNavLink href="#chat" label="Chat" onClick={toggleMenu} />
          <MobileNavLink href="#features" label="Recent Affairs" onClick={toggleMenu} />
          <MobileNavLink href="#contact" label="Contact" onClick={toggleMenu} />
          <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-full transition-colors mt-2 cursor-not-allowed">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{  label: string; onClick?: () => void }> = ({ label, onClick }) => (
  <a 
    className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium transition-colors cursor-pointer"
    onClick={onClick}
  >
    {label}
  </a>
);

const MobileNavLink: React.FC<{ href: string; label: string; onClick: () => void }> = ({ 
  href, 
  label, 
  onClick 
}) => (
  <a 
    href={href}
    className="text-gray-700 dark:text-gray-200 font-medium py-2 hover:text-primary dark:hover:text-primary transition-colors"
    onClick={onClick}
  >
    {label}
  </a>
);

export default Navbar;
