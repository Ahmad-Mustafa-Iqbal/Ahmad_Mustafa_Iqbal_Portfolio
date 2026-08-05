/* ================================================
   ParticleBackground
   Interactive cursor-reactive network animation
   ================================================ */

import { useEffect, useRef } from 'react';
import './ParticleBackground.css';

const PARTICLE_COUNT = 110;
const CONNECTION_DIST = 155;
const MOUSE_RADIUS = 220;
const BASE_SPEED = 0.04;
const PARTICLE_COLOR = '76, 201, 240';
const BASE_PARTICLE_OPACITY = 0.5;
const BASE_LINE_OPACITY = 0.3;
const CURSOR_PARTICLE_OPACITY = 0.8;
const CURSOR_LINE_OPACITY = 0.55;

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const particlesRef = useRef([]);
  const animIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      particlesRef.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.cos(angle) * BASE_SPEED,
          vy: Math.sin(angle) * BASE_SPEED,
          r: Math.random() * 1.8 + 0.5,
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let mouseDist = Infinity;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          mouseDist = Math.sqrt(dx * dx + dy * dy);
          if (mouseDist < MOUSE_RADIUS) {
            const strength = (1 - mouseDist / MOUSE_RADIUS) * 0.003;
            p.vx += dx * strength;
            p.vy += dy * strength;
          }
        }

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = mouse.active && mouseDist < MOUSE_RADIUS ? 0.3 : 0.06;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        const nearCursor = mouse.active && mouseDist < MOUSE_RADIUS;
        const cursorFactor = nearCursor ? 1 - mouseDist / MOUSE_RADIUS : 0;

        const dotOpacity =
          BASE_PARTICLE_OPACITY +
          cursorFactor * (CURSOR_PARTICLE_OPACITY - BASE_PARTICLE_OPACITY);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PARTICLE_COLOR}, ${dotOpacity})`;
        ctx.fill();

        /* Draw connections */
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist < CONNECTION_DIST) {
            let lineCursorFactor = 0;
            if (mouse.active) {
              const mx = (p.x + p2.x) / 2 - mouse.x;
              const my = (p.y + p2.y) / 2 - mouse.y;
              const midDist = Math.sqrt(mx * mx + my * my);
              if (midDist < MOUSE_RADIUS) {
                lineCursorFactor = 1 - midDist / MOUSE_RADIUS;
              }
            }

            const lineOpacity =
              (BASE_LINE_OPACITY +
                lineCursorFactor * (CURSOR_LINE_OPACITY - BASE_LINE_OPACITY)) *
              (1 - dist / CONNECTION_DIST);

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${PARTICLE_COLOR}, ${lineOpacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animIdRef.current = requestAnimationFrame(animate);
    }

    function handleMouseMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    }

    function handleMouseLeave() {
      mouseRef.current = { ...mouseRef.current, active: false };
    }

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}
