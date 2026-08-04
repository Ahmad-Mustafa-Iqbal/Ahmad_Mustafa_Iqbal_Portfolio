/* ================================================
   ProjectsPage — Filterable project cards
   ================================================ */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../components/common/SectionTitle';
import GlassCard from '../components/common/GlassCard';
import projects, { projectCategories } from '../data/projects';
import { HiExternalLink, HiCode } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import './ProjectsPage.css';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="projects-page">
      <section className="projects-hero section">
        <div className="container">
          <SectionTitle
            title="Projects"
            subtitle="A showcase of my work — from AI models to full-stack applications. Each project includes source code and live demos."
          />
        </div>
      </section>

      <section className="projects-content section">
        <div className="container">
          {/* Filter Tabs */}
          <motion.div
            className="projects-filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                className={`projects-filter-btn ${activeCategory === cat.id ? 'projects-filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Project Grid */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory}
                className="projects-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filtered.map((project, i) => (
                  <GlassCard key={project.id} delay={i * 0.08} className="project-card">
                    {/* Image Area */}
                    <div className="project-card__image">
                      {project.image ? (
                        <img src={project.image} alt={project.title} />
                      ) : (
                        <div className="project-card__image-placeholder">
                          <HiCode size={32} />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="project-card__content">
                      <h3 className="project-card__title">{project.title}</h3>
                      <p className="project-card__desc">{project.description}</p>

                      {/* Tech Stack Tags */}
                      <div className="project-card__tech">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="project-card__tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="project-card__actions">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-card__link"
                          >
                            <FaGithub size={16} /> Code
                          </a>
                        )}
                        {project.liveDemo && (
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-card__link project-card__link--primary"
                          >
                            <HiExternalLink size={16} /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="projects-empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="projects-empty__icon">🚀</div>
                <h3>Projects Coming Soon</h3>
                <p>
                  Exciting projects with live demos are on the way.
                  <br />
                  Stay tuned for updates!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
