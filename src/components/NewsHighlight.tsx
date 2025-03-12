
import React, { useState } from 'react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'Politics' | 'Economy' | 'Sports' | 'Technology' | 'Science';
  image: string;
  date: string;
}

const NEWS_DATA: NewsItem[] = [
  {
    id: '1',
    title: 'Cabinet Approves New Education Policy Implementation',
    summary: 'The Union Cabinet has approved the implementation of the new National Education Policy with focus on skill development and digital learning.',
    category: 'Politics',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop',
    date: '2 hours ago'
  },
  {
    id: '2',
    title: 'RBI Maintains Repo Rate, Projects 6.5% GDP Growth',
    summary: 'The Reserve Bank of India has kept the repo rate unchanged at 4.5% and projected a GDP growth of 6.5% for the current fiscal year.',
    category: 'Economy',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2000&auto=format&fit=crop',
    date: '4 hours ago'
  },
  {
    id: '3',
    title: 'Indian Cricket Team Wins Series Against Australia',
    summary: 'India has clinched the 5-match series against Australia 3-1 with a convincing win in the 4th match at Chennai.',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2000&auto=format&fit=crop',
    date: '6 hours ago'
  },
  {
    id: '4',
    title: 'Indian Tech Startups Raised $2.8 Billion in Q3',
    summary: 'Indian technology startups have raised $2.8 billion in funding during the third quarter of 2023, showing a 15% increase from the previous quarter.',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2000&auto=format&fit=crop',
    date: '8 hours ago'
  },
  {
    id: '5',
    title: 'ISRO Successfully Tests New Cryogenic Engine',
    summary: 'The Indian Space Research Organisation has successfully tested a new cryogenic engine that will power future heavy-lift launch vehicles.',
    category: 'Science',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa5cb6BwKkGvLFKH5J1ygjn9fqwDvOz6mn0g&s',
    date: '10 hours ago'
  }
];

const NewsHighlight: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Politics', 'Economy', 'Sports', 'Technology', 'Science'];
  
  const filteredNews = activeCategory === 'All' 
    ? NEWS_DATA 
    : NEWS_DATA.filter(news => news.category === activeCategory);
  
  return (
    <section id="features" className="py-24 px-6 md:px-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent inline-block">
            Latest News Highlights
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay updated with the most recent developments across India. Our AI curates important news from various categories.
          </p>
        </div>
        
        <div className="flex justify-center mb-8 overflow-x-auto pb-2 animate-fade-in stagger-1">
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news, index) => (
            <div 
              key={news.id}
              className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {news.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{news.date}</span>
                </div>
                
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">{news.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{news.summary}</p>
                
                <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center transition-colors cursor-not-allowed">
                  Read Full Story
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsHighlight;
