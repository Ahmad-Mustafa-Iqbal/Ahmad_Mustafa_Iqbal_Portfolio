/* ================================================
   GlassCard — Reusable glassmorphism card
   ================================================ */

import { motion } from 'framer-motion';
import './GlassCard.css';

export default function GlassCard({
  children,
  className = '',
  delay = 0,
  hover = true,
  onClick,
}) {
  return (
    <motion.div
      className={`glass-card ${hover ? 'glass-card--hover' : ''} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={hover ? { y: -5, transition: { duration: 0.25 } } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
