
import React, { useState } from 'react';
import { useAppealForm } from '../../context/AppealFormContext';
import FormStepContainer from '../FormStepContainer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PolicyInfoStepProps {
  steps: { label: string; isOptional: boolean }[];
}

const PolicyInfoStep: React.FC<PolicyInfoStepProps> = ({ steps }) => {
  const { formState, updateForm } = useAppealForm();
  const [policyNumber, setPolicyNumber] = useState(formState.policyNumber);
  const [memberId, setMemberId] = useState(formState.memberId);

  const handlePolicyNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPolicyNumber(e.target.value);
  };

  const handleMemberIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberId(e.target.value);
  };

  const handleContinue = () => {
    updateForm('policyNumber', policyNumber.trim());
    updateForm('memberId', memberId.trim());
  };

  return (
    <FormStepContainer
      title="Insurance Policy Details"
      subtitle="Enter your policy information to include in the appeal letter. (Optional)"
      onContinue={handleContinue}
      steps={steps}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="policyNumber">Policy Number</Label>
          <Input
            id="policyNumber"
            placeholder="Enter your policy number"
            value={policyNumber}
            onChange={handlePolicyNumberChange}
            className="h-12"
            autoFocus
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="memberId">Member ID</Label>
          <Input
            id="memberId"
            placeholder="Enter your member ID"
            value={memberId}
            onChange={handleMemberIdChange}
            className="h-12"
          />
        </div>
      </div>
    </FormStepContainer>
  );
};

export default PolicyInfoStep;
