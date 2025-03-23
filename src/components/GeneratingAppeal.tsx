
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Reading your denial letter...",
  "Analyzing insurance policy guidelines...",
  "Researching relevant medical codes...",
  "Identifying appeal opportunities...",
  "Crafting your personalized appeal letter...",
  "Reviewing legal precedents...",
  "Finalizing your action plan..."
];

const GeneratingAppeal: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center animate-fade-in">
      <div className="glass-card p-8 w-full max-w-md text-center space-y-8">
        <div className="flex justify-center mb-4">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse-soft"></div>
            <div className="absolute inset-2 rounded-full border-4 border-t-primary border-primary/20 animate-spin"></div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-2xl font-display animate-fade-in">
            Generating Your Appeal
          </h2>
          <p className="text-muted-foreground h-12 flex items-center justify-center animate-fade-in">
            {loadingMessages[messageIndex]}
          </p>
        </div>
        
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div className="h-full bg-primary shimmer" style={{ width: '80%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default GeneratingAppeal;
