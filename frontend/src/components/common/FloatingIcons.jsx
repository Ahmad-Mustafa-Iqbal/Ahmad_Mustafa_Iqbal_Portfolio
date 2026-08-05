/* ================================================
   FloatingIcons — Career page background effect
   Tech/AI icons floating and rotating subtly
   ================================================ */

import { useEffect, useRef } from 'react';
import './FloatingIcons.css';

const ICONS = ['🤖', '🧠', '💻', '⚡', '📊', '🔬', '🎯', '⚙️', '📡', '🛠️', '🔗'];
const ICON_COUNT = 18;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function FloatingIcons() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing icons
    container.innerHTML = '';

    for (let i = 0; i < ICON_COUNT; i++) {
      const span = document.createElement('span');
      span.className = 'floating-icon';
      span.textContent = ICONS[Math.floor(Math.random() * ICONS.length)];

      // Random position
      span.style.left = `${randomBetween(2, 95)}%`;
      span.style.top = `${randomBetween(2, 95)}%`;

      // Random size
      const size = randomBetween(1.1, 2.2);
      span.style.fontSize = `${size}rem`;

      // Random animation duration & delay
      const duration = randomBetween(15, 30);
      const delay = randomBetween(0, 10);
      span.style.animationDuration = `${duration}s`;
      span.style.animationDelay = `-${delay}s`;

      // Random initial opacity
      span.style.opacity = randomBetween(0.08, 0.18);

      container.appendChild(span);
    }
  }, []);

  return <div ref={containerRef} className="floating-icons-bg" />;
}
