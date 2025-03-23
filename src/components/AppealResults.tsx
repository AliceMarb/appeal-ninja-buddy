import React, { useState } from 'react';
import { useAppealForm } from '../context/AppealFormContext';
import { Button } from '@/components/ui/button';
import ActionPlanItem from './ActionPlanItem';
import { ArrowLeft, Download } from 'lucide-react';

const AppealResults: React.FC = () => {
  const { appealResult, resetForm } = useAppealForm();
  const [activeTab, setActiveTab] = useState<'plan' | 'letter'>('plan');

  const handleDownloadPDF = () => {
    // In a real implementation, this would generate and download a PDF
    console.log('Downloading PDF...');
    alert('In a real implementation, this would download your appeal letter as a PDF.');
  };

  const handleStartOver = () => {
    resetForm();
  };

  if (!appealResult) {
    return null;
  }

  // Handle the API response format
  const actionPlan = appealResult.actionPlan || [];
  const appealLetter = appealResult.appealLetter || appealResult.appeal_letter || '';

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
              {actionPlan.map((item, index) => (
                <ActionPlanItem
                  key={index}
                  index={index}
                  title={item.title}
                  description={item.description}
                />
              ))}
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
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: appealLetter }} />
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
