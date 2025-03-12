import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, Search, MessageSquare, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Optional: countdown timer for auto-redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 md:px-12 py-16">
        <div className="max-w-4xl w-full text-center">
          {/* Animated 404 */}
          <h1 className="text-[120px] md:text-[150px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/70 to-primary/50 animate-pulse">
            404
          </h1>
          
          {/* Message */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Oops! This page seems lost in history.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            But don't worry, our AI can still keep you updated on the latest affairs!
            {countdown > 0 && (
              <span className="block text-sm mt-2 text-gray-500 dark:text-gray-400">
                Redirecting to home in {countdown} seconds...
              </span>
            )}
          </p>
          
          {/* Illustration */}
          <div className="w-64 h-64 mx-auto mb-8 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center animate-bounce">
                <MessageSquare className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>
          
          {/* Recovery Options */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <Link 
              to="/" 
              className="py-3 px-8 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center font-medium transition-colors"
            >
              <Home className="mr-2 h-5 w-5" />
              Go to Home
            </Link>
            <Link 
              to="/#chat" 
              className="py-3 px-8 bg-secondary hover:bg-secondary/90 text-white rounded-full flex items-center font-medium transition-colors"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Ask AI for News
            </Link>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for trending topics..."
                className="w-full p-4 pl-12 pr-10 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                onClick={() => window.location.href = `/#chat?query=${searchQuery}`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 justify-center">
              {["Elections", "Cricket", "Economy", "Technology", "Politics"].map((topic) => (
                <button 
                  key={topic}
                  onClick={() => window.location.href = `/#chat?query=${topic}`}
                  className="text-xs bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
          
          {/* AI Suggestion */}
          <div className="glass max-w-md mx-auto p-4 rounded-xl mb-8 bg-white/70 dark:bg-black/30 backdrop-blur-lg border border-white/20 dark:border-white/10">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">IA</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Want the latest news? Try our chatbot for real-time updates on Indian affairs!
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;