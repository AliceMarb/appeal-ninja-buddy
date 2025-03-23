import React, { useEffect } from 'react';
import { useAppealForm } from '../context/AppealFormContext';
import Header from '../components/Header';
import NameStep from '../components/FormSteps/NameStep';
import DenialLetterStep from '../components/FormSteps/DenialLetterStep';
import MedicalHistoryStep from '../components/FormSteps/MedicalHistoryStep';
import PolicyInfoStep from '../components/FormSteps/PolicyInfoStep';
import PolicyDocumentStep from '../components/FormSteps/PolicyDocumentStep';
import GeneratingAppeal from '../components/GeneratingAppeal';
import AppealResults from '../components/AppealResults';
import { toast } from 'sonner';

const formSteps = [
  { label: 'Personal Info', isOptional: false },
  { label: 'Denial Letter', isOptional: false },
  { label: 'Medical History', isOptional: true },
  { label: 'Policy Info', isOptional: true },
  { label: 'Policy Document', isOptional: true },
];

const Index = () => {
  const {
    formState,
    currentStep,
    setCurrentStep,
    isGenerating,
    setIsGenerating,
    appealResult,
    setAppealResult,
    submitAppeal
  } = useAppealForm();

  useEffect(() => {
    // If we're at the last step + 1 and generating is true, start the appeal generation process
    if (currentStep === formSteps.length && isGenerating) {
      submitAppeal();
    }
  }, [currentStep, isGenerating, submitAppeal]);

  const renderCurrentStep = () => {
    if (appealResult) {
      return <AppealResults />;
    }
    
    if (isGenerating) {
      return <GeneratingAppeal />;
    }
    
    switch (currentStep) {
      case 0:
        return <NameStep steps={formSteps} />;
      case 1:
        return <DenialLetterStep steps={formSteps} />;
      case 2:
        return <MedicalHistoryStep steps={formSteps} />;
      case 3:
        return <PolicyInfoStep steps={formSteps} />;
      case 4:
        return <PolicyDocumentStep steps={formSteps} />;
      default:
        setIsGenerating(true);
        return <GeneratingAppeal />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md mb-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-display font-medium text-center mb-2">
            Claim<span className="text-primary">Buddy</span>
          </h1>
          <p className="text-center text-muted-foreground">
            Your lawyer bestie for healthcare appeals
          </p>
        </div>
        
        {renderCurrentStep()}
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>&#169; {new Date().getFullYear()} ClaimBuddy. Your healthcare advocate.</p>
      </footer>
    </div>
  );
};

export default Index;
