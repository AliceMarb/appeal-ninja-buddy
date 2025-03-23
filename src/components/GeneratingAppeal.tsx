
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Reading your denial letter...",
  "Analyzing insurance policy guidelines...",
  "Researching relevant medical codes...",
  "Identifying appeal opportunities...",
  "Examining medical necessity criteria...",
  "Reviewing your medical history...",
  "Checking for coding errors...",
  "Comparing to similar successful appeals...",
  "Finding supporting clinical evidence...",
  "Consulting medical literature...",
  "Identifying policy contradictions...",
  "Crafting your personalized appeal letter...",
  "Structuring your argument...",
  "Reviewing legal precedents...",
  "Incorporating expert opinions...",
  "Adding supporting documentation...",
  "Finalizing your action plan..."
];

const GeneratingAppeal: React.FC = () => {
  const [completedMessages, setCompletedMessages] = useState<number[]>([]);
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    if (currentMessage >= loadingMessages.length) return;
    
    const timeout = setTimeout(() => {
      setCompletedMessages(prev => [...prev, currentMessage]);
      setCurrentMessage(prev => prev + 1);
    }, 3500);

    return () => clearTimeout(timeout);
  }, [currentMessage]);

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
          <div className="text-left space-y-2 max-h-48 overflow-y-auto">
            {loadingMessages.map((message, index) => {
              const isCompleted = completedMessages.includes(index);
              const isCurrent = index === currentMessage;
              
              if (isCompleted || isCurrent) {
                return (
                  <div key={index} className="flex items-center space-x-2 animate-fade-in">
                    {isCompleted ? (
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin flex-shrink-0"></div>
                    )}
                    <p className={`${isCompleted ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {message}
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary shimmer" 
            style={{ width: `${Math.min(100, (completedMessages.length / loadingMessages.length) * 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default GeneratingAppeal;
