
import React, { useState, useEffect } from 'react';
import { useAppealForm } from '../../context/AppealFormContext';
import FormStepContainer from '../FormStepContainer';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface DenialLetterStepProps {
  steps: { label: string; isOptional: boolean }[];
}

const DenialLetterStep: React.FC<DenialLetterStepProps> = ({ steps }) => {
  const { formState, updateForm } = useAppealForm();
  const [letter, setLetter] = useState(formState.denialLetter);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(letter.trim().length >= 20);
  }, [letter]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLetter(e.target.value);
  };

  const handleContinue = () => {
    updateForm('denialLetter', letter.trim());
  };

  return (
    <FormStepContainer
      title="Denial Letter Details"
      subtitle="Copy and paste the content of your denial letter or describe the reason for denial."
      canContinue={isValid}
      onContinue={handleContinue}
      steps={steps}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="denialLetter">Denial Letter Content</Label>
          <Textarea
            id="denialLetter"
            placeholder="Paste the content of your denial letter here..."
            value={letter}
            onChange={handleChange}
            className="min-h-[200px] text-base"
            autoFocus
          />
          {!isValid && letter.trim().length > 0 && (
            <p className="text-sm text-red-500 mt-1">
              Please provide more details (at least 20 characters).
            </p>
          )}
        </div>
      </div>
    </FormStepContainer>
  );
};

export default DenialLetterStep;
