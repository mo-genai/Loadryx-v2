/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; px: number; py: number }>({ x: -1000, y: -1000, px: -1000, py: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(canvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.px = mouseRef.current.x;
      mouseRef.current.py = mouseRef.current.y;
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.px = -1000;
      mouseRef.current.py = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Initialize particles
    const particleCount = 45;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 1.8 + 0.6;
      const baseAlpha = Math.random() * 0.25 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(Math.random() * 0.25 + 0.1), // slowly upwards
        size,
        alpha: baseAlpha,
        baseAlpha,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Slowly drift up and loop around
        p.y += p.vy;
        p.x += p.vx;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Mouse proximity interaction: push particles gently
        if (mouse.x > -500) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const forceRadius = 150;

          if (dist < forceRadius) {
            const force = (forceRadius - dist) / forceRadius; // 0 to 1
            const angle = Math.atan2(dy, dx);
            // Push along vector
            p.x += Math.cos(angle) * force * 1.8;
            p.y += Math.sin(angle) * force * 1.8;
            p.alpha = Math.min(0.6, p.baseAlpha + force * 0.35);
          } else {
            // Return alpha to base
            p.alpha += (p.baseAlpha - p.alpha) * 0.05;
          }
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(3, 131, 244, ${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      if (canvas) {
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      id="interactive-particle-canvas"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-1 opacity-70"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
