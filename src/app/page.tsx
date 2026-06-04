'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 1,
    question: 'Is Day 1 CPT legal and compliant under USCIS regulations?',
    answer: 'Yes, Day 1 CPT is legal provided that the university is SEVP-certified, regionally accredited, and that the employment is directly related to the student’s major course of study. The CPT authorization must be approved and printed on the I-20 before any work begins.'
  },
  {
    id: 2,
    question: 'Can I change my status to F-1 (CPT) while remaining inside the US?',
    answer: 'Yes. If you are on an active non-immigrant status (such as H-1B, H-4, or B-2), you can file Form I-539 for a Change of Status (COS) with USCIS. Alternatively, you can opt for Consular Processing, which involves exiting the US, acquiring an F-1 visa stamp at a US consulate, and re-entering.'
  },
  {
    id: 3,
    question: 'How often do I need to attend campus in person?',
    answer: 'It depends on the university. Most hybrid programs require in-person attendance once per semester (a full weekend), once every 7-8 weeks, or once per month. In-person attendance is strictly mandatory to maintain your F-1 visa status compliance.'
  },
  {
    id: 4,
    question: 'What happens if I receive a Request for Evidence (RFE)?',
    answer: 'RFEs are common for Day 1 CPT candidates, particularly during H-1B filings. Working with an accredited school that maintains rigid academic structures (tests, attendance tracking, syllabus compliance) makes compiling proof of status straightforward. We only recommend universities with high RFE approval rates.'
  }
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [universities, setUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [resReviews, resUniversities] = await Promise.all([
          fetch('/api/reviews'),
          fetch('/api/universities')
        ]);
        const dataReviews = await resReviews.json();
        const dataUniversities = await resUniversities.json();
        setReviews(dataReviews);
        setUniversities(dataUniversities);
      } catch (err) {
        console.error('Failed to load dynamic page data', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const toggleFaq = (id: number) => {
    if (activeFaq === id) {
      setActiveFaq(null);
    } else {
      setActiveFaq(id);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .substring(0, 3);
  };

  const partnerLogos = universities.map((u) => ({
    code: getInitials(u.name),
    name: u.name,
    logo: u.logo
  }));

  // Double the array for infinite horizontal scroll effect
  const carouselItems = partnerLogos.length > 0 
    ? [...partnerLogos, ...partnerLogos, ...partnerLogos] 
    : [];

  return (
    <div className="anim-fade">
      {/* 1. BANNER SECTION */}
      <section className={styles.bannerSection}>
        <div className="container">
          <div className={styles.bannerContent}>
            <div className={styles.freeConsultText}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: 'var(--accent-orange)', borderRadius: '50%' }}></span>
              ✦ 100% Free Professional Consultation
            </div>
            <h1 className={styles.bannerTitle}>
              Day 1 CPT <span className="gradient-text">Navigator</span>
            </h1>
            <p className={styles.bannerDesc}>
              Your Path. Your Future. Our Guidance. Align with SEVP-approved, accredited US universities that offer immediate Curricular Practical Training (CPT) work rights.
            </p>
            <div className={styles.bannerBtns}>
              <Link href="/universities" className="btn btn-primary">
                Explore Universities
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Consult Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LOGO CAROUSEL */}
      <section className={styles.carouselSection}>
        <div className="container">
          <h2 className={styles.carouselTitle}>Accredited Partner Universities</h2>
          <div className={styles.carouselContainer}>
            <div className={styles.carouselTrack}>
              {carouselItems.map((item, index) => (
                <div key={index} className={styles.logoItem}>
                  {item.logo ? (
                    <img src={item.logo} alt={item.name} className={styles.logoImg} />
                  ) : (
                    <div className={styles.logoIcon}>{item.code}</div>
                  )}
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT IS DAY 1 CPT PROGRAM */}
      <section className="section-padding">
        <div className="container">
          <div className={styles.whatIsGrid}>
            <div className={styles.whatIsText}>
              <span style={{ color: 'var(--accent-orange)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Program Insight
              </span>
              <h2 className={styles.sectionTitle} style={{ textAlign: 'left' }}>
                What is Day 1 CPT program?
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.05rem' }}>
                Curricular Practical Training (CPT) is a temporary employment authorization for F-1 international students to gain practical experience directly related to their major.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.05rem' }}>
                While standard CPT is usually authorized only after completing one academic year, **Day 1 CPT** programs are structured at the graduate level (Master/Doctorate) to require internships starting on the very first term. This allows foreign professionals to continue working full-time in the USA without interruption.
              </p>
              
              <div className={styles.whatIsBullet}>
                <span className={styles.bulletDot}></span>
                <div>
                  <strong>Work Legally:</strong> Authorizes up to 40 hours of employment per week under a standard CPT I-20.
                </div>
              </div>
              <div className={styles.whatIsBullet}>
                <span className={styles.bulletDot}></span>
                <div>
                  <strong>Hybrid Format:</strong> Executive schedules combining online work with infrequent weekend campus residencies (once a month or once a term).
                </div>
              </div>
            </div>

            <div className={styles.whatIsVisual}>
              <div className="glass-card" style={{ padding: '40px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '15px', color: 'var(--accent-orange)' }}>Key Compliance Checkpoints</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <li style={{ borderLeft: '3px solid var(--accent-orange)', paddingLeft: '15px' }}>
                    <strong>School Accreditation:</strong> Must be regionally accredited (WASC, MSCHE, HLC) to ensure degree validity for H-1B filings.
                  </li>
                  <li style={{ borderLeft: '3px solid var(--accent-orange)', paddingLeft: '15px' }}>
                    <strong>Onsite Attendance:</strong> Students must physically attend all residency sessions. Missing class can violate your F-1 SEVIS status.
                  </li>
                  <li style={{ borderLeft: '3px solid var(--accent-orange)', paddingLeft: '15px' }}>
                    <strong>Direct Major Correlation:</strong> Job duties must align closely with course curriculum to avoid USCIS Requests for Evidence (RFEs).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMMON ISSUES WE ADDRESS */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span style={{ color: 'var(--accent-orange)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Solutions
            </span>
            <h2 className={styles.sectionTitle}>Challenges We Help You Navigate</h2>
            <p className={styles.sectionDesc}>
              We align students with legal, structured academic programs that solve career deadlocks, lottery constraints, and sudden visa deadlines.
            </p>
          </div>

          <div className={styles.doubtsGrid}>
            {/* ISSUE 1 */}
            <div className={`${styles.doubtCard} glass-card`}>
              <div className={styles.doubtHeader}>
                <div className={styles.doubtIcon}>!</div>
                <h3 className={styles.doubtQuestion}>OPT & STEM OPT Expiration</h3>
              </div>
              <p className={styles.doubtAnswer}>
                Running out of your F-1 OPT or STEM OPT work authorization timeline? We connect you with accredited graduate programs offering immediate Day 1 CPT authorizations to maintain your employment.
              </p>
            </div>

            {/* ISSUE 2 */}
            <div className={`${styles.doubtCard} glass-card`}>
              <div className={styles.doubtHeader}>
                <div className={styles.doubtIcon}>!</div>
                <h3 className={styles.doubtQuestion}>H-1B Lottery Cap Limitations</h3>
              </div>
              <p className={styles.doubtAnswer}>
                Missed out on the annual H-1B lottery draw? Day 1 CPT programs provide a legitimate and SEVP-compliant educational bridge to support your full-time job while waiting for next year's lottery cap.
              </p>
            </div>

            {/* ISSUE 3 */}
            <div className={`${styles.doubtCard} glass-card`}>
              <div className={styles.doubtHeader}>
                <div className={styles.doubtIcon}>!</div>
                <h3 className={styles.doubtQuestion}>Layoffs & Grace Periods</h3>
              </div>
              <p className={styles.doubtAnswer}>
                Facing corporate layoffs while on an H-1B visa and running out of your 60-day grace period? We assist in expediting your admission and SEVIS transfer to keep you in active non-immigrant status.
              </p>
            </div>

            {/* ISSUE 4 */}
            <div className={`${styles.doubtCard} glass-card`}>
              <div className={styles.doubtHeader}>
                <div className={styles.doubtIcon}>!</div>
                <h3 className={styles.doubtQuestion}>Dependent Status Transitions</h3>
              </div>
              <p className={styles.doubtAnswer}>
                Currently holding an H-4, L-2, or B-2 visa and seeking independent full-time study and work authorization? We guide you through Form I-539 change-of-status filings to transition seamlessly to F-1 CPT.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BRANCHES WE HAVE ACROSS THE WORLD */}
      <section className="section-padding">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span style={{ color: 'var(--accent-orange)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Global Support Network
            </span>
            <h2 className={styles.sectionTitle}>Branches We Have Across the World</h2>
            <p className={styles.sectionDesc}>
              We provide expert support worldwide. Wherever you are located, our local offices are available to assist with your academic application.
            </p>
          </div>

          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            {/* STYLISH WORLD MAP SVG */}
            <div className={styles.mapWrapper}>
              <img 
                src="/world_map.svg" 
                alt="World Map" 
                className={styles.worldMapImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. STEPS TO BE FOLLOWED */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span style={{ color: 'var(--accent-orange)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Process
            </span>
            <h2 className={styles.sectionTitle}>Steps to be Followed</h2>
            <p className={styles.sectionDesc}>
              Our streamlined onboarding process takes the guesswork out of applying. Start your F-1 transition in four simple phases.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            {/* STEP 1 */}
            <div className={`${styles.stepBox} glass-card`}>
              <div className={styles.stepNum}>01</div>
              <h3 className={styles.stepTitle}>Free Profile Audit</h3>
              <p className={styles.stepDesc}>
                Submit your current visa status, employment information, and background details to our academic advising team.
              </p>
            </div>

            {/* STEP 2 */}
            <div className={`${styles.stepBox} glass-card`}>
              <div className={styles.stepNum}>02</div>
              <h3 className={styles.stepTitle}>University Match</h3>
              <p className={styles.stepDesc}>
                We align you with the right university based on your budget, major, state, and preference for onsite class frequency.
              </p>
            </div>

            {/* STEP 3 */}
            <div className={`${styles.stepBox} glass-card`}>
              <div className={styles.stepNum}>03</div>
              <h3 className={styles.stepTitle}>Fast-Track Admission</h3>
              <p className={styles.stepDesc}>
                Our partners expedite your review. We assist in formatting recommendation letters, statement of purpose, and credit transfers.
              </p>
            </div>

            {/* STEP 4 */}
            <div className={`${styles.stepBox} glass-card`}>
              <div className={styles.stepNum}>04</div>
              <h3 className={styles.stepTitle}>CPT I-20 Approval</h3>
              <p className={styles.stepDesc}>
                Once admitted, request your SEVIS transfer. Your new university DSO issues your I-20 with CPT work approval printed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REVIEWS (STUDENT TESTIMONIALS) */}
      <section className="section-padding">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span style={{ color: 'var(--accent-orange)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Testimonials
            </span>
            <h2 className={styles.sectionTitle}>What Our Students Say</h2>
            <p className={styles.sectionDesc}>
              Read how international professionals successfully used our advising to keep their corporate careers growing.
            </p>
          </div>

          <div className={styles.reviewsGrid}>
            {reviews.map((rev) => (
              <div key={rev.id} className={`${styles.reviewCard} glass-card`}>
                <p className={styles.reviewQuote}>
                  "{rev.quote}"
                </p>
                <div className={styles.studentMeta}>
                  <div className={styles.studentAvatar}>{rev.avatar}</div>
                  <div>
                    <div className={styles.studentName}>{rev.name}</div>
                    <div className={styles.studentUniv}>{rev.univ}</div>
                  </div>
                </div>
              </div>
            ))}
            {reviews.length === 0 && !loading && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                No student reviews posted yet.
              </div>
            )}
            {loading && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                Loading reviews...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8. FAQs SECTION */}
      <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className={`${styles.faqSection} container section-padding`} style={{ paddingTop: '80px', paddingBottom: '100px' }}>
          <div className={styles.sectionHeader}>
            <span style={{ color: 'var(--accent-orange)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Help
            </span>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionDesc}>Quick regulatory compliance answers regarding Day 1 CPT programs</p>
          </div>

          <div className={styles.faqGrid}>
            {FAQ_DATA.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div key={faq.id} className={styles.faqCard}>
                  <button 
                    onClick={() => toggleFaq(faq.id)} 
                    className={styles.faqQuestion}
                  >
                    <span>{faq.question}</span>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                      className={styles.faqIcon}
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>

                  <div className={`${styles.faqAnswerPanel} ${isOpen ? styles.faqAnswerPanelOpen : ''}`}>
                    <div className={styles.faqAnswer}>
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
