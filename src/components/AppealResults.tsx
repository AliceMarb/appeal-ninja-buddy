import React, { useState, useEffect } from 'react';
import { useAppealForm } from '../context/AppealFormContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Check } from 'lucide-react';

const ActionPlanItem: React.FC<{ step: string; index: number }> = ({ step, index }) => {
  return (
    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
        {index + 1}
      </div>
      <div className="flex-1">
        <p className="text-sm">{step}</p>
      </div>
    </div>
  );
};

const AppealResults: React.FC = () => {
  const { appealResult, resetForm } = useAppealForm();
  const [activeTab, setActiveTab] = useState<'plan' | 'letter'>('plan');

  // Debug log when component renders or appealResult changes
  useEffect(() => {
    if (appealResult) {
      console.log('Appeal result in useEffect:', appealResult);
      console.log('Action steps:', appealResult.result?.action_steps);
      console.log('Appeal letter:', appealResult.result?.appeal_letter);
    }
  }, [appealResult]);

  const handleDownloadPDF = () => {
    // In a real implementation, this would generate and download a PDF
    console.log('Downloading PDF...');
    alert('In a real implementation, this would download your appeal letter as a PDF.');
  };

  const handleStartOver = () => {
    resetForm();
  };

  if (!appealResult) {
    console.log('No appeal result available');
    return null;
  }

  // Log the appeal result to help debug
  console.log('Appeal result in render:', appealResult);

  // Get the action steps and appeal letter from the result
  const actionSteps = appealResult.result?.action_steps || [];
  const appealLetter = appealResult.result?.appeal_letter || '';

  return (
    <div className="w-full max-w-2xl mx-auto p-6 animate-fade-in">
      <div className="glass-card p-8">
        <h1 className="text-3xl font-display font-medium mb-6 text-center">Your Appeal is Ready</h1>
        
        <div className="flex space-x-2 mb-6">
          <Button
            variant={activeTab === 'plan' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setActiveTab('plan')}
          >
            Action Plan
          </Button>
          <Button
            variant={activeTab === 'letter' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setActiveTab('letter')}
          >
            Appeal Letter
          </Button>
        </div>
        
        {activeTab === 'plan' && (
          <div className="space-y-6 animate-fade-in">
            <p className="text-muted-foreground mb-6">
              Follow these steps to increase your chances of a successful appeal:
            </p>
            
            <div className="space-y-3">
              {actionSteps && actionSteps.length > 0 ? (
                actionSteps.map((step, index) => (
                  <ActionPlanItem
                    key={index}
                    index={index}
                    step={step}
                  />
                ))
              ) : (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">No action steps available.</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'letter' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-end mb-4">
              <Button 
                onClick={handleDownloadPDF}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
            
            <div className="p-6 bg-white border border-border rounded-lg">
              <div className="prose max-w-none whitespace-pre-wrap">
                {appealLetter ? (
                  appealLetter
                ) : (
                  <p className="text-muted-foreground">No appeal letter available.</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-8 flex justify-center">
          <Button
            variant="ghost"
            onClick={handleStartOver}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Start a New Appeal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppealResults;
