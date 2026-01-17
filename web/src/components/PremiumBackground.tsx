"use client";
import { useEffect, useRef } from "react";

// Particle class defined outside component
interface ParticleType {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
}

function createParticle(canvasWidth: number, canvasHeight: number, layer: number): ParticleType {
  const colors = [
    'rgba(59, 130, 246, ', // Blue
    'rgba(139, 92, 246, ', // Purple
    'rgba(6, 182, 212, ',  // Cyan
    'rgba(236, 72, 153, ', // Pink
  ];
  
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    size: Math.random() * 3 + 0.5 * layer,
    speedX: (Math.random() - 0.5) * 0.5 * layer,
    speedY: (Math.random() - 0.5) * 0.5 * layer,
    opacity: Math.random() * 0.5 + 0.2,
    color: colors[layer % colors.length],
    pulseSpeed: Math.random() * 0.02 + 0.01,
    pulsePhase: Math.random() * Math.PI * 2,
  };
}

function updateParticle(particle: ParticleType, canvasWidth: number, canvasHeight: number, time: number) {
  particle.x += particle.speedX;
  particle.y += particle.speedY;

  // Wrap around edges
  if (particle.x > canvasWidth) particle.x = 0;
  if (particle.x < 0) particle.x = canvasWidth;
  if (particle.y > canvasHeight) particle.y = 0;
  if (particle.y < 0) particle.y = canvasHeight;

  // Pulse effect
  particle.opacity = 0.3 + Math.sin(time * particle.pulseSpeed + particle.pulsePhase) * 0.2;
}

function drawParticle(ctx: CanvasRenderingContext2D, particle: ParticleType) {
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  ctx.fillStyle = particle.color + particle.opacity + ')';
  ctx.fill();
  
  // Glow effect
  ctx.shadowBlur = 20;
  ctx.shadowColor = particle.color + '0.5)';
  ctx.fill();
  ctx.shadowBlur = 0;
}

export default function PremiumBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Create multi-layer particle system
    const particleLayers: ParticleType[][] = [];
    const layerCounts = [80, 60, 40, 30];

    for (let layer = 0; layer < 4; layer++) {
      const particles: ParticleType[] = [];
      for (let i = 0; i < layerCounts[layer]; i++) {
        particles.push(createParticle(canvas.width, canvas.height, layer + 1));
      }
      particleLayers.push(particles);
    }

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(0.5, 'rgba(10, 10, 20, 0.95)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 1;

      // Animate and draw all layers
      particleLayers.forEach((particles) => {
        particles.forEach((particle) => {
          updateParticle(particle, canvas.width, canvas.height, time);
          drawParticle(ctx, particle);
        });

        // Connect nearby particles in same layer
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              ctx.beginPath();
              ctx.strokeStyle = particles[i].color + (0.15 * (1 - distance / 150)) + ')';
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
