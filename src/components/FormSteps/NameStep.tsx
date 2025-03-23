
import React, { useState, useEffect } from 'react';
import { useAppealForm } from '../../context/AppealFormContext';
import FormStepContainer from '../FormStepContainer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NameStepProps {
  steps: { label: string; isOptional: boolean }[];
}

const NameStep: React.FC<NameStepProps> = ({ steps }) => {
  const { formState, updateForm } = useAppealForm();
  const [name, setName] = useState(formState.fullName);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(name.trim().length >= 3);
  }, [name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleContinue = () => {
    updateForm('fullName', name.trim());
  };

  return (
    <FormStepContainer
      title="What's your name?"
      subtitle="We'll use this to personalize your appeal letter."
      canContinue={isValid}
      onContinue={handleContinue}
      steps={steps}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            value={name}
            onChange={handleChange}
            className="h-12 text-lg"
            autoFocus
          />
        </div>
      </div>
    </FormStepContainer>
  );
};

export default NameStep;