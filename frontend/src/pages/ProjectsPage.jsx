/* ================================================
   ProjectsPage — Dynamic GitHub Projects with Backend Integration
   ================================================ */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../components/common/SectionTitle';
import GlassCard from '../components/common/GlassCard';
import fallbackProjects, { projectCategories } from '../data/projects';
import { fetchGitHubProjects } from '../services/github';
import TechMatrixBg from '../components/common/TechMatrixBg';
import { HiExternalLink, HiCode } from 'react-icons/hi';
import { FaGithub, FaStar, FaCodeBranch, FaBookmark, FaTerminal } from 'react-icons/fa';
import './ProjectsPage.css';

/* Color map for language badges */
const languageColors = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  'Jupyter Notebook': '#DA5B0B',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  C: '#555555',
  'C++': '#f34b7d',
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadProjects() {
      try {
        setLoading(true);
        const data = await fetchGitHubProjects();
        if (isMounted) {
          if (data.projects && data.projects.length > 0) {
            setProjectsList(data.projects);
          } else {
            setProjectsList(fallbackProjects);
          }
          setError(false);
        }
      } catch (err) {
        console.warn('Failed to fetch projects from backend API, using fallback data:', err);
        if (isMounted) {
          setProjectsList(fallbackProjects);
          setError(true);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered =
    activeCategory === 'all'
      ? projectsList
      : projectsList.filter((p) => p.category === activeCategory);

  const pinnedProjects = filtered.filter((p) => p.pinned);
  const regularProjects = filtered.filter((p) => !p.pinned);

  return (
    <div className="projects-page">
      <TechMatrixBg />
      <section className="projects-hero section">
        <div className="container">
          <SectionTitle
            title="Featured Projects & Code"
            subtitle="Explore my open-source projects, machine learning models, and full-stack web applications fetched live via FastAPI backend."
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

          {/* Loading Skeleton */}
          {loading ? (
            <div className="projects-skeleton-grid">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div key={idx} className="project-card-skeleton">
                  <div className="skeleton-line skeleton-title"></div>
                  <div className="skeleton-line skeleton-desc"></div>
                  <div className="skeleton-line skeleton-desc-short"></div>
                  <div className="skeleton-tags">
                    <span className="skeleton-tag"></span>
                    <span className="skeleton-tag"></span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {filtered.length > 0 ? (
                <motion.div
                  key={activeCategory}
                  className="projects-wrapper"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Pinned / Featured Projects Section */}
                  {pinnedProjects.length > 0 && (
                    <div className="projects-section">
                      <div className="projects-section-header">
                        <FaBookmark className="projects-section-icon projects-section-icon--pinned" />
                        <h2 className="projects-section-title">Pinned & Featured Repositories</h2>
                      </div>
                      <div className="projects-grid projects-grid--featured">
                        {pinnedProjects.map((project, i) => (
                          <ProjectCard key={project.id || project.name} project={project} index={i} featured />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Regular / Other Projects Section */}
                  {regularProjects.length > 0 && (
                    <div className="projects-section">
                      {pinnedProjects.length > 0 && (
                        <div className="projects-section-header">
                          <FaTerminal className="projects-section-icon" />
                          <h2 className="projects-section-title">All Repositories</h2>
                        </div>
                      )}
                      <div className="projects-grid">
                        {regularProjects.map((project, i) => (
                          <ProjectCard key={project.id || project.name} project={project} index={i} />
                        ))}
                      </div>
                    </div>
                  )}
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
                  <h3>No Projects Found</h3>
                  <p>There are no projects under this category yet.</p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}

/* ── Individual Project Card Component ── */
function ProjectCard({ project, index, featured = false }) {
  const langColor = languageColors[project.language] || '#a78bfa';

  return (
    <GlassCard
      delay={index * 0.06}
      className={`project-card ${featured ? 'project-card--featured' : ''}`}
    >
      {featured && <div className="project-card__badge">★ Pinned Project</div>}

      <div className="project-card__content">
        <div className="project-card__header">
          <h3 className="project-card__title">{project.title}</h3>
        </div>

        <p className="project-card__desc">
          {project.description || 'Open source project hosted on GitHub.'}
        </p>

        {/* Topics / Tech Stack Tags */}
        <div className="project-card__tech">
          {project.language && (
            <span className="project-card__lang-tag">
              <span className="project-card__lang-dot" style={{ backgroundColor: langColor }}></span>
              {project.language}
            </span>
          )}
          {project.topics &&
            project.topics.slice(0, 4).map((topic) => (
              <span key={topic} className="project-card__tech-tag">
                #{topic}
              </span>
            ))}
        </div>

        {/* Stats & Links */}
        <div className="project-card__footer">
          <div className="project-card__stats">
            {project.stars > 0 && (
              <span className="project-card__stat" title="Stars">
                <FaStar className="stat-icon star-icon" /> {project.stars}
              </span>
            )}
            {project.forks > 0 && (
              <span className="project-card__stat" title="Forks">
                <FaCodeBranch className="stat-icon" /> {project.forks}
              </span>
            )}
          </div>

          <div className="project-card__actions">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__link"
              >
                <FaGithub size={15} /> Code
              </a>
            )}
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__link project-card__link--primary"
              >
                <HiExternalLink size={15} /> Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
