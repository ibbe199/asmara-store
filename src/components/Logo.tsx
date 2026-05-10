import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps & { align?: 'center' | 'start' | 'end' }> = ({ className = '', variant = 'dark', align = 'center' }) => {
  // Using the colors from the provided image
  const goldColor = "#F3CE82"; 
  
  const alignmentClass = align === 'start' ? 'items-start' : align === 'end' ? 'items-end' : 'items-center';
  
  return (
    <div className={`flex flex-col justify-center font-logo ${alignmentClass} ${className}`}>
      {/* English Text */}
      <h1 
        className="text-2xl md:text-3xl font-black italic tracking-tight"
        style={{ color: goldColor }}
      >
        Asmara Store
      </h1>
      
      {/* Decorative Lines and Arabic Text */}
      <div className="flex items-center gap-3 mt-[-4px]">
        {/* Left Lines */}
        <div className="hidden sm:flex flex-col gap-[2px]">
          <div className="w-8 h-[1px] bg-green-500"></div>
          <div className="w-10 h-[1px] bg-yellow-400"></div>
          <div className="w-6 h-[1px] bg-blue-400"></div>
        </div>

        {/* Arabic Text */}
        <span 
          className="font-arabic font-black text-lg md:text-xl"
          style={{ color: goldColor }}
          dir="rtl"
        >
          متجر أسمرة
        </span>

        {/* Right Lines */}
        <div className="hidden sm:flex flex-col gap-[2px]">
          <div className="w-8 h-[1px] bg-red-500"></div>
          <div className="w-10 h-[1px] bg-green-400"></div>
          <div className="w-6 h-[1px] bg-red-400"></div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
