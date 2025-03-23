import React, { ReactNode } from 'react';
import { useAppealForm } from '../context/AppealFormContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface FormStepContainerProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  canContinue?: boolean;
  isLastStep?: boolean;
  onContinue?: () => boolean | void;
  steps: { label: string; isOptional: boolean }[];
  disableContinue?: boolean;
}

const FormStepContainer: React.FC<FormStepContainerProps> = ({
  children,
  title,
  subtitle,
  canContinue = true,
  isLastStep = false,
  onContinue,
  steps,
  disableContinue = false
}) => {
  const { currentStep, setCurrentStep } = useAppealForm();

  const handleNext = () => {
    if (onContinue) {
      const canProceed = onContinue();
      // Only proceed to next step if onContinue returns true or undefined
      if (canProceed === false) {
        return;
      }
    }
    
    // Move to next step if allowed
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="step-container glass-card p-8 animate-fade-in">
      <h2 className="form-heading">{title}</h2>
      {subtitle && <p className="form-subheading">{subtitle}</p>}
      
      <div className="mb-8">{children}</div>
      
      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={!canContinue || disableContinue}
          className="button-primary flex items-center gap-2"
        >
          {isLastStep ? 'Generate Appeal' : 'Continue'}
          {!isLastStep && <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="mt-8 text-xs text-center text-muted-foreground">
        Step {currentStep + 1} of {steps.length}
        {steps[currentStep]?.isOptional && " (Optional)"}
      </div>
    </div>
  );
};

export default FormStepContainer;
