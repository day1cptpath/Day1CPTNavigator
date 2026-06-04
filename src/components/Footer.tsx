import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        {/* TOP GRID */}
        <div className={styles.grid}>
          {/* COLUMN 1: BRAND */}
          <div className={styles.col}>
            <div className={styles.brand}>
              <Link href="/" className={styles.logo}>
                <img 
                  src="/logo.jpg" 
                  alt="Day1 CPT Navigator Logo" 
                  style={{ height: '70px', width: 'auto', display: 'block', borderRadius: '4px', marginBottom: '8px' }} 
                />
              </Link>
              <p className={styles.desc}>
                Your trusted advisory for finding top-tier Day 1 CPT universities and navigating complex visa status modifications in the United States.
              </p>
              <div className={styles.socials}>
                <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" className={styles.socialLink} aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" className={styles.socialLink} aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className={styles.col}>
            <h3 className={styles.title}>Navigator</h3>
            <ul className={styles.links}>
              <li><Link href="/" className={styles.link}>Home</Link></li>
              <li><Link href="/about" className={styles.link}>About Us</Link></li>
              <li><Link href="/universities" className={styles.link}>Universities</Link></li>
              <li><Link href="/visa" className={styles.link}>Visa Guide</Link></li>
              <li><Link href="/contact" className={styles.link}>Contact</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: RESOURCES */}
          <div className={styles.col}>
            <h3 className={styles.title}>Resources</h3>
            <ul className={styles.links}>
              <li><a href="#" className={styles.link}>CPT Regulations</a></li>
              <li><a href="#" className={styles.link}>F-1 Status Change</a></li>
              <li><a href="#" className={styles.link}>OPT Extensions</a></li>
              <li><a href="#" className={styles.link}>H-1B Checklist</a></li>
              <li><a href="#" className={styles.link}>Student FAQs</a></li>
            </ul>
          </div>

          {/* COLUMN 4: CONTACT INFO */}
          <div className={styles.col}>
            <h3 className={styles.title}>Get In Touch</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <svg className={styles.contactIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+1 (800) 555-0199</span>
              </li>
              <li className={styles.contactItem}>
                <svg className={styles.contactIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>info@cptnavigator.com</span>
              </li>
              <li className={styles.contactItem}>
                <svg className={styles.contactIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>100 Broadway, 24th Floor<br />New York, NY 10005</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className={styles.bottom}>
          <div className={styles.copyrightRow}>
            <span>&copy; {new Date().getFullYear()} CPT Navigator. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
