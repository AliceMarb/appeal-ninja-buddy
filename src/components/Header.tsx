
import React from 'react';
import { FileText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 flex justify-center items-center animate-fade-in">
      <div className="flex items-center gap-2">
        <FileText className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-display font-medium">
          Appeal<span className="text-primary">Buddy</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
