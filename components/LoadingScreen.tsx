
import React, { useState, useEffect, useMemo } from 'react';

interface LoadingScreenProps {
  isTransition?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isTransition = false }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  
  const bootMessages = useMemo(() => [
    "Building the site!",
    "Building the page...",
    "Initializing core systems...",
    "Parsing logic gates...",
    "Constructing the digital realm...",
    "Syncing neural pathways...",
    "Fetching data fragments...",
    "Assembling YANTRAKSH..."
  ], []);

  const transitionMessages = useMemo(() => [
    "[INFO] Establishing secure tunnel...",
    "[INFO] Initializing handshake...",
    "[LOAD] core_engine.pak",
    "[LOAD] interface_assets.bin",
    "[SYNC] Neural link active",
    "[INFO] Allocating memory...",
    "[OK] Handshake successful",
    "[EXEC] Transitioning interface..."
  ], []);

  const bootMessage = useMemo(() => {
    return bootMessages[Math.floor(Math.random() * bootMessages.length)];
  }, [bootMessages]);

  useEffect(() => {
    // Total duration for the progress bar animation
    const duration = isTransition ? 5500 : 3000;
    const intervalTime = 50;
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(100, (currentStep / totalSteps) * 100);
      setProgress(nextProgress);

      if (isTransition) {
        // Calculate which log should be visible based on progress
        const logIdx = Math.floor((nextProgress / 100) * transitionMessages.length);
        
        setLogs(prev => {
          const currentMsg = transitionMessages[logIdx];
          if (logIdx < transitionMessages.length && !prev.includes(currentMsg)) {
            return [...prev, currentMsg];
          }
          return prev;
        });
      }

      if (currentStep >= totalSteps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
    // Removed logs from dependencies to prevent the interval from resetting every time a log is added
  }, [isTransition, transitionMessages]);

  // TRANSITION-SPECIFIC UI (MID-PAGE SWAP)
  if (isTransition) {
    return (
      <div className="fixed inset-0 z-[500] bg-[#050505] flex flex-col items-center justify-center font-mono animate-fade-in">
        <div className="w-full max-w-xl px-10">
          <div className="flex justify-between items-end mb-6">
            <div className="text-left">
              <h2 className="text-white text-3xl font-anton tracking-widest uppercase mb-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                {progress < 100 ? "Syncing_Data" : "Link_Established"}
              </h2>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full animate-pulse"></span>
                <span className="text-fuchsia-400 text-[10px] tracking-[0.4em] font-bold uppercase">System Active</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-5xl font-anton text-white tabular-nums">{Math.floor(progress)}%</span>
            </div>
          </div>

          <div className="w-full h-40 bg-black/60 border border-white/10 p-5 mb-8 overflow-hidden flex flex-col justify-end rounded-lg shadow-inner">
            <div className="space-y-1.5">
              {logs.map((log, i) => (
                <div key={i} className="text-[11px] md:text-xs flex gap-4 animate-fade-in font-medium">
                  <span className="text-fuchsia-500/60 shrink-0 font-bold">
                    [{new Date().toLocaleTimeString([], {hour12: false})}]
                  </span>
                  <span className={`
                    ${log.includes('[OK]') ? 'text-green-400' : 'text-gray-200'}
                    ${log.includes('[INFO]') ? 'text-blue-300/90' : ''}
                    drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]
                  `}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative w-full h-3 bg-gray-900 border border-white/5 rounded-full overflow-hidden shadow-2xl">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-fuchsia-700 to-fuchsia-500 transition-all duration-300 ease-out shadow-[0_0_20px_#d946ef]"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
        </div>
        
        {/* Subtle background glow to keep it from feeling completely flat */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-fuchsia-950/10 blur-[180px] rounded-full pointer-events-none"></div>

        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  // BOOT-SPECIFIC UI (FIRST LOAD)
  return (
    <div className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center font-mono">
      <div className="w-full max-w-md px-8 text-center">
        <div className="mb-4 text-white text-lg tracking-widest font-bold animate-pulse">
          {bootMessage}
        </div>
        
        <div className="relative w-full h-1 bg-gray-900 overflow-hidden rounded-full">
          <div 
            className="absolute top-0 left-0 h-full bg-fuchsia-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%`, boxShadow: '0 0 10px #d946ef' }}
          ></div>
        </div>
        
        <div className="mt-4 text-fuchsia-500 font-bold text-sm tracking-widest">
          {Math.floor(progress)}%
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-900/10 blur-[120px] rounded-full pointer-events-none"></div>
    </div>
  );
};

export default LoadingScreen;
