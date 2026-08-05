/* ================================================
   CareerPage — Vertical timeline
   ================================================ */

import { motion } from 'framer-motion';
import SectionTitle from '../components/common/SectionTitle';
import FloatingIcons from '../components/common/FloatingIcons';
import career from '../data/career';
import { HiAcademicCap, HiBriefcase, HiStar } from 'react-icons/hi';
import './CareerPage.css';

const typeIcons = {
  education: HiAcademicCap,
  experience: HiBriefcase,
  achievement: HiStar,
};

const typeColors = {
  education: '#4cc9f0',
  experience: '#06d6a0',
  achievement: '#7c3aed',
};

export default function CareerPage() {
  return (
    <div className="career-page">
      <FloatingIcons />
      <section className="career-hero section">
        <div className="container">
          <SectionTitle
            title="Career"
            subtitle="From classrooms to real-world AI — my academic journey, hands-on experience in Machine Learning, Deep Learning, NLP, Computer Vision, Generative AI & Agentic AI, and the milestones that shaped me along the way."
          />
        </div>
      </section>

      <section className="career-timeline section">
        <div className="container">
          <div className="timeline">
            <div className="timeline__line" />

            {career.length > 0 ? (
              career.map((item, i) => {
                const Icon = typeIcons[item.type] || HiStar;
                const color = typeColors[item.type] || '#4cc9f0';

                return (
                  <motion.div
                    key={item.id}
                    className={`timeline__item timeline__item--${i % 2 === 0 ? 'left' : 'right'}`}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <div
                      className="timeline__dot"
                      style={{ borderColor: color, boxShadow: `0 0 15px ${color}40` }}
                    >
                      <Icon size={16} style={{ color }} />
                    </div>

                    <div className="timeline__card glass">
                      <div className="timeline__card-header">
                        <span
                          className="timeline__type-badge"
                          style={{
                            background: `${color}15`,
                            color: color,
                            borderColor: `${color}30`,
                          }}
                        >
                          {item.type}
                        </span>
                        <span className="timeline__period">{item.period}</span>
                      </div>

                      <h3 className="timeline__title">{item.title}</h3>
                      <p className="timeline__org">{item.organization}</p>
                      {item.location && (
                        <p className="timeline__location">📍 {item.location}</p>
                      )}
                      <p className="timeline__desc">{item.description}</p>

                      {item.highlights && item.highlights.length > 0 && (
                        <ul className="timeline__highlights">
                          {item.highlights.map((h, idx) => (
                            <li key={idx} className="timeline__highlight">
                              <span className="timeline__highlight-dot" style={{ background: color }} />
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                className="career-empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="career-empty__icon">🚀</div>
                <h3>Journey in Progress</h3>
                <p>Career milestones and experiences will be added soon.</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
