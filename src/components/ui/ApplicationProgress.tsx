import { Check, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ApplicationProgressProps {
  status: string;
}

export function ApplicationProgress({ status }: ApplicationProgressProps) {
  const steps = [
    { id: 'submitted', label: 'SUBMITTED' },
    { id: 'accountant', label: 'ACCOUNTANT' },
    { id: 'secretary', label: 'SECRETARY' },
    { id: 'chairman', label: 'CHAIRMAN' },
  ];

  let currentStep = 0;
  if (status === 'Pending Accountant' || status === 'Pending') currentStep = 1;
  else if (status === 'Pending Secretary') currentStep = 2;
  else if (status === 'Pending Chairman') currentStep = 3;
  else if (status === 'Approved') currentStep = 4;

  const isRejected = status === 'Rejected';

  return (
    <div className="flex items-center w-full max-w-3xl mx-auto pt-8 pb-4">
      {steps.map((step, index) => {
        let isCompleted = currentStep > index;
        let isCurrent = currentStep === index;
        
        if (isRejected) {
          isCompleted = index === 0; // Only submitted is definitively completed if rejected (unless we track history).
          isCurrent = false;
        }

        const isLastStep = index === steps.length - 1;

        let circleColor = 'bg-[#FAF9F6] border-[#2D2A26]/10 text-transparent';
        if (isCompleted) circleColor = 'bg-[#4A5D4A] border-[#4A5D4A] text-white';
        else if (isCurrent && !isRejected) circleColor = 'bg-white border-[#4A5D4A] shadow-[0_0_0_4px_rgba(74,93,74,0.1)] text-transparent';
        
        if (isLastStep && isRejected) {
           circleColor = 'bg-[#C25E30] border-[#C25E30] text-white';
        }

        const textColor = isCompleted || isCurrent 
          ? 'text-[#4A5D4A]' 
          : (isLastStep && isRejected ? 'text-[#C25E30]' : 'text-[#2D2A26]/40');

        let displayLabel = step.label;
        if (isLastStep) {
           if (status === 'Approved') displayLabel = 'APPROVED';
           if (status === 'Rejected') displayLabel = 'REJECTED';
        }

        return (
          <div key={step.id} className="flex flex-col items-center flex-1 relative group">
            <span className={cn(
              "text-[9px] sm:text-[10px] font-bold uppercase tracking-widest sm:tracking-[0.2em] mb-4 text-center absolute -top-8 w-24 sm:w-32 transition-colors",
              textColor
            )}>
              {displayLabel}
            </span>
            
            <div className="flex items-center w-full">
              {/* Left Line */}
              <div className={cn(
                "h-[2px] flex-1 transition-colors",
                index === 0 ? "invisible" : isCompleted || isCurrent ? "bg-[#4A5D4A]" : "bg-[#2D2A26]/10",
                isRejected && index !== 0 && "bg-[#2D2A26]/10"
              )}></div>
              
              {/* Circle */}
              <div className={cn(
                "w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-300",
                circleColor
              )}>
                {isCompleted && <Check className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={3.5} />}
                {isLastStep && isRejected && <X className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={3.5} />}
              </div>
              
              {/* Right Line */}
              <div className={cn(
                "h-[2px] flex-1 transition-colors",
                isLastStep ? "invisible" : isCompleted ? "bg-[#4A5D4A]" : "bg-[#2D2A26]/10",
                isRejected && "bg-[#2D2A26]/10"
              )}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
