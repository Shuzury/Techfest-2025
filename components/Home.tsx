
import React, { useState, useEffect } from 'react';
import NavbarSlider from './NavbarSlider';
import RegisterButton from './RegisterButton';

interface HomeProps {
  onBack?: () => void;
}

const Home: React.FC<HomeProps> = ({ onBack }) => {
  const [showCursor, setShowCursor] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Very fast blink effect when hovered
  useEffect(() => {
    if (!isHovered) {
      setShowCursor(true);
      return;
    }
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 60);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="h-screen w-full bg-[#050205] text-white font-mono relative overflow-y-auto overflow-x-hidden z-[100] scroll-smooth">
      
      {/* BACKGROUND FLARE - Persistent ambient light */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[60vh] bg-fuchsia-950/10 blur-[180px] pointer-events-none rounded-full z-0"></div>

      {/* STICKY HEADER */}
      <header className="sticky top-0 w-full h-20 md:h-24 flex items-center justify-between px-4 md:px-8 z-[150] bg-[#050205]/80 backdrop-blur-md border-b border-fuchsia-500/10">
        <button 
          onClick={onBack}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex items-center gap-3 md:gap-4 group cursor-pointer outline-none select-none transition-all duration-300 z-50"
        >
          <div className="relative w-8 h-8 md:w-10 md:h-10 bg-[#0c0c0c] rounded-lg border border-fuchsia-500/40 shadow-[0_0_10px_rgba(217,70,239,0.2)] flex items-center justify-center transition-all duration-300 group-hover:border-fuchsia-400 group-hover:shadow-[0_0_15px_rgba(217,70,239,0.5)]">
            <span className="text-fuchsia-500 font-bold text-base md:text-lg font-mono flex items-baseline">
              <span>&gt;</span>
              <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
            </span>
          </div>
          <span className="hidden md:block text-base md:text-lg font-black tracking-[0.2em] font-sans text-white/60 group-hover:text-white transition-colors">
            YANTRAKSH
          </span>
        </button>

        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-40">
            <NavbarSlider />
        </div>

        <div className="flex items-center z-50">
            <RegisterButton size="sm" />
        </div>
      </header>

      {/* SCROLLABLE SECTIONS */}
      <div className="relative z-10">
        
        {/* SECTION 1: HERO */}
        <section id="home" className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-4 relative">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-anton tracking-widest text-white mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              THE NEXT GEN <br/> TECH FEST
            </h2>
            <p className="text-fuchsia-400 text-xs md:text-sm tracking-[0.8em] font-bold uppercase opacity-60">
              Triguna Sen School of Technology
            </p>
          </div>
          
          <div className="absolute bottom-10 animate-bounce opacity-30">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </section>

        {/* SECTION 2: MODULES */}
        <section id="modules" className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-[#080308]/50">
          <div className="max-w-6xl w-full">
            <h3 className="text-2xl md:text-3xl font-anton tracking-widest text-white mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-fuchsia-500"></span>
              CORE_MODULES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="group h-64 bg-[#0c0c0c] border border-fuchsia-500/20 rounded-xl p-6 transition-all hover:border-fuchsia-500/60 hover:shadow-[0_0_30px_rgba(217,70,239,0.1)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 text-[8px] text-fuchsia-500/30 font-mono">MOD_0{item}</div>
                  <div className="w-12 h-12 bg-fuchsia-500/10 rounded-lg flex items-center justify-center mb-6 border border-fuchsia-500/20 group-hover:bg-fuchsia-500/20 group-hover:scale-110 transition-all">
                    <div className="w-4 h-4 bg-fuchsia-500 rounded-sm shadow-[0_0_8px_#d946ef]"></div>
                  </div>
                  <h4 className="text-xl font-anton tracking-wide text-white mb-2">SYSTEM ARCHITECTURE</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">Advanced algorithmic protocols designed for high-performance execution in distributed environments.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: GALLERY PLACEHOLDER */}
        <section id="gallery" className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <div className="max-w-6xl w-full">
             <div className="flex justify-between items-end mb-12">
                <h3 className="text-2xl md:text-3xl font-anton tracking-widest text-white flex items-center gap-4">
                  <span className="w-8 h-px bg-fuchsia-500"></span>
                  VISUAL_ARCHIVE
                </h3>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-square bg-[#0c0c0c] border border-white/5 rounded-lg overflow-hidden group relative">
                    <div className="absolute inset-0 bg-fuchsia-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white/10 font-anton text-4xl">IMG_0{i+1}</span>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* SECTION 4: FINAL CTA (CLIMAX) */}
        <section id="register" className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
          {/* Ambient Grid Floor Perspective - Reappears at the end */}
          <div className="absolute bottom-0 w-full h-[50vh] opacity-10 pointer-events-none" style={{ background: 'linear-gradient(0deg, #d946ef 1px, transparent 1px), linear-gradient(90deg, #d946ef 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg)' }}></div>
          
          <div className="flex flex-col items-center text-center z-20">
              {/* Status Indicator */}
              <div className="mb-10 opacity-60">
                  <span className="text-[10px] md:text-xs tracking-[1.2em] text-fuchsia-300 font-bold uppercase animate-pulse">
                      Initialize Phase 01
                  </span>
              </div>
              
              {/* LARGE HERO REGISTER BUTTON - As shown in user screenshot */}
              <RegisterButton size="lg" />
              
              {/* Footnote / Decorative line */}
              <div className="mt-16 flex items-center gap-6 opacity-40">
                  <div className="w-16 h-px bg-fuchsia-500"></div>
                  <span className="text-[9px] tracking-[0.6em] font-black text-fuchsia-200">SYSTEM_STABLE</span>
                  <div className="w-16 h-px bg-fuchsia-500"></div>
              </div>
          </div>
        </section>

      </div>

      {/* Decorative Scanline Overlay - Global Persistent */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,20,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-[1000] bg-[length:100%_4px,4px_100%] opacity-20"></div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        /* Custom scrollbar for techy feel */
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: #050205;
        }
        ::-webkit-scrollbar-thumb {
          background: #d946ef;
          border-radius: 10px;
          box-shadow: 0 0 10px #d946ef;
        }
      `}</style>
      
    </div>
  );
};

export default Home;
