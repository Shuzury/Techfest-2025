import React from 'react';

const SocialButtons: React.FC = () => {
  return (
    <>
      {/* 
          INSTAGRAM BUTTON POSITIONING
          - 'left-[66px]' sets mobile distance from left edge (shifted 2px right from 64px)
          - 'md:left-[194px]' sets desktop distance from left edge (shifted 2px right from 192px)
          Adjust these values to move the icon horizontally.
      */}
      <div className="fixed bottom-12 left-[64px] md:left-[192px] z-50 pointer-events-auto">
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {/* Squircle Background with Glow */}
          <div className="absolute inset-0 bg-[#1a0b2e] border border-fuchsia-500/30 rounded-[38%] shadow-[0_0_15px_rgba(217,70,239,0.4)] group-hover:shadow-[0_0_25px_rgba(217,70,239,0.7)] group-hover:border-fuchsia-500 transition-all duration-300"></div>
          
          {/* Instagram Icon (SVG) */}
          <svg 
            className="w-7 h-7 md:w-8 md:h-8 text-fuchsia-500 drop-shadow-[0_0_8px_rgba(217,70,239,0.8)] z-10" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
      </div>

      {/* 
          FACEBOOK BUTTON POSITIONING
          - 'right-[66px]' sets mobile distance from right edge (shifted 2px left from 64px)
          - 'md:right-[194px]' sets desktop distance from right edge (shifted 2px left from 192px)
          Adjust these values to move the icon horizontally.
      */}
      <div className="fixed bottom-12 right-[64px] md:right-[192px] z-50 pointer-events-auto">
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {/* Squircle Background with Glow */}
          <div className="absolute inset-0 bg-[#1a0b2e] border border-fuchsia-500/30 rounded-[38%] shadow-[0_0_15px_rgba(217,70,239,0.4)] group-hover:shadow-[0_0_25px_rgba(217,70,239,0.7)] group-hover:border-fuchsia-500 transition-all duration-300"></div>
          
          {/* Facebook Icon (SVG) */}
          <svg 
            className="w-7 h-7 md:w-8 md:h-8 text-fuchsia-500 drop-shadow-[0_0_8px_rgba(217,70,239,0.8)] z-10" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </a>
      </div>
    </>
  );
};

export default SocialButtons;