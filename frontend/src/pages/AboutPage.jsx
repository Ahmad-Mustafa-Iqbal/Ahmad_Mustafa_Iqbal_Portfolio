/* ================================================
   AboutPage — Bio, Skills, Education
   ================================================ */

import { motion } from 'framer-motion';
import SectionTitle from '../components/common/SectionTitle';
import GlassCard from '../components/common/GlassCard';
import NeuralNetworkBg from '../components/common/NeuralNetworkBg';
import skills from '../data/skills';
import { HiAcademicCap, HiLightningBolt, HiCode } from 'react-icons/hi';
import myPhoto from '../assets/edited-photo.png';
import './AboutPage.css';

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutPage() {
  return (
    <div className="about-page">
      <NeuralNetworkBg />
      {/* ── About Header ── */}
      <section className="about-header section">
        <div className="container">
          <div className="about-header__grid">
            {/* Left: Content */}
            <motion.div
              className="about-header__content"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <SectionTitle
                title="About Me"
                align="left"
              />
              <div className="about-header__bio">
                <h3 className="about-header__heading">
                  I'm <span className="gradient-text">Ahmad Mustafa Iqbal</span>,
                  <br />
                  an AI Engineer focused on building intelligent systems.
                </h3>
                <p className="about-header__text">
                  I work across Machine Learning, Deep Learning, NLP, Computer Vision, Generative AI, and Agentic AI, with a focus on turning AI concepts into practical, real-world solutions.
                </p>
                <p className="about-header__text">
                  Currently pursuing my BS in Computer Science at COMSATS University Islamabad, I’m continuously expanding my expertise across modern AI while strengthening the engineering foundations needed to build and deploy intelligent systems.
                </p>
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div 
              className="about-header__image-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="about-header__image-frame">
                <img src={myPhoto} alt="Ahmad Mustafa Iqbal" className="about-header__image" />
              </div>
            </motion.div>
          </div>

          {/* ── Highlights Row ── */}
          <motion.div
            className="about-highlights__row"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="about-highlight-card glass">
              <HiAcademicCap size={28} className="about-highlight-icon" />
              <div>
                <h4>Education</h4>
                <p>BS Computer Science</p>
                <p className="about-highlight-sub">COMSATS University, Islamabad</p>
              </div>
            </div>
            <div className="about-highlight-card glass">
              <HiLightningBolt size={28} className="about-highlight-icon" />
              <div>
                <h4>CGPA</h4>
                <p>3.87 / 4.00</p>
                <p className="about-highlight-sub">After 5th Semester</p>
              </div>
            </div>
            <div className="about-highlight-card glass">
              <HiCode size={28} className="about-highlight-icon" />
              <div>
                <h4>Domain</h4>
                <p>AI Engineering</p>
                <p className="about-highlight-sub">ML, DL, NLP, CV, Gen AI, Agentic AI</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Skills Section ── */}
      <section className="about-skills section">
        <div className="container">
          <SectionTitle
            title="Skills & Technologies"
            subtitle="Tools and technologies I work with on a daily basis."
          />

          <motion.div
            className="about-skills__grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
          >
            {skills.map((category, i) => (
              <motion.div key={category.category} variants={fadeUp}>
                <GlassCard delay={i * 0.05} className="about-skills__card">
                  <div className="about-skills__card-header">
                    <span className="about-skills__card-emoji">{category.icon}</span>
                    <h4 className="about-skills__card-title">{category.category}</h4>
                  </div>
                  <div className="about-skills__tags">
                    {category.items.map((skill) => (
                      <span key={skill} className="about-skills__tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
