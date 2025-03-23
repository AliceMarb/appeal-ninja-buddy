
import React, { useState } from 'react';
import { useAppealForm } from '../../context/AppealFormContext';
import FormStepContainer from '../FormStepContainer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PolicyDocumentStepProps {
  steps: { label: string; isOptional: boolean }[];
}

const PolicyDocumentStep: React.FC<PolicyDocumentStepProps> = ({ steps }) => {
  const { formState, updateForm } = useAppealForm();
  const [file, setFile] = useState<File | null>(formState.policyDocument);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleContinue = () => {
    updateForm('policyDocument', file);
  };

  return (
    <FormStepContainer
      title="Upload Policy Document"
      subtitle="Upload your insurance policy document if available. (Optional)"
      onContinue={handleContinue}
      isLastStep={true}
      steps={steps}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="policyDocument">Policy Document</Label>
          <div className="border-2 border-dashed border-muted rounded-lg p-10 text-center">
            <Input
              id="policyDocument"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
            />
            <Label
              htmlFor="policyDocument"
              className="w-full flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <span className="text-sm font-medium mb-1">
                {file ? file.name : 'Click to upload a file'}
              </span>
              <span className="text-xs text-muted-foreground">
                PDF, DOC or DOCX (max. 10MB)
              </span>
            </Label>
          </div>
        </div>
      </div>
    </FormStepContainer>
  );
};

export default PolicyDocumentStep;
