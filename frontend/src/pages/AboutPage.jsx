/* ================================================
   AboutPage — Bio, Skills, Education
   ================================================ */

import { motion } from 'framer-motion';
import SectionTitle from '../components/common/SectionTitle';
import GlassCard from '../components/common/GlassCard';
import skills from '../data/skills';
import { HiAcademicCap, HiLightningBolt, HiCode } from 'react-icons/hi';
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
      {/* ── Hero Banner ── */}
      <section className="about-hero section">
        <div className="container">
          <SectionTitle
            title="About Me"
            subtitle="Get to know who I am, what drives me, and the skills I bring to the table."
          />
        </div>
      </section>

      {/* ── Bio Section ── */}
      <section className="about-bio section">
        <div className="container">
          <div className="about-bio__grid">
            <motion.div
              className="about-bio__content"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="about-bio__heading">
                I'm <span className="gradient-text">Ahmad Mustafa Iqbal</span>,
                <br />
                an AI Engineer based in Islamabad.
              </h3>
              <p className="about-bio__text">
                Currently pursuing my BS in Computer Science at COMSATS University Islamabad,
                I'm driven by an unwavering passion for Artificial Intelligence and its potential
                to transform industries. With a CGPA of 3.87 after my 5th semester, I combine
                strong academic foundations with hands-on project experience.
              </p>
              <p className="about-bio__text">
                My journey in AI spans machine learning, deep learning, natural language processing,
                and computer vision. I believe in building AI solutions that are not just technically
                sound but also meaningful and impactful.
              </p>
            </motion.div>

            <motion.div
              className="about-bio__highlights"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="about-bio__highlight-card glass">
                <HiAcademicCap size={28} className="about-bio__highlight-icon" />
                <div>
                  <h4>Education</h4>
                  <p>BS Computer Science</p>
                  <p className="about-bio__highlight-sub">COMSATS University, Islamabad</p>
                </div>
              </div>
              <div className="about-bio__highlight-card glass">
                <HiLightningBolt size={28} className="about-bio__highlight-icon" />
                <div>
                  <h4>CGPA</h4>
                  <p>3.87 / 4.00</p>
                  <p className="about-bio__highlight-sub">After 5th Semester</p>
                </div>
              </div>
              <div className="about-bio__highlight-card glass">
                <HiCode size={28} className="about-bio__highlight-icon" />
                <div>
                  <h4>Focus Areas</h4>
                  <p>AI & Machine Learning</p>
                  <p className="about-bio__highlight-sub">NLP, CV, Deep Learning</p>
                </div>
              </div>
            </motion.div>
          </div>
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
