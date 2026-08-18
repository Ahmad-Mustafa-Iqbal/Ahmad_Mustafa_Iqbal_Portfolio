/* ================================================
   TechMatrixBg — Tech Matrix & Code Network Background
   Interactive code nodes, binary streams, and synaptic lines
   ================================================ */

import { useEffect, useRef } from 'react';
import './TechMatrixBg.css';

const CODE_SNIPPETS = ['</>', '{ ... }', 'fn()', 'async', 'import', 'AI', '0101', 'git', 'API', 'def', 'const', 'model.fit()'];

export default function TechMatrixBg() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let points = [];
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 22 : 45;
    const connectionDist = isMobile ? 110 : 150;
    const mouseRadius = 180;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initPoints() {
      points = [];
      for (let i = 0; i < count; i++) {
        const isCodeNode = i % 3 === 0;
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: isCodeNode ? 0 : Math.random() * 1.5 + 0.8,
          isCode: isCodeNode,
          label: CODE_SNIPPETS[i % CODE_SNIPPETS.length],
          color: i % 2 === 0 ? '76, 201, 240' : '167, 139, 250',
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle or code label
        ctx.fillStyle = `rgba(${p.color}, 0.35)`;
        if (p.isCode) {
          ctx.font = '600 11px "JetBrains Mono", monospace';
          ctx.fillText(p.label, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw connecting lines
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p.color}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Mouse connection
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouseRadius) {
            const mAlpha = (1 - mdist / mouseRadius) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(76, 201, 240, ${mAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    }

    function handleMouseMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    }

    function handleMouseLeave() {
      mouseRef.current = { ...mouseRef.current, active: false };
    }

    resize();
    initPoints();
    animate();

    window.addEventListener('resize', () => { resize(); initPoints(); });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="tech-matrix-bg">
      <canvas ref={canvasRef} className="tech-matrix-bg__canvas" />
      <div className="tech-matrix-glow" />
    </div>
  );
}
