/* ================================================
   CertificatesPage — Premium awards & certificates
   ================================================ */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../components/common/SectionTitle';
import GlassCard from '../components/common/GlassCard';
import StarFieldBg from '../components/common/StarFieldBg';
import certificates, {
  meritCertificates,
  laptopAward,
  speedCodingAward,
} from '../data/certificates';
import { HiExternalLink } from 'react-icons/hi';
import {
  FaAward,
  FaCertificate,
  FaMedal,
  FaTrophy,
  FaLaptop,
  FaCode,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from 'react-icons/fa';
import './CertificatesPage.css';

/* Cycle through icons for certificates */
const certIcons = [FaCertificate, FaAward, FaMedal];

/* ── Lightbox Component ── */
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <button className="lightbox-close" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>
        <motion.div
          className="lightbox-content"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {images.length > 1 && (
            <button className="lightbox-nav lightbox-nav--prev" onClick={onPrev} aria-label="Previous">
              <FaChevronLeft />
            </button>
          )}
          <img src={images[index]} alt="" className="lightbox-img" />
          {images.length > 1 && (
            <button className="lightbox-nav lightbox-nav--next" onClick={onNext} aria-label="Next">
              <FaChevronRight />
            </button>
          )}
          {images.length > 1 && (
            <div className="lightbox-dots">
              {images.map((_, i) => (
                <span key={i} className={`lightbox-dot ${i === index ? 'lightbox-dot--active' : ''}`} />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Image Gallery (thumbnails) ── */
function ImageGallery({ images, onImageClick, layout = 'even' }) {
  return (
    <div className={`award-gallery award-gallery--${layout} award-gallery--count-${images.length}`}>
      {images.map((img, i) => (
        <motion.button
          key={i}
          className={`award-gallery__thumb ${layout === 'featured' && i === 0 ? 'award-gallery__thumb--featured' : ''}`}
          onClick={() => onImageClick(i)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <img src={img} alt="" loading="lazy" />
          <div className="award-gallery__thumb-overlay">
            <span>View</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

export default function CertificatesPage() {
  const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0 });

  const openLightbox = (images, index) => setLightbox({ open: true, images, index });
  const closeLightbox = () => setLightbox({ open: false, images: [], index: 0 });
  const prevImage = () =>
    setLightbox((s) => ({ ...s, index: (s.index - 1 + s.images.length) % s.images.length }));
  const nextImage = () =>
    setLightbox((s) => ({ ...s, index: (s.index + 1) % s.images.length }));

  const totalAwards = meritCertificates.length + 2; // merit + laptop + speed coding

  return (
    <div className="certificates-page">
      {/* Unique starfield background */}
      <StarFieldBg />

      {/* Decorative glow accents */}
      <div className="cert-bg-glow cert-bg-glow--1" />
      <div className="cert-bg-glow cert-bg-glow--2" />

      <section className="cert-hero section">
        <div className="container">
          <SectionTitle title="Certificates & Awards" />

          {/* Punchline */}
          <motion.p
            className="cert-punchline"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Every certificate is a milestone — a proof of curiosity, dedication, and the hunger to never stop learning.
          </motion.p>

          {/* Stats bar */}
          <motion.div
            className="cert-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="cert-stat">
              <span className="cert-stat__number">{certificates.length}</span>
              <span className="cert-stat__label">Certifications</span>
            </div>
            <div className="cert-stat__divider" />
            <div className="cert-stat">
              <span className="cert-stat__number">{totalAwards}</span>
              <span className="cert-stat__label">Awards</span>
            </div>
            <div className="cert-stat__divider" />
            <div className="cert-stat">
              <span className="cert-stat__number">
                {certificates.filter((c) => c.title.includes('Specialization')).length}
              </span>
              <span className="cert-stat__label">Specializations</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Section 1 — Professional Certifications (TOP)
          ══════════════════════════════════════════════ */}
      <section className="cert-content section">
        <div className="container">
          <motion.h2
            className="cert-section-heading"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FaCertificate className="cert-section-heading__icon cert-section-heading__icon--cyan" />
            Professional Certifications
          </motion.h2>

          <div className="cert-grid">
            {certificates.map((cert, i) => {
              const IconComp = certIcons[i % certIcons.length];
              const isSpecialization = cert.title.includes('Specialization');

              return (
                <GlassCard
                  key={cert.id}
                  delay={i * 0.07}
                  className={`cert-card ${isSpecialization ? 'cert-card--specialization' : ''}`}
                >
                  {isSpecialization && (
                    <div className="cert-card__badge">★ Specialization</div>
                  )}
                  <div className="cert-card__icon-area">
                    <IconComp size={26} />
                  </div>
                  <div className="cert-card__content">
                    <h3 className="cert-card__title">{cert.title}</h3>
                    <p className="cert-card__issuer">{cert.issuer}</p>
                    {cert.date && (
                      <p className="cert-card__date">{cert.date}</p>
                    )}
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-card__link"
                      >
                        <HiExternalLink size={14} /> Verify Credential
                      </a>
                    )}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          Section 2 — Merit Certificates (Single Featured Card)
          ══════════════════════════════════════════════════════════ */}
      <section className="cert-content section">
        <div className="container">
          <motion.h2
            className="cert-section-heading"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FaTrophy className="cert-section-heading__icon cert-section-heading__icon--gold" />
            Academic Merit & Laptop Award
          </motion.h2>

          {/* ── Single featured merit card ── */}
          <GlassCard delay={0.1} className="merit-featured-card">
            {/* Decorative ribbon */}
            <div className="merit-ribbon">
              <FaMedal size={16} />
              <span>4× Dean's List · Top Merit</span>
            </div>

            {/* Header area */}
            <div className="merit-header">
              <div className="merit-header__icon">
                <FaTrophy size={32} />
              </div>
              <div className="merit-header__text">
                <h3 className="merit-header__title">
                  University Merit Certificates
                </h3>
                <p className="merit-header__subtitle">
                  COMSATS University Islamabad — Recognized for exceptional academic performance across all four semesters
                </p>
              </div>
            </div>

            {/* Semester badges */}
            <div className="merit-semesters">
              {meritCertificates.map((mc, i) => (
                <motion.a
                  key={mc.id}
                  href={mc.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="merit-semester-badge"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <span className="merit-semester-badge__num">{mc.semester.replace('Semester ', 'S')}</span>
                  <span className="merit-semester-badge__label">{mc.date}</span>
                  <span className="merit-semester-badge__verify">
                    <HiExternalLink size={12} /> Verify
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Laptop Award Sub-section */}
            <div className="merit-laptop-section">
              <div className="merit-laptop-header">
                <FaLaptop size={20} className="merit-laptop-header__icon" />
                <div>
                  <h4 className="merit-laptop-header__title">{laptopAward.title}</h4>
                  <p className="merit-laptop-header__desc">{laptopAward.description}</p>
                </div>
              </div>
              <ImageGallery
                images={laptopAward.images}
                onImageClick={(i) => openLightbox(laptopAward.images, i)}
                layout="featured"
              />
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          Section 3 — Speed Coding Runner-Up
          ══════════════════════════════════════════════════ */}
      <section className="cert-content section">
        <div className="container">
          <motion.h2
            className="cert-section-heading"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FaCode className="cert-section-heading__icon cert-section-heading__icon--green" />
            Competition Awards
          </motion.h2>

          <GlassCard delay={0.1} className="speed-coding-card">
            <div className="speed-coding-header">
              <div className="speed-coding-header__badge">
                <FaTrophy size={20} />
                <span>1st Runner-Up</span>
              </div>
              <div className="speed-coding-header__text">
                <h3 className="speed-coding-header__title">{speedCodingAward.title}</h3>
                <p className="speed-coding-header__issuer">{speedCodingAward.issuer}</p>
                <p className="speed-coding-header__desc">{speedCodingAward.description}</p>
                <span className="speed-coding-header__date">{speedCodingAward.date}</span>
              </div>
            </div>

            <ImageGallery
              images={speedCodingAward.images}
              onImageClick={(i) => openLightbox(speedCodingAward.images, i)}
              layout="even"
            />
          </GlassCard>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox.open && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}
