
import React from 'react';
import { useAppealForm } from '../context/AppealFormContext';
import { cn } from '@/lib/utils';

interface Step {
  label: string;
  isOptional: boolean;
}

interface ProgressIndicatorProps {
  steps: Step[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps }) => {
  const { currentStep } = useAppealForm();
  
  return (
    <div className="w-full max-w-xs mx-auto mb-8">
      <div className="flex justify-between items-center">
        {steps.map((_, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div 
                className={cn(
                  "h-[2px] flex-1 transition-all duration-500",
                  index <= currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
            <div 
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-500",
                index < currentStep ? "bg-primary" : 
                index === currentStep ? "bg-primary ring-2 ring-primary ring-opacity-30" : 
                "bg-muted"
              )}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
