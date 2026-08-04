/* ================================================
   Footer — Three-column with social links
   ================================================ */

import { motion } from 'framer-motion';
import socialLinks from '../../data/socialLinks';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="footer__inner container">
        <div className="footer__section footer__contact">
          <h4 className="footer__heading">Get In Touch</h4>
          <p className="footer__text">
            Open to opportunities and collaborations.
          </p>
          <a href="mailto:your.email@example.com" className="footer__email-btn">
            Say Hello 👋
          </a>
        </div>

        <div className="footer__section footer__brand">
          <p className="footer__built">
            Built with <span className="footer__heart">❤️</span>
          </p>
          <p className="footer__copyright">
            © {currentYear} Ahmad Mustafa Iqbal
          </p>
        </div>

        <div className="footer__section footer__social">
          <h4 className="footer__heading">Connect</h4>
          <div className="footer__social-icons">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label={link.label}
                  title={link.label}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
