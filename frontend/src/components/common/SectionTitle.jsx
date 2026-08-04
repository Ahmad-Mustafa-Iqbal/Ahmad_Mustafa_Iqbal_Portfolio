/* ================================================
   SectionTitle — Reusable animated section header
   ================================================ */

import { motion } from 'framer-motion';
import './SectionTitle.css';

export default function SectionTitle({ title, subtitle, align = 'center' }) {
  return (
    <motion.div
      className={`section-title section-title--${align}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="section-title__heading">
        {title}
        <span className="section-title__accent-line" />
      </h2>
      {subtitle && <p className="section-title__subtitle">{subtitle}</p>}
    </motion.div>
  );
}
