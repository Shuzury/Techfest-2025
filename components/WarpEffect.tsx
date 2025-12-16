import React, { useEffect, useRef } from 'react';

interface WarpEffectProps {
  active: boolean;
}

const WarpEffect: React.FC<WarpEffectProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 400;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      x: number;
      y: number;
      z: number;
      color: string;

      constructor() {
        this.x = (Math.random() - 0.5) * canvas.width * 2;
        this.y = (Math.random() - 0.5) * canvas.height * 2;
        this.z = Math.random() * 2000; // Depth
        this.color = Math.random() > 0.5 ? '#d946ef' : '#a21caf'; // Pink and Purple
      }

      update() {
        this.z -= 20; // Speed of movement towards screen
        if (this.z <= 0) {
          this.z = 2000;
          this.x = (Math.random() - 0.5) * canvas.width * 2;
          this.y = (Math.random() - 0.5) * canvas.height * 2;
        }
      }

      draw() {
        if (!ctx) return;
        
        // Perspective projection
        const fov = 300;
        const scale = fov / (fov + this.z);
        const x2d = (this.x * scale) + (canvas.width / 2);
        const y2d = (this.y * scale) + (canvas.height / 2);
        const size = Math.max(0.5, 4 * scale);

        // Trail effect
        const prevScale = fov / (fov + this.z + 40);
        const prevX = (this.x * prevScale) + (canvas.width / 2);
        const prevY = (this.y * prevScale) + (canvas.height / 2);

        ctx.strokeStyle = this.color;
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x2d, y2d);
        ctx.stroke();
      }
    }

    // Initialize
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const render = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.2)'; // Trail fade (dark bg)
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
    />
  );
};

export default WarpEffect;