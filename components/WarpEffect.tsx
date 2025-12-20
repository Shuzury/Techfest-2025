
import React, { useEffect, useRef } from 'react';

interface WarpEffectProps {
  active: boolean;
  duration?: number;
}

const WarpEffect: React.FC<WarpEffectProps> = ({ active, duration = 6000 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      startTimeRef.current = null;
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    startTimeRef.current = performance.now();
    let animationFrameId: number;
    let particles: LineParticle[] = [];
    // Reduced particle count as requested (cleaner look)
    const particleCount = 180; 

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    class LineParticle {
      x: number;
      y: number;
      z: number;
      speed: number;
      color: string;
      baseSize: number;

      constructor() {
        this.reset();
        this.z = Math.random() * 2000; 
      }

      reset() {
        this.x = (Math.random() - 0.5) * canvas.width * 3;
        this.y = (Math.random() - 0.5) * canvas.height * 3;
        this.z = 2000;
        // High contrast colors
        this.color = Math.random() > 0.4 ? '#d946ef' : '#ffffff';
        this.speed = 45 + Math.random() * 55;
        this.baseSize = 1.2 + Math.random() * 1.8;
      }

      update(intensity: number) {
        // Linear increase in speed based on bell-curve intensity
        const currentSpeed = this.speed * (0.6 + intensity * 3.5);
        this.z -= currentSpeed;
        if (this.z <= 0) {
          this.reset();
        }
      }

      draw(intensity: number) {
        if (!ctx) return;
        
        const fov = 400;
        const scale = fov / (fov + this.z);
        const x2d = (this.x * scale) + (canvas.width / 2);
        const y2d = (this.y * scale) + (canvas.height / 2);
        
        const size = Math.max(0.1, this.baseSize * scale * (1 + intensity * 0.5));

        // Trail length stretches with intensity
        const trailFactor = 1.5 + (intensity * 10);
        const prevScale = fov / (fov + this.z + (this.speed * trailFactor));
        const prevX = (this.x * prevScale) + (canvas.width / 2);
        const prevY = (this.y * prevScale) + (canvas.height / 2);

        ctx.strokeStyle = this.color;
        ctx.lineWidth = size;
        ctx.lineCap = 'round';
        
        if (this.color === '#d946ef') {
            ctx.shadowBlur = 8 * intensity;
            ctx.shadowColor = '#d946ef';
        }

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x2d, y2d);
        ctx.stroke();
        
        ctx.shadowBlur = 0;
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new LineParticle());
    }

    const render = (time: number) => {
      const elapsed = time - (startTimeRef.current || time);
      const progress = Math.min(1, elapsed / duration);
      
      // Bell curve for intensity (peaking at middle)
      const intensity = Math.sin(progress * Math.PI);

      // AS REQUESTED: Background is absolute black during transition
      // We use a slightly lower alpha fill for trails, but on a black base
      ctx.globalCompositeOperation = 'source-over';
      const trailAlpha = 0.12 + (1 - intensity) * 0.15;
      ctx.fillStyle = `rgba(0, 0, 0, ${trailAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render lines
      particles.forEach(p => {
        p.update(intensity);
        p.draw(intensity);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, duration]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-[180] pointer-events-none transition-opacity duration-1000 ${active ? 'opacity-100' : 'opacity-0'}`}
      style={{ backgroundColor: '#000000' }}
    />
  );
};

export default WarpEffect;
