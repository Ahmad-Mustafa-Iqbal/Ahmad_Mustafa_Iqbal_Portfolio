/* ================================================
   NeuralNetworkBg — About page background effect
   Animated neural network with tech tool names as nodes
   connected by pulsing synaptic lines
   ================================================ */

import { useEffect, useRef } from 'react';
import './NeuralNetworkBg.css';

/* ── Tools/technologies that appear as nodes ── */
const TECH_LABELS = [
  'Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'LangChain',
  'Hugging Face', 'FastAPI', 'Docker', 'Jupyter', 'Git',
  'Linux', 'VS Code', 'React', 'AWS', 'Pandas',
  'NumPy', 'SQL', 'OpenCV', 'C++', 'Streamlit',
  'JavaScript', 'Google Cloud', 'MLflow',
];

/* Major nodes that are rendered slightly larger/brighter */
const MAJOR = new Set(['Python', 'TensorFlow', 'PyTorch', 'LangChain', 'React', 'FastAPI']);

/* ── Canvas constants ── */
const NODE_COUNT      = 50;           // hidden canvas-only dots (connective tissue)
const CONNECTION_DIST = 200;
const BASE_SPEED      = 0.15;
const ACCENT          = '76, 201, 240';
const ACCENT_ALT      = '6, 214, 160';

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function NeuralNetworkBg() {
  const canvasRef    = useRef(null);
  const containerRef = useRef(null);
  const labelsRef    = useRef([]);   // DOM references for placed tech labels
  const nodesRef     = useRef([]);   // invisible canvas particles
  const animRef      = useRef(null);

  /* ── Create floating DOM labels ── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = '';

    const placed = [];

    TECH_LABELS.forEach((label) => {
      const span = document.createElement('span');
      const isMajor = MAJOR.has(label);
      span.className = `neural-node-label${isMajor ? ' neural-node-label--major' : ''}`;
      span.textContent = label;

      // Random position, avoid clustering at edges
      const left = randomBetween(3, 92);
      const top  = randomBetween(3, 92);
      span.style.left = `${left}%`;
      span.style.top  = `${top}%`;

      // Random drift values for keyframe animation
      const dx1 = randomBetween(-12, 12), dy1 = randomBetween(-14, 14);
      const dx2 = randomBetween(-10, 10), dy2 = randomBetween(-12, 12);
      const dx3 = randomBetween(-8, 8),   dy3 = randomBetween(-10, 10);
      span.style.setProperty('--drift-x1', `${dx1}px`);
      span.style.setProperty('--drift-y1', `${dy1}px`);
      span.style.setProperty('--drift-x2', `${dx2}px`);
      span.style.setProperty('--drift-y2', `${dy2}px`);
      span.style.setProperty('--drift-x3', `${dx3}px`);
      span.style.setProperty('--drift-y3', `${dy3}px`);

      const baseOpacity = isMajor ? randomBetween(0.3, 0.45) : randomBetween(0.18, 0.32);
      span.style.setProperty('--node-base-opacity', baseOpacity);

      const dur = randomBetween(18, 35);
      const delay = randomBetween(0, 12);
      span.style.animationDuration = `${dur}s`;
      span.style.animationDelay    = `-${delay}s`;

      container.appendChild(span);

      placed.push({
        el: span,
        xPct: left,
        yPct: top,
      });
    });

    labelsRef.current = placed;
  }, []);

  /* ── Canvas: invisible connector dots + lines to labels ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createNodes() {
      nodesRef.current = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.cos(angle) * BASE_SPEED,
          vy: Math.sin(angle) * BASE_SPEED,
          r: randomBetween(1.0, 2.2),
        });
      }
    }

    function getLabelPositions() {
      return labelsRef.current.map((l) => ({
        x: (l.xPct / 100) * canvas.width,
        y: (l.yPct / 100) * canvas.height,
      }));
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes  = nodesRef.current;
      const labels = getLabelPositions();

      // Move invisible nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        n.x = Math.max(0, Math.min(canvas.width, n.x));
        n.y = Math.max(0, Math.min(canvas.height, n.y));
      }

      // All points: nodes + label positions
      const allPoints = [
        ...nodes.map((n) => ({ x: n.x, y: n.y, isLabel: false, r: n.r })),
        ...labels.map((l) => ({ x: l.x, y: l.y, isLabel: true, r: 0 })),
      ];

      // Draw connections
      for (let i = 0; i < allPoints.length; i++) {
        const a = allPoints[i];
        for (let j = i + 1; j < allPoints.length; j++) {
          const b = allPoints[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const fade = 1 - dist / CONNECTION_DIST;
            // If connecting two labels or a label to a node, use slightly brighter
            const bright = (a.isLabel || b.isLabel) ? 0.18 : 0.10;
            const color  = (a.isLabel && b.isLabel) ? ACCENT_ALT : ACCENT;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${color}, ${fade * bright})`;
            ctx.lineWidth = (a.isLabel && b.isLabel) ? 0.9 : 0.5;
            ctx.stroke();
          }
        }

        // Draw invisible node dots (very faint)
        if (!a.isLabel) {
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${ACCENT}, 0.18)`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(animate);
    }

    resize();
    createNodes();
    animate();

    const handleResize = () => { resize(); createNodes(); };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="neural-network-bg">
      <canvas ref={canvasRef} className="neural-network-bg__canvas" />
      <div ref={containerRef} />
    </div>
  );
}
