/* ================================================
   HomePage — Hero section with name, role, stats
   ================================================ */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiDownload } from 'react-icons/hi';
import socialLinks from '../data/socialLinks';
import AnimatedCounter from '../components/common/AnimatedCounter';
import profilePic from '../assets/Me.png';
import './HomePage.css';

const roles = ['AI Engineer', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Gen AI', 'Agentic AI'];

export default function HomePage() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  /* Typing effect */
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && displayed.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, displayed.length + 1));
      }, 80);
    } else if (!isDeleting && displayed.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, displayed.length - 1));
      }, 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <div className="home">
      {/* ── Hero ── */}
      <section className="hero section">
        <div className="hero__inner container">
          <motion.div
            className="hero__content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <motion.p
              className="hero__greeting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              className="hero__name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              Ahmad Mustafa
              <br />
              <span className="gradient-text">Iqbal</span>
            </motion.h1>

            <motion.div
              className="hero__role"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="hero__role-text">{displayed}</span>
              <span className="hero__cursor">|</span>
            </motion.div>

            <motion.p
              className="hero__tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              BS Computer Science @ COMSATS University Islamabad
              <br />
              Passionate about building intelligent systems that make a difference.
            </motion.p>

            {/* Social Icons */}
            <motion.div
              className="hero__socials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {socialLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero__social-link"
                    aria-label={link.label}
                    title={link.label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85 + i * 0.06 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <Link to="/projects" className="hero__btn hero__btn--primary">
                View Projects <HiArrowRight />
              </Link>
              <a href="#" className="hero__btn hero__btn--outline">
                <HiDownload /> Download CV
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Picture */}
          <motion.div
            className="hero__image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            <div className="hero__avatar">
              <div className="hero__avatar-inner">
                <img src={profilePic} alt="Ahmad Mustafa Iqbal" className="hero__avatar-img" />
              </div>
              <div className="hero__avatar-glow" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats section">
        <div className="stats__inner container">
          {[
            { label: 'CGPA', value: 3.87, suffix: '', decimals: true },
            { label: 'Semester', value: 6, suffix: 'th' },
            { label: 'Projects', value: 0, suffix: '+' },
            { label: 'Certifications', value: 0, suffix: '+' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stats__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="stats__value">
                {stat.decimals ? (
                  <span>{stat.value}</span>
                ) : (
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <div className="stats__label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Quick About ── */}
      <section className="quick-about section">
        <div className="container">
          <motion.div
            className="quick-about__card glass"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="quick-about__title">
              Crafting <span className="gradient-text">Intelligent Solutions</span>
            </h2>
            <p className="quick-about__text">
              I'm a Computer Science student at COMSATS University Islamabad with a strong passion
              for Artificial Intelligence and Machine Learning. Currently maintaining a CGPA of 3.87,
              I focus on building real-world AI applications that solve meaningful problems.
            </p>
            <Link to="/about" className="quick-about__link">
              Learn more about me <HiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
