/* ================================================
   StarFieldBg — Twinkling constellation background
   Unique to the Certificates & Awards page
   ================================================ */

import { useEffect, useRef } from 'react';

const STAR_COUNT = 180;
const SHOOTING_STAR_INTERVAL = 4000;

export default function StarFieldBg() {
  const canvasRef = useRef(null);
  const animIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let stars = [];
    let shootingStars = [];
    let lastShootingStar = 0;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    }

    function createStars() {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.6 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
          // Color variety: golden, cyan, white, soft purple
          color: [
            '245, 158, 11',   // golden
            '76, 201, 240',   // cyan
            '255, 255, 255',  // white
            '167, 139, 250',  // purple
          ][Math.floor(Math.random() * 4)],
        });
      }
    }

    function spawnShootingStar(now) {
      if (now - lastShootingStar < SHOOTING_STAR_INTERVAL) return;
      lastShootingStar = now;

      const startX = Math.random() * canvas.width * 0.7;
      const startY = Math.random() * canvas.height * 0.4;

      shootingStars.push({
        x: startX,
        y: startY,
        vx: 4 + Math.random() * 3,
        vy: 2 + Math.random() * 2,
        life: 1,
        decay: 0.015 + Math.random() * 0.01,
        length: 60 + Math.random() * 40,
      });
    }

    function animate(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* Draw stars with twinkle */
      for (const star of stars) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const opacity = 0.25 + (twinkle * 0.5 + 0.5) * 0.55;
        const radius = star.r * (0.8 + (twinkle * 0.5 + 0.5) * 0.4);

        ctx.beginPath();
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${opacity})`;
        ctx.fill();

        /* Subtle glow for larger stars */
        if (star.r > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, radius * 3, 0, Math.PI * 2);
          const grd = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, radius * 3
          );
          grd.addColorStop(0, `rgba(${star.color}, ${opacity * 0.15})`);
          grd.addColorStop(1, `rgba(${star.color}, 0)`);
          ctx.fillStyle = grd;
          ctx.fill();
        }
      }

      /* Shooting stars */
      spawnShootingStar(time);
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;

        if (s.life <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = s.x - (s.vx / Math.sqrt(s.vx * s.vx + s.vy * s.vy)) * s.length * s.life;
        const tailY = s.y - (s.vy / Math.sqrt(s.vx * s.vx + s.vy * s.vy)) * s.length * s.life;

        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(1, `rgba(245, 158, 11, ${s.life * 0.6})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5 * s.life;
        ctx.stroke();

        /* Head glow */
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2 * s.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.life * 0.8})`;
        ctx.fill();
      }

      animIdRef.current = requestAnimationFrame(animate);
    }

    resize();
    createStars();
    animIdRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      resize();
      createStars();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
