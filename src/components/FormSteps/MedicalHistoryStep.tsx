
import React, { useState } from 'react';
import { useAppealForm } from '../../context/AppealFormContext';
import FormStepContainer from '../FormStepContainer';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface MedicalHistoryStepProps {
  steps: { label: string; isOptional: boolean }[];
}

const MedicalHistoryStep: React.FC<MedicalHistoryStepProps> = ({ steps }) => {
  const { formState, updateForm } = useAppealForm();
  const [history, setHistory] = useState(formState.medicalHistory);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHistory(e.target.value);
  };

  const handleContinue = () => {
    updateForm('medicalHistory', history.trim());
  };

  return (
    <FormStepContainer
      title="Relevant Medical History"
      subtitle="Share any relevant medical history that could support your appeal. (Optional)"
      onContinue={handleContinue}
      steps={steps}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="medicalHistory">Medical History Details</Label>
          <Textarea
            id="medicalHistory"
            placeholder="Describe any relevant medical conditions, treatments, or history..."
            value={history}
            onChange={handleChange}
            className="min-h-[200px] text-base"
            autoFocus
          />
        </div>
      </div>
    </FormStepContainer>
  );
};

export default MedicalHistoryStep;
