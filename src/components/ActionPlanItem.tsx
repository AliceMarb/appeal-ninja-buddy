
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionPlanItemProps {
  index: number;
  title: string;
  description: string;
}

const ActionPlanItem: React.FC<ActionPlanItemProps> = ({ index, title, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn("collapsible-section", isExpanded && "ring-1 ring-primary/10")}>
      <div 
        className="collapsible-header" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {index + 1}
          </div>
          <h3 className="font-medium">{title}</h3>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-4 pl-11 pr-2 text-sm text-muted-foreground animate-fade-in">
          {description}
        </div>
      )}
    </div>
  );
};

export default ActionPlanItem;
