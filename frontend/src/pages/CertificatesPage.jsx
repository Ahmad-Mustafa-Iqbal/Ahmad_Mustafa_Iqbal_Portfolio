/* ================================================
   CertificatesPage — Certificate cards grid
   ================================================ */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../components/common/SectionTitle';
import GlassCard from '../components/common/GlassCard';
import certificates, { certCategories } from '../data/certificates';
import { HiExternalLink, HiAcademicCap } from 'react-icons/hi';
import './CertificatesPage.css';

export default function CertificatesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all'
      ? certificates
      : certificates.filter((c) => c.category === activeCategory);

  return (
    <div className="certificates-page">
      <section className="cert-hero section">
        <div className="container">
          <SectionTitle
            title="Certificates & Achievements"
            subtitle="Professional certifications and achievements that validate my expertise in AI, ML, and technology."
          />
        </div>
      </section>

      <section className="cert-content section">
        <div className="container">
          {/* Filter Tabs */}
          <motion.div
            className="cert-filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {certCategories.map((cat) => (
              <button
                key={cat.id}
                className={`cert-filter-btn ${activeCategory === cat.id ? 'cert-filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Certificates Grid */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory}
                className="cert-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filtered.map((cert, i) => (
                  <GlassCard key={cert.id} delay={i * 0.08} className="cert-card">
                    <div className="cert-card__icon-area">
                      <HiAcademicCap size={28} />
                    </div>
                    <div className="cert-card__content">
                      <h3 className="cert-card__title">{cert.title}</h3>
                      <p className="cert-card__issuer">{cert.issuer}</p>
                      <p className="cert-card__date">{cert.date}</p>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cert-card__link"
                        >
                          <HiExternalLink size={14} /> View Credential
                        </a>
                      )}
                    </div>
                  </GlassCard>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="cert-empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="cert-empty__icon">🏆</div>
                <h3>Certificates Coming Soon</h3>
                <p>
                  Professional certifications and achievements will be showcased here.
                  <br />
                  Stay tuned!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
