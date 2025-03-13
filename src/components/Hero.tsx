
import React, { useEffect, useState, useRef } from 'react';
import { MessageCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1
    });

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const typingTexts = [
    "नमस्कार, भारत की नवीनतम खबरों के बारे में पूछें",
    "Ask me about India's latest news",
    "Elections, Sports, Economy - I'm updated on it all"
  ];

  useEffect(() => {
    const interval = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % typingTexts.length);
    }, 4000); // Change text every 4 seconds

    return () => clearTimeout(interval);
  }, [currentIndex, typingTexts.length]);


  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 px-6 md:px-12 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800"></div>
        <div className="absolute top-48 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-48 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>AI-Powered News Assistant</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white text-balance leading-tight">
              Stay Updated with{' '}
              <span className="relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  India's Latest Affairs
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded"></span>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg">
              Get AI-curated news in real-time. Ask questions, get summaries, and stay informed on politics, economy, sports, and more.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                onClick={()=>{scrollToSection("chat")}}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:scale-105 cursor-pointer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Chatting
              </a>
              <a
                onClick={()=>{scrollToSection("features")}}
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-full transition-all duration-300 cursor-pointer"
              >
                Explore Features
              </a>
            </div>
          </div>
          
          <div 
            className={`relative mt-10 lg:mt-0 ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}
          >
            <div className="relative mx-auto max-w-md">
              <div className="glass rounded-3xl p-6 backdrop-blur-lg shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">NewsMitra AI</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Online • Updated 5m ago</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none max-w-[85%]">
                    <p className="text-sm">
                      Hello! I'm your AI assistant for Indian news and current affairs. How can I help you today?
                    </p>
                  </div>
                  
                  <div className="typing-container overflow-hidden h-14">
                  {typingTexts.map((text, index) => (
        <p
          key={index}
          className={`absolute whitespace-nowrap overflow-hidden text-sm text-gray-600 dark:text-gray-300 py-2 mb-2 transition-opacity duration-500 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            animation: index === currentIndex ? "typing 3s steps(30, end) forwards" : "none",
          }}
        >
          {text}
        </p>
      ))}
                  </div>
                  
                  <div className="flex mt-4">
                    <input
                      type="text"
                      placeholder="Ask about recent news..."
                      className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-not-allowed"
                      disabled={true}
                    />
                    <button className="ml-2 bg-primary text-white rounded-full p-3 cursor-not-allowed">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 h-12 w-12 bg-secondary rounded-full"></div>
              <div className="absolute -top-6 -right-6 h-8 w-8 bg-accent rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
