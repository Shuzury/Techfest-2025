import React, { useState, useRef } from 'react';
import Terminal from './components/Terminal';
import Countdown from './components/Countdown';
import WarpEffect from './components/WarpEffect';
import Decorations from './components/Decorations';
import Background from './components/Background';
import MatrixRain from './components/MatrixRain';
import InteractiveText from './components/InteractiveText';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const [isEntering, setIsEntering] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  
  // State to trigger background bursts
  const [bgBurst, setBgBurst] = useState(0);

  const handleEnter = () => {
    setIsEntering(true);
    // Simulate transition time
    setTimeout(() => {
      setShowContent(true);
    }, 2000);
  };

  const handleLogoClick = () => {
    if (!isClosed && !isMinimized) {
        // If terminal is already open, trigger background burst
        setBgBurst(prev => prev + 1);
    } else {
        // Otherwise, restore terminal
        setIsMinimized(false);
        setIsClosed(false);
    }
  };

  if (showContent) {
    // This would be the actual content of the site after entering
    // For this clone, we just show a placeholder or keep the effect loop
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <WarpEffect active={true} />
        <MusicPlayer onPlayChange={setIsMusicPlaying} />
        <div className="z-10 text-center animate-pulse">
           <h1 className="text-6xl md:text-8xl font-black mb-4 neon-text-filled tracking-widest">WELCOME</h1>
           <p className="text-fuchsia-300 tracking-[1em]">SYSTEM ACCESS GRANTED</p>
           <button 
             onClick={() => { 
               setIsEntering(false); 
               setShowContent(false); 
               setIsMinimized(false); 
               setIsClosed(true);
             }}
             className="mt-12 px-8 py-2 border border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-black transition-colors font-mono"
           >
             RESET SYSTEM
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* Audio Player Control */}
      <MusicPlayer onPlayChange={setIsMusicPlaying} />

      {/* Dynamic Backgrounds with Burst Trigger */}
      <Background burstTrigger={bgBurst} />
      
      {/* Matrix Overlay (Active when music is playing) */}
      <MatrixRain active={isMusicPlaying} />
      
      {/* Background Decorations */}
      <Decorations />
      
      {/* Main Container */}
      <div className={`relative z-10 flex flex-col items-center justify-center w-full max-w-5xl px-4 transition-opacity duration-1000 ${isEntering ? 'opacity-0 scale-150' : 'opacity-100'}`}>
        
        {/* Header / Logo */}
        <div className="mb-8 md:mb-12 relative group cursor-default text-center">
          {/* Logo Container similar to the image */}
          <div className="flex items-center justify-center">
             {/* Interactive Text Component (Includes Logo) */}
             <InteractiveText onLogoClick={handleLogoClick} />
          </div>

          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent mt-4 opacity-70"></div>
        </div>

        {/* Terminal Centerpiece */}
        {!isClosed && (
          <Terminal 
            onEnter={handleEnter} 
            isEntering={isEntering} 
            isMinimized={isMinimized}
            onMinimize={() => setIsMinimized(true)}
            onClose={() => setIsClosed(true)}
          />
        )}

        {/* Countdown Timer */}
        <div className={`w-full mt-8 md:mt-12 transition-all duration-700 ${isMinimized || isClosed ? 'opacity-50 blur-sm' : 'opacity-100'}`}>
           <Countdown />
        </div>

      </div>

      {/* Warp Effect Overlay */}
      <WarpEffect active={isEntering} />
      
      {/* Scan lines overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,20,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[100] bg-[length:100%_2px,3px_100%] pointer-events-none mix-blend-overlay opacity-30"></div>

    </div>
  );
}

export default App;