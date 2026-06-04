import React from 'react';
import Link from 'next/link';
import styles from './about.module.css';

export default function About() {
  return (
    <div className="anim-fade">
      {/* GLOW DECORATIONS */}
      <div className="bg-glow-orb orb-1"></div>
      
      {/* PAGE HEADER */}
      <section className="container" style={{ padding: '80px 24px 20px' }}>
        <div className="page-header">
          <div className="gradient-text" style={{ fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>
            Our Story
          </div>
          <h1>About CPT Navigator</h1>
          <p>
            Bridging the gap between corporate opportunities and academic advancement for international professionals in the United States.
          </p>
        </div>
      </section>

      {/* INTRO GRID */}
      <section className="container section-padding" style={{ paddingTop: '20px' }}>
        <div className={styles.aboutGrid}>
          {/* TEXT BLOCK */}
          <div className={styles.introText}>
            <h2 className={styles.introTitle}>Empowering Careers Without Borders</h2>
            <p className={styles.introDesc}>
              Day 1 CPT Navigator was founded by former international F-1 and H-1B candidates. Having navigated the anxiety of limited OPT timelines and the H-1B visa lottery, we built this advising platform to simplify and structure Day 1 CPT options for foreign professionals.
            </p>
            <p className={styles.introDesc}>
              We believe that seeking higher education shouldn't force you to pause your career. Our mission is to connect you with fully compliant, regionally accredited colleges that offer authorized Curricular Practical Training from your first day of class.
            </p>
            
            <div className={styles.introStats}>
              <div className={styles.miniStat}>
                <div className={styles.miniStatVal}>45+</div>
                <div className={styles.miniStatLbl}>Partner Colleges</div>
              </div>
              <div className={styles.miniStat}>
                <div className={styles.miniStatVal}>100%</div>
                <div className={styles.miniStatLbl}>SEVP Compliant</div>
              </div>
            </div>
          </div>

          {/* DYNAMIC CARD BLOCK */}
          <div className={styles.aboutVisual}>
            <div className={styles.visualGlow}></div>
            <div className={`${styles.visualCard} glass-card`}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '15px', color: 'var(--accent-cyan)' }}>Our Commitment</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                We vet every single university partner. We verify their regional accreditation, SEVP registry status, Hybrid attendance requirements, and track records regarding RFE responses to guarantee peace of mind.
              </p>
              <div style={{ marginTop: '20px', borderLeft: '3px solid var(--accent-indigo)', paddingLeft: '15px' }}>
                <span style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  "Designed by international alumni, built for future leaders."
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className={`${styles.timelineSection} section-padding`}>
        <div className="container">
          <div className={styles.timelineHeader} style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.3rem', fontWeight: 800 }}>Evolution of Our Mission</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>How we became the primary guide for Day 1 CPT student consulting</p>
          </div>

          <div className={styles.timelineContainer}>
            {/* TIMELINE ITEM 1 */}
            <div className={`${styles.timelineItem} ${styles.timelineItemLeft}`}>
              <div className={`${styles.timelineContent} glass-card`}>
                <div className={styles.timelineDate}>2021</div>
                <h3 className={styles.timelineTitle}>Founding Vision</h3>
                <p className={styles.timelineDesc}>
                  A team of ex-international students started the advisory to solve immigration-academic deadlocks for OPT/STEM OPT candidates.
                </p>
              </div>
            </div>

            {/* TIMELINE ITEM 2 */}
            <div className={`${styles.timelineItem} ${styles.timelineItemRight}`}>
              <div className={`${styles.timelineContent} glass-card`}>
                <div className={styles.timelineDate}>2022</div>
                <h3 className={styles.timelineTitle}>Compliance Review Panel</h3>
                <p className={styles.timelineDesc}>
                  Established a compliance advisory board comprising immigration experts to pre-vet all partner school course curricula.
                </p>
              </div>
            </div>

            {/* TIMELINE ITEM 3 */}
            <div className={`${styles.timelineItem} ${styles.timelineItemLeft}`}>
              <div className={`${styles.timelineContent} glass-card`}>
                <div className={styles.timelineDate}>2023</div>
                <h3 className={styles.timelineTitle}>"CPT Matcher" Engine</h3>
                <p className={styles.timelineDesc}>
                  Launched our matching engine, enabling students to instantly filter schools by budget, location, and onsite frequency.
                </p>
              </div>
            </div>

            {/* TIMELINE ITEM 4 */}
            <div className={`${styles.timelineItem} ${styles.timelineItemRight}`}>
              <div className={`${styles.timelineContent} glass-card`}>
                <div className={styles.timelineDate}>2024 - Present</div>
                <h3 className={styles.timelineTitle}>12,000+ Success Stories</h3>
                <p className={styles.timelineDesc}>
                  Helped thousands of students maintain their career trajectories with seamless F-1 change-of-status guidance and CPT support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="section-padding text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Need Personalized Counsel?</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Every candidate's background is unique. Let us guide you on credit transfers and timing your application to avoid gaps.
        </p>
        <Link href="/contact" className="btn btn-primary" style={{ marginTop: '10px' }}>
          Schedule 1-on-1 Consultation
        </Link>
      </section>
    </div>
  );
}
