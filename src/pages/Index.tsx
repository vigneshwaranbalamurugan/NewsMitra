
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ChatInterface from '../components/ChatInterface';
import NewsHighlight from '../components/NewsHighlight';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ChatInterface />
      <NewsHighlight />
      <Footer />
    </div>
  );
};

export default Index;
