import React, { useState } from 'react';
import { useAppealForm } from '../../context/AppealFormContext';
import FormStepContainer from '../FormStepContainer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload, Check } from 'lucide-react';

interface PolicyDocumentStepProps {
  steps: { label: string; isOptional: boolean }[];
}

const PolicyDocumentStep: React.FC<PolicyDocumentStepProps> = ({ steps }) => {
  const { formState, updateForm, setCurrentStep } = useAppealForm();
  const [file, setFile] = useState<File | null>(formState.policyDocument);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadSuccess(false); // Reset upload status when new file is selected
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', 'appeal_documents');
    formData.append('labels', JSON.stringify(['policy_document']));

    try {
      const response = await fetch('https://api.ai21.com/studio/v1/library/files', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_AI21_API_KEY}`,
        },
        body: formData
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Upload failed:', {
          url: 'https://api.ai21.com/studio/v1/library/files',
          status: response.status,
          statusText: response.statusText,
          error: data.error,
          response: data
        });
        throw new Error(data.error || 'Upload failed');
      }

      setUploadSuccess(true);
      updateForm('policyDocument', file);
      toast.success('Document uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload document');
      setUploadSuccess(false);
    } finally {
      setIsUploading(false);
    }
  };

  const handleContinue = () => {
    if (!uploadSuccess) {
      toast.error('Please upload the document first');
      return false; // Return false to prevent navigation
    }
    updateForm('policyDocument', file);
    return true; // Allow navigation
  };

  return (
    <FormStepContainer
      title="Upload Policy Document"
      subtitle="Upload your insurance policy document if available. Accepted formats: PDF, Word documents (.pdf, .doc, .docx)"
      onContinue={handleContinue}
      isLastStep={true}
      steps={steps}
      disableContinue={!uploadSuccess} // Disable continue if no successful upload
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
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">
                {file ? file.name : 'Click to upload or drag and drop'}
              </span>
            </Label>
          </div>
        </div>

        {file && !uploadSuccess && (
          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? 'Uploading...' : 'Upload Document'}
          </Button>
        )}

        {uploadSuccess && (
          <div className="flex items-center justify-center gap-2 text-sm text-green-600">
            <Check className="h-4 w-4" />
            <span>Document uploaded successfully</span>
          </div>
        )}
      </div>
    </FormStepContainer>
  );
};

export default PolicyDocumentStep;
