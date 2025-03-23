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
  useMockResponse: boolean; 
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
  toggleMockResponse: () => void;
}

interface AppealResult {
  message?: string;
  data?: {
    name: string;
    dob: string;
    denial_letter: string;
    policy_doc_file_id: string;
    additional_info: string;
  };
  result?: {
    decision: string;
    action_steps: string[];
    appeal_letter: string;
  };
}

const initialFormState: FormState = {
  fullName: '',
  denialLetter: '',
  medicalHistory: '',
  policyNumber: '',
  memberId: '',
  policyDocument: null,
  policyDocumentFileId: '',
  useMockResponse: false, 
};

const mockApiResponse = {
  message: "Appeal submission received successfully",
  data: {
    name: "Mock User",
    dob: "",
    denial_letter: "This is a mock denial letter",
    policy_doc_file_id: "mock-file-id-12345",
    additional_info: "Mock medical history"
  },
  result: {
    decision: "appeal",
    action_steps: [
      "Review the denial letter and identify the insurer's reason for denial.",
      "Gather medical records, a letter of medical necessity, and relevant insurance policy sections.",
      "Draft and submit an appeal letter with supporting documents.",
      "Follow up with the insurance provider for a decision update.",
      "Seek external assistance if the appeal is denied (e.g., state insurance department)."
    ],
    appeal_letter: "Dear [Insurance Company],\n\nI am writing to formally appeal the denial of my claim [Claim Number] for [Service/Treatment], provided on [Date of Service] by [Healthcare Provider]. The denial reason stated was '[Denial Reason].'\n\nAccording to my physician, [Doctor Name], this treatment was medically necessary for my condition, as outlined in the attached supporting documentation. Additionally, per Section [Policy Section] of my insurance policy, this service should be covered.\n\nI kindly request a reconsideration of this decision based on the provided evidence. Please find enclosed medical records and a physician's letter supporting my appeal.\n\nThank you for your time and attention to this matter. I look forward to your response.\n\nSincerely,\n[Your Name]\n[Your Contact Information]\n[Your Policy Number]"
  }
};

const AppealFormContext = createContext<AppealFormContextType | undefined>(undefined);

const generateCurlCommand = (url: string, options: RequestInit): string => {
  const { method = 'GET', headers = {}, body } = options;
  
  let curlCommand = `curl -X ${method} \\
`;
  
  Object.entries(headers).forEach(([key, value]) => {
    curlCommand += `  -H '${key}: ${value}' \\
`;
  });
  
  if (body) {
    if (typeof body === 'string') {
      if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        const params = new URLSearchParams(body);
        const formattedBody = Array.from(params.entries())
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&');
        curlCommand += `  -d '${formattedBody}' \\
`;
      } else {
        curlCommand += `  -d '${body}' \\
`;
      }
    } else {
      curlCommand += `  -d 'Complex body type not shown' \\
`;
    }
  }
  
  const actualUrl = url.replace('/api', 'https://fogg-your-claims-be-896897809220.us-central1.run.app');
  curlCommand += `  '${actualUrl}'`;
  
  return curlCommand;
};

const fetchWithBackoff = async (
  url: string,
  options: RequestInit,
  maxRetries = 3,
  baseDelay = 1000 
): Promise<Response> => {
  let retries = 0;
  
  console.log('\n==== EQUIVALENT CURL COMMAND ====');
  console.log(generateCurlCommand(url, options));
  console.log('================================\n');
  
  while (retries < maxRetries) {
    try {
      const response = await fetch(url, options);
      
      console.log(`Response status: ${response.status} ${response.statusText}`);
      
      const responseClone = response.clone();
      try {
        const responseBody = await responseClone.text();
        console.log('Response body:', responseBody);
        
        try {
          const jsonBody = JSON.parse(responseBody);
          console.log('Response JSON:', jsonBody);
        } catch (e) {
          // Not JSON, already logged as text
        }
      } catch (e) {
        console.log('Could not read response body for logging');
      }
      
      if (response.ok || (response.status >= 400 && response.status < 500)) {
        return response;
      }
      
      throw new Error(`Server error: ${response.status}`);
    } catch (error) {
      retries++;
      
      if (retries >= maxRetries) {
        console.error(`Failed after ${maxRetries} retries:`, error);
        throw error; 
      }
      
      const delay = baseDelay * Math.pow(2, retries - 1) + Math.random() * 1000;
      console.log(`Retry ${retries}/${maxRetries} after ${Math.round(delay)}ms`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
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
  
  const toggleMockResponse = () => {
    const currentValue = formState.useMockResponse;
    setFormState(prev => ({
      ...prev,
      useMockResponse: !currentValue
    }));
    console.log(`Mock response ${!currentValue ? 'enabled' : 'disabled'}`);
    toast.info(`Mock response ${!currentValue ? 'enabled' : 'disabled'}`);
  };

  const submitAppeal = async () => {
    setIsGenerating(true);
    
    try {
      console.log('\n==== POLICY DOCUMENT FILE ID FOR API CALL ====');
      console.log(formState.policyDocumentFileId);
      console.log('============================================\n');
      
      console.log('\n==== DENIAL LETTER CONTENT ====');
      console.log(formState.denialLetter);
      console.log('================================\n');
      
      console.log('\n==== MOCK RESPONSE FLAG ====');
      console.log('Using mock response:', formState.useMockResponse);
      console.log('============================\n');
      
      if (formState.useMockResponse) {
        console.log('\n==== USING MOCK RESPONSE ====');
        console.log('Mock response:', mockApiResponse);
        console.log('=============================\n');
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const formattedResult: AppealResult = {
          message: mockApiResponse.message,
          data: {
            ...mockApiResponse.data,
            name: formState.fullName || mockApiResponse.data.name,
            denial_letter: formState.denialLetter || mockApiResponse.data.denial_letter,
            policy_doc_file_id: formState.policyDocumentFileId || mockApiResponse.data.policy_doc_file_id,
            additional_info: formState.medicalHistory || mockApiResponse.data.additional_info
          },
          result: mockApiResponse.result
        };
        
        console.log('Setting formatted mock result:', formattedResult);
        setAppealResult(formattedResult);
        toast.success('Your appeal has been generated successfully! (MOCK)');
        setIsGenerating(false);
        return;
      }
      
      const formData = new URLSearchParams();
      formData.append('name', formState.fullName);
      formData.append('dob', ''); 
      formData.append('policy_doc_file_id', formState.policyDocumentFileId);
      formData.append('denial_letter', formState.denialLetter); 
      formData.append('additional_info', formState.medicalHistory);
      
      const apiUrl = '/api/submit-appeal';
      
      console.log('Submitting appeal to:', apiUrl);
      console.log('Request body:', {
        name: formState.fullName,
        dob: '',
        policy_doc_file_id: formState.policyDocumentFileId,
        denial_letter: formState.denialLetter, 
        additional_info: formState.medicalHistory
      });
      
      const response = await fetchWithBackoff(apiUrl, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      }, 3, 1000); 
      
      let data;
      try {
        data = await response.json();
        
        console.log('\n==== FULL API RESPONSE ====');
        console.log('Status:', response.status, response.statusText);
        console.log('Headers:', Object.fromEntries([...response.headers.entries()]));
        console.log('Body:', data);
        console.log('============================\n');
      } catch (parseError) {
        console.error('Error parsing response JSON:', parseError);
        const textResponse = await response.text();
        console.log('Raw response text:', textResponse);
        throw new Error('Failed to parse response from server');
      }
      
      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`);
      }
      
      const formattedResult: AppealResult = {
        message: data.message,
        data: data.data,
        result: data.result
      };
      
      console.log('Setting formatted appeal result:', formattedResult);
      setAppealResult(formattedResult);
      toast.success('Your appeal has been generated successfully!');
    } catch (error) {
      console.error('\n==== ERROR SUBMITTING APPEAL ====');
      console.error(error);
      console.error('==================================\n');
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
        submitAppeal,
        toggleMockResponse
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
