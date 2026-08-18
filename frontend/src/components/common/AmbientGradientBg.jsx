/* ================================================
   AmbientGradientBg — Shifting Gradient Waves & Glowing Orbs
   Sleek, modern AI-inspired background for About page
   ================================================ */

import { useEffect, useRef } from 'react';
import './AmbientGradientBg.css';

export default function AmbientGradientBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let particles = [];
    const count = window.innerWidth < 768 ? 18 : 35;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initParticles() {
      particles = [];
      const colors = ['76, 201, 240', '6, 214, 160', '167, 139, 250', '245, 158, 11'];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.35 + 0.1,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${p.color}, 0.5)`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    }

    resize();
    initParticles();
    animate();

    const handleResize = () => {
      resize();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="ambient-gradient-bg">
      <div className="ambient-orb orb--cyan" />
      <div className="ambient-orb orb--emerald" />
      <div className="ambient-orb orb--purple" />
      <div className="ambient-orb orb--gold" />
      <div className="ambient-grid-overlay" />
      <canvas ref={canvasRef} className="ambient-particles-canvas" />
    </div>
  );
}
