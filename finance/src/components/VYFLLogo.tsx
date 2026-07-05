import React from 'react';

export const VYFLLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; hideText?: boolean }> = ({ size = 'sm', hideText = false }) => {
  const iconSize = size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-12 h-12';
  const textSize = size === 'sm' ? 'text-[13px]' : size === 'md' ? 'text-base' : 'text-2xl';
  const subSize = size === 'sm' ? 'text-[8px]' : size === 'md' ? 'text-[9px]' : 'text-[11px]';

  return (
    <div className="flex items-center gap-2.5 select-none text-left">
      {/* Client Brand Logo Image */}
      <img 
        src="/logo.png" 
        alt="VYFL Logo" 
        className={`${iconSize} shrink-0 object-contain rounded-md`} 
      />
      
      {!hideText && (
        <div className="leading-none flex flex-col justify-center animate-fade-in">
          <div className="flex items-center font-sans">
            <span className={`${textSize} font-black text-slate-900 tracking-tight`}>VGY</span>
            <span className={`${textSize} font-semibold text-red-650 tracking-tight ml-0.5`}>Finance</span>
          </div>
          <span className={`${subSize} text-slate-400 font-black uppercase tracking-widest mt-0.5 font-mono`}>Enterprise FMS</span>
        </div>
      )}
    </div>
  );
};
