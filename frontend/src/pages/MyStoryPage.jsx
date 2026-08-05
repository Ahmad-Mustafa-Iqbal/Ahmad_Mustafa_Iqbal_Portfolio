/* ================================================
   MyStoryPage — Personal journey, struggles, memories
   ================================================ */

import { motion } from 'framer-motion';
import SectionTitle from '../components/common/SectionTitle';
import myStory from '../data/myStory';
import './MyStoryPage.css';

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function MyStoryPage() {
  return (
    <div className="story-page">
      <section className="story-hero section">
        <div className="container">
          <SectionTitle
            title="My Story"
            subtitle="The real journey behind the resume — struggles, wins, late nights, and everything in between."
          />
        </div>
      </section>

      <section className="story-content section">
        <div className="container">
          {myStory.length > 0 ? (
            <motion.div
              className="story-grid"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-50px' }}
            >
              {myStory.map((item) => (
                <motion.div
                  key={item.id}
                  className={`story-card story-card--${item.type}`}
                  variants={fadeUp}
                >
                  <div className="story-card__image-wrapper">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="story-card__image"
                        loading="lazy"
                      />
                    ) : (
                      <span className="story-card__emoji-placeholder">
                        {item.emoji || '✨'}
                      </span>
                    )}
                  </div>

                  <div className="story-card__body">
                    <div className="story-card__header">
                      <span className="story-card__type-badge">
                        {item.type}
                      </span>
                      <span className="story-card__date">{item.date}</span>
                    </div>
                    <h3 className="story-card__title">{item.title}</h3>
                    <p className="story-card__desc">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="story-empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="story-empty__icon">📖</div>
              <h3>Story Coming Soon</h3>
              <p>
                The real journey — struggles, achievements, memories, and fun moments
                will be shared here soon. Stay tuned!
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
