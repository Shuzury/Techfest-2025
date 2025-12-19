
import React, { useState, useEffect } from 'react';

interface HomeProps {
  onBack?: () => void;
}

const Home: React.FC<HomeProps> = ({ onBack }) => {
  const [showCursor, setShowCursor] = useState(true);

  // Burst blink effect for the terminal logo cursor
  useEffect(() => {
    const runBurst = () => {
      [0, 80, 160, 240, 320, 400].forEach((delay, i) => {
        setTimeout(() => {
          setShowCursor(i % 2 !== 0);
        }, delay);
      });
      setTimeout(() => setShowCursor(true), 500);
    };

    const initialDelay = setTimeout(runBurst, 5000);
    const interval = setInterval(runBurst, 5000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#050A1F] text-white font-mono flex flex-col relative overflow-hidden z-[100]">
      
      {/* Top Left Container */}
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 z-20 flex flex-row items-center gap-5 group cursor-pointer outline-none focus:ring-0 select-none text-left"
        aria-label="Return to Landing Page"
      >
        <div className="relative w-12 h-12 md:w-14 md:h-14 bg-[#1e1e1e] rounded-lg border border-gray-700 shadow-[0_0_15px_rgba(217,70,239,0.3)] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-fuchsia-500 group-hover:shadow-[0_0_30px_rgba(217,70,239,0.6)] active:scale-95">
          <span className="text-fuchsia-500 font-bold text-xl md:text-2xl font-mono flex items-baseline">
            <span>&gt;</span>
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
          </span>
        </div>

        <span className="text-2xl md:text-3xl font-bold tracking-[0.15em] text-white uppercase font-sans drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-300 group-hover:text-fuchsia-400 group-hover:drop-shadow-[0_0_15px_rgba(217,70,239,0.8)]">
          YANTRAKSH
        </span>
      </button>

      {/* Center Content: HOME title */}
      <div className="w-full min-h-screen flex flex-col items-center justify-center z-10">
        <h1 className="text-7xl md:text-9xl tracking-[0.25em] font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] font-sans select-none">
          HOME
        </h1>
      </div>
      
    </div>
  );
};

export default Home;
