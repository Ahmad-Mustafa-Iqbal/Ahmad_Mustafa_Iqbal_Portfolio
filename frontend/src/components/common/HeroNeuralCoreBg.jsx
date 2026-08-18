/* ================================================
   HeroNeuralCoreBg — Interactive AI Neural Core & 3D Geometric Nodes
   Unique background effect for the Home / Hero Page
   ================================================ */

import { useEffect, useRef } from 'react';
import './HeroNeuralCoreBg.css';

export default function HeroNeuralCoreBg() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let nodes = [];
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 24 : 50;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initNodes() {
      nodes = [];
      const types = ['circle', 'diamond', 'hex'];
      const colors = ['76, 201, 240', '6, 214, 160', '167, 139, 250'];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * (canvas.width * 0.45);
        nodes.push({
          baseX: canvas.width / 2 + Math.cos(angle) * dist,
          baseY: canvas.height / 2 + Math.sin(angle) * dist,
          x: canvas.width / 2 + Math.cos(angle) * dist,
          y: canvas.height / 2 + Math.sin(angle) * dist,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 4 + 2,
          type: types[i % types.length],
          color: colors[i % colors.length],
          angle: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.02,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    }

    function drawDiamond(x, y, size, angle, color, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.8, 0);
      ctx.lineTo(0, size);
      ctx.lineTo(-size * 0.8, 0);
      ctx.closePath();
      ctx.strokeStyle = `rgba(${color}, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    function drawHex(x, y, size, angle, color, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const hx = Math.cos(a) * size;
        const hy = Math.sin(a) * size;
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${color}, ${opacity})`;
      ctx.lineWidth = 0.9;
      ctx.stroke();
      ctx.restore();
    }

    function animate(now) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      const time = now * 0.001;

      // Draw connecting synaptic lines between close nodes
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.15;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(${n1.color}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Update & draw nodes
      for (const n of nodes) {
        n.angle += n.rotSpeed;
        n.x += n.vx;
        n.y += n.vy;

        // Bounce from boundaries
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        // Gentle cursor deflection (no clumping)
        if (mouse.active) {
          const mdx = mouse.x - n.x;
          const mdy = mouse.y - n.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 150 && mdist > 30) {
            const force = (1 - mdist / 150) * 0.004;
            n.vx += mdx * force * 0.05;
            n.vy += mdy * force * 0.05;
          }
        }

        const pulseOpacity = 0.2 + Math.sin(time * 2 + n.pulseOffset) * 0.15;

        if (n.type === 'circle') {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${n.color}, ${pulseOpacity + 0.15})`;
          ctx.fill();
        } else if (n.type === 'diamond') {
          drawDiamond(n.x, n.y, n.size * 2, n.angle, n.color, pulseOpacity + 0.2);
        } else {
          drawHex(n.x, n.y, n.size * 2.2, n.angle, n.color, pulseOpacity + 0.15);
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
    initNodes();
    animate(0);

    window.addEventListener('resize', () => { resize(); initNodes(); });
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
    <div className="hero-neural-core-bg">
      <div className="neural-core-glow neural-core-glow--primary" />
      <div className="neural-core-glow neural-core-glow--secondary" />
      <div className="neural-core-ring neural-core-ring--1" />
      <div className="neural-core-ring neural-core-ring--2" />
      <canvas ref={canvasRef} className="hero-neural-core-canvas" />
    </div>
  );
}
