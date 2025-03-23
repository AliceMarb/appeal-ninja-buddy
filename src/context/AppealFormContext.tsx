
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormState {
  fullName: string;
  denialLetter: string;
  medicalHistory: string;
  policyNumber: string;
  memberId: string;
  policyDocument: File | null;
}

interface AppealFormContextType {
  formState: FormState;
  updateForm: (field: keyof FormState, value: any) => void;
  resetForm: () => void;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  appealResult: AppealResult | null;
  setAppealResult: React.Dispatch<React.SetStateAction<AppealResult | null>>;
}

interface AppealActionItem {
  title: string;
  description: string;
}

interface AppealResult {
  actionPlan: AppealActionItem[];
  appealLetter: string;
}

const initialFormState: FormState = {
  fullName: '',
  denialLetter: '',
  medicalHistory: '',
  policyNumber: '',
  memberId: '',
  policyDocument: null,
};

const AppealFormContext = createContext<AppealFormContextType | undefined>(undefined);

export const AppealFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [appealResult, setAppealResult] = useState<AppealResult | null>(null);

  const updateForm = (field: keyof FormState, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormState(initialFormState);
    setCurrentStep(0);
    setAppealResult(null);
  };

  return (
    <AppealFormContext.Provider value={{
      formState,
      updateForm,
      resetForm,
      currentStep,
      setCurrentStep,
      isGenerating,
      setIsGenerating,
      appealResult,
      setAppealResult
    }}>
      {children}
    </AppealFormContext.Provider>
  );
};

export const useAppealForm = (): AppealFormContextType => {
  const context = useContext(AppealFormContext);
  if (!context) {
    throw new Error('useAppealForm must be used within an AppealFormProvider');
  }
  return context;
};
