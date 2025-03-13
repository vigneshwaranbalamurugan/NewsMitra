
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, ChevronRight, Maximize, Minimize } from 'lucide-react';
import {
  GoogleGenerativeAI,
} from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant for Indian news and current affairs. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [suggestions] = useState([
    'Tell me about recent elections in India',
    "What's happening with the Indian economy?",
    'Latest cricket news from India',
    'Recent tech developments in India',
    'Current political situation in India'
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    }
    }, [messages]);
  
  const toggleFullscreen =async () => {
    setIsFullscreen((prev) => !prev);
  };
  
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI response
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: await getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const getBotResponse = async (message: string): Promise<string> => {
    // Mock responses based on user input
 
    const apiKey =import.meta.env.VITE_GENERATIVE_AI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: "Your are an AI Chatbot to provide information about  Current Affairs Chatbot (India-Specific)\nObjective:\nYou must provide up-to-date information on current affairs in India across various domains such as economy, sports, politics,Cinema,Indian Citizens like actors,actress,Sportsmans  and other relevant topics.\nGeneral Rules:\nYou must be strictly India-specific and only provide news and updates related to India.\nYou must ignore or refuse to answer queries about other countries unless they are directly related to India’s international relations or global impact on India.\nIf the user requests anything unrelated to Indian current affairs, you must politely refuse by saying, \"I don’t have permission to provide that information,I only able to give information about India's current affairs.\"\nCategories of News You Must Cover:\nEconomy:\nYou must provide updates on stock market trends, RBI policies, economic growth, inflation, industries, and financial regulations.\nPolitics:\nYou must cover elections, government policies, parliament updates, Supreme Court rulings, and major political developments.\nSports:\nYou must deliver updates on cricket, football, hockey, badminton, Olympic achievements, IPL matches, and Indian athletes’ performances.\nTechnology & Science:\nYou must provide information on ISRO missions, tech innovations, government digital policies, AI developments, and startup ecosystem growth.\nNational Security & Defense:\nYou must report on military advancements, defense deals, cybersecurity measures, and border security updates.\nEnvironment & Climate:\nYou must share information on pollution control measures, climate action policies, disaster management, and environmental protection schemes.\nEducation & Society:\nYou must provide updates on the National Education Policy (NEP), university rankings, scholarships, and government initiatives for education and social development.\nData Sources & Freshness:\nYou must fetch information only from trusted sources such as:\nPress Information Bureau (PIB)\nThe Hindu, Times of India, The Indian Express\nRBI, SEBI, Ministry of Finance official updates\nBCCI, AIFF, ISRO, DRDO, and other verified government organizations\nYou must ensure that the information is real-time or within the last 24 hours.\nResponse Format:\nYou must provide a short and concise summary of the news.\nYou must attribute sources by mentioning where the information was obtained from (e.g., \"According to PIB reports...\").\nYou must present structured information using key points, statistics, or bullet lists for clarity.\nUser Query Handling:\nYou must understand and process natural language queries like:\n\"What are the latest economic updates in India?\"\n\"Tell me today’s top political news in India.\"\n\"Who won the last IPL match?\"\nIf you do not have relevant data, you must politely refuse to answer rather than provide false or outdated information.\nBias & Neutrality:\nYou must remain neutral and avoid any political bias or personal opinions.\nYou must provide only factual news without taking sides or promoting any ideology.\nProhibited Content:\nYou must not provide fake news, rumors, or unverified information.\nYou must not engage in personal attacks, hate speech, or misinformation.\nTechnical Implementation Guidelines:\nYou must use web scraping or API integration from news sources to ensure real-time updates.\nYou must leverage NLP models like GPT, BERT, or custom-trained AI to process and understand user queries.\nYou must deploy the chatbot on a website, mobile app, or as a WhatsApp bot for accessibility.\nYou must enable multi-language support (English, Hindi, and regional languages) for broader reach.\n\n",
    });
    
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };
    
    async function run() {
      const chatSession = model.startChat({
        generationConfig,
        history: [
        ],
      });
    
      const result = await chatSession.sendMessage(message);
      return result.response.text();
    }
    
    return run();
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };
  
  return (
    <section 
      id="chat" 
      className={`transition-all duration-300 ease-in-out ${
        isFullscreen 
          ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900 py-6 px-4' 
          : 'py-24 px-6 md:px-12'
      }`}
    >
      <div className={`container mx-auto ${isFullscreen ? 'max-w-full h-full' : 'max-w-6xl'}`}>
        <div className={`text-center mb-8 animate-fade-in ${isFullscreen ? 'flex justify-between items-center' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent inline-block">
            Chat with NewsMitra AI
          </h2>
          {isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              aria-label="Exit fullscreen"
            >
              <Minimize className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          )}
        </div>
        
        <div 
          ref={chatContainerRef}
          className={`glass mx-auto rounded-2xl overflow-hidden shadow-xl animate-fade-in stagger-1 ${
            isFullscreen 
              ? 'w-full h-[calc(100vh-120px)]' 
              : 'max-w-4xl h-[500px]'
          }`}
        >
          <div className="h-14 bg-primary flex items-center justify-between px-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-sm">IA</span>
              </div>
              <div className="ml-3">
                <p className="text-white font-medium">NewsMitra Assistant</p>
              </div>
            </div>
            
            {!isFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Enter fullscreen"
              >
                <Maximize className="h-4 w-4 text-white" />
              </button>
            )}
          </div>
          
          <div className={`flex flex-col scrollbar-custom ${isFullscreen ? 'h-[calc(100%-56px)]' : 'h-[calc(500px-56px)]'}`}>
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-primary text-white rounded-tr-none'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm">
                      <ReactMarkdown>
                        {message.text}
                        </ReactMarkdown>
                    </p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="max-w-[80%] p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"></div>
                      <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2 mb-4">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex items-center text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 
                    text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {suggestion}
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your question about Indian affairs..."
                  className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button 
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors cursor-not-allowed"
                >
                  <Mic className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className={`p-3 rounded-full ${
                    inputValue.trim()
                      ? 'bg-primary hover:bg-primary/90 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                  } transition-colors`}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
