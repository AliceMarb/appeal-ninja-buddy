import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

interface FormState {
  fullName: string;
  denialLetter: string;
  medicalHistory: string;
  policyNumber: string;
  memberId: string;
  policyDocument: File | null;
  policyDocumentFileId: string;
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
  submitAppeal: () => Promise<void>;
}

interface AppealActionItem {
  title: string;
  description: string;
}

interface AppealResult {
  actionPlan?: AppealActionItem[];
  appealLetter?: string;
  appeal_letter?: string;
}

const initialFormState: FormState = {
  fullName: '',
  denialLetter: '',
  medicalHistory: '',
  policyNumber: '',
  memberId: '',
  policyDocument: null,
  policyDocumentFileId: '',
};

const AppealFormContext = createContext<AppealFormContextType | undefined>(undefined);

// Function to make API requests with exponential backoff
const fetchWithBackoff = async (
  url: string,
  options: RequestInit,
  maxRetries = 3,
  baseDelay = 1000 // Start with 1 second delay
): Promise<Response> => {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      const response = await fetch(url, options);
      
      // If the request was successful or it's a 4xx error (client error), don't retry
      if (response.ok || (response.status >= 400 && response.status < 500)) {
        return response;
      }
      
      // For 5xx errors (server errors), we should retry with backoff
      throw new Error(`Server error: ${response.status}`);
    } catch (error) {
      retries++;
      
      if (retries >= maxRetries) {
        console.error(`Failed after ${maxRetries} retries:`, error);
        throw error; // Re-throw the error after max retries
      }
      
      // Calculate exponential backoff with jitter
      const delay = baseDelay * Math.pow(2, retries - 1) + Math.random() * 1000;
      console.log(`Retry ${retries}/${maxRetries} after ${Math.round(delay)}ms`);
      
      // Wait for the calculated delay before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // This should never be reached due to the throw in the retry loop
  throw new Error('Unexpected error in fetchWithBackoff');
};

export const AppealFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [appealResult, setAppealResult] = useState<AppealResult | null>(null);

  const updateForm = (field: keyof FormState, value: any) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormState(initialFormState);
    setCurrentStep(0);
    setAppealResult(null);
  };

  const submitAppeal = async () => {
    setIsGenerating(true);
    
    try {
      // Log the policy document file ID in a format that's easy to copy
      console.log('\n==== POLICY DOCUMENT FILE ID FOR API CALL ====');
      console.log(formState.policyDocumentFileId);
      console.log('============================================\n');
      
      // Log the denial letter content
      console.log('\n==== DENIAL LETTER CONTENT ====');
      console.log(formState.denialLetter);
      console.log('================================\n');
      
      const formData = new URLSearchParams();
      formData.append('name', formState.fullName);
      formData.append('dob', ''); // Empty as per the example
      formData.append('policy_doc_file_id', formState.policyDocumentFileId);
      formData.append('denial_letter', formState.denialLetter); // Use the actual denial letter text
      formData.append('additional_info', formState.medicalHistory);
      
      // Use the proxy URL to avoid CORS issues
      const apiUrl = '/api/submit-appeal';
      
      // Log the URL and request body
      console.log('Submitting appeal to:', apiUrl);
      console.log('Request body:', {
        name: formState.fullName,
        dob: '',
        policy_doc_file_id: formState.policyDocumentFileId,
        denial_letter: formState.denialLetter, // Show the denial letter in the log
        additional_info: formState.medicalHistory
      });
      
      // Use fetchWithBackoff instead of fetch to implement exponential backoff
      const response = await fetchWithBackoff(apiUrl, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      }, 3, 1000); // Max 3 retries, starting with 1 second delay
      
      const data = await response.json();
      
      // Log the response
      console.log('API Response:', {
        status: response.status,
        statusText: response.statusText,
        data: data
      });
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit appeal');
      }
      
      // Use the actual API response
      setAppealResult(data);
      toast.success('Your appeal has been generated successfully!');
    } catch (error) {
      console.error('Error submitting appeal:', error);
      toast.error('Failed to generate appeal. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AppealFormContext.Provider
      value={{
        formState,
        updateForm,
        resetForm,
        currentStep,
        setCurrentStep,
        isGenerating,
        setIsGenerating,
        appealResult,
        setAppealResult,
        submitAppeal
      }}
    >
      {children}
    </AppealFormContext.Provider>
  );
};

export const useAppealForm = () => {
  const context = useContext(AppealFormContext);
  if (context === undefined) {
    throw new Error('useAppealForm must be used within an AppealFormProvider');
  }
  return context;
};
