
import React, { useEffect } from 'react';
import { useAppealForm } from '../context/AppealFormContext';
import Header from '../components/Header';
import NameStep from '../components/FormSteps/NameStep';
import DenialLetterStep from '../components/FormSteps/DenialLetterStep';
import MedicalHistoryStep from '../components/FormSteps/MedicalHistoryStep';
import PolicyInfoStep from '../components/FormSteps/PolicyInfoStep';
import PolicyDocumentStep from '../components/FormSteps/PolicyDocumentStep';
import GeneratingAppeal from '../components/GeneratingAppeal';
import AppealResults from '../components/AppealResults';
import { toast } from '@/components/ui/sonner';

const formSteps = [
  { label: 'Name', isOptional: false },
  { label: 'Denial Letter', isOptional: false },
  { label: 'Medical History', isOptional: true },
  { label: 'Policy Info', isOptional: true },
  { label: 'Policy Document', isOptional: true },
];

const Index = () => {
  const { 
    currentStep, 
    isGenerating, 
    setIsGenerating, 
    appealResult, 
    setAppealResult, 
    formState 
  } = useAppealForm();
  
  // Mock appeal generation
  useEffect(() => {
    if (isGenerating) {
      const timer = setTimeout(() => {
        const mockAppealResult = {
          actionPlan: [
            {
              title: 'Request Medical Records',
              description: 'Obtain complete medical records from your healthcare provider that support the necessity of the treatment or service that was denied. Make sure these records are detailed and show your medical history related to this issue.'
            },
            {
              title: 'Review Your Policy Coverage',
              description: 'Carefully review your insurance policy documentation to identify specific provisions that support your case. Pay special attention to sections about covered services and exclusions.'
            },
            {
              title: 'Get a Letter of Medical Necessity',
              description: 'Ask your doctor to write a detailed letter explaining why the denied treatment is medically necessary for your condition. This should include relevant medical codes, research, and clinical justifications.'
            },
            {
              title: 'Submit Your Appeal Within Deadlines',
              description: 'File your appeal within the time frame specified in your denial letter, typically 30-180 days. Send your appeal letter with all supporting documentation via certified mail to track receipt.'
            },
            {
              title: 'Follow Up on Your Appeal',
              description: 'After submission, follow up with your insurance company every 2-3 weeks. Keep detailed records of all communications, including dates, names, and summaries of conversations.'
            }
          ],
          appealLetter: `
            <p style="text-align: right;">Date: ${new Date().toLocaleDateString()}</p>
            <p style="text-align: right;">Policy Number: ${formState.policyNumber || '[Policy Number]'}</p>
            <p style="text-align: right;">Member ID: ${formState.memberId || '[Member ID]'}</p>
            <br>
            <p>Insurance Appeals Department<br>
            [Insurance Company Name]<br>
            [Street Address]<br>
            [City, State ZIP]</p>
            <br>
            <p><strong>RE: Appeal for Denial of Coverage</strong></p>
            <br>
            <p>Dear Appeals Department:</p>
            <br>
            <p>My name is ${formState.fullName}, and I am writing to appeal the decision to deny coverage for [treatment/procedure/medication]. I received a denial letter dated [date on denial letter], which stated that the reason for denial was [reason from denial letter].</p>
            <br>
            <p>I believe this denial is inappropriate for the following reasons:</p>
            <ul>
              <li>The requested treatment is medically necessary as documented by my physician</li>
              <li>The treatment is covered under my policy according to section [X.X] of my benefits</li>
              <li>Similar treatments have been approved for comparable medical conditions</li>
            </ul>
            <br>
            ${formState.medicalHistory ? `<p>My relevant medical history includes: ${formState.medicalHistory}</p><br>` : ''}
            <p>I have enclosed the following supporting documentation:</p>
            <ul>
              <li>Copy of the denial letter</li>
              <li>Letter of medical necessity from my physician</li>
              <li>Relevant medical records</li>
              ${formState.policyDocument ? '<li>Copy of applicable policy provisions</li>' : ''}
            </ul>
            <br>
            <p>According to the Affordable Care Act and state insurance regulations, I am entitled to a full and fair review of this denial. I request that you reconsider your decision and approve coverage for this medically necessary treatment.</p>
            <br>
            <p>If you require additional information, please contact me at [your phone number] or [your email]. I expect a written response to this appeal within 30 days, as required by law.</p>
            <br>
            <p>Sincerely,</p>
            <br>
            <p>${formState.fullName}<br>
            [Your Address]<br>
            [Your Phone Number]<br>
            [Your Email]</p>
          `
        };
        
        setAppealResult(mockAppealResult);
        setIsGenerating(false);
        toast('Your appeal plan is ready!');
      }, 6000);
      
      return () => clearTimeout(timer);
    }
  }, [isGenerating, setAppealResult, setIsGenerating, formState]);
  
  const renderCurrentStep = () => {
    if (appealResult) {
      return <AppealResults />;
    }
    
    if (isGenerating) {
      return <GeneratingAppeal />;
    }
    
    switch (currentStep) {
      case 0:
        return <NameStep steps={formSteps} />;
      case 1:
        return <DenialLetterStep steps={formSteps} />;
      case 2:
        return <MedicalHistoryStep steps={formSteps} />;
      case 3:
        return <PolicyInfoStep steps={formSteps} />;
      case 4:
        return <PolicyDocumentStep steps={formSteps} />;
      default:
        setIsGenerating(true);
        return <GeneratingAppeal />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md mb-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-display font-medium text-center mb-2">
            Appeal<span className="text-primary">Buddy</span>
          </h1>
          <p className="text-center text-muted-foreground">
            Your lawyer bestie for healthcare appeals
          </p>
        </div>
        
        {renderCurrentStep()}
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} AppealBuddy. Your healthcare advocate.</p>
      </footer>
    </div>
  );
};

export default Index;
