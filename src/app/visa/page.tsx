'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './visa.module.css';

interface VisaStep {
  number: number;
  title: string;
  desc: string;
}

interface TransitionPath {
  id: string;
  tabLabel: string;
  summary: string;
  steps: VisaStep[];
}

const TRANSITION_PATHS: TransitionPath[] = [
  {
    id: 'f1-opt',
    tabLabel: 'F-1 OPT/STEM OPT Ending',
    summary: 'For F-1 students whose OPT work authorization is expiring, but they wish to continue working full-time in the USA by enrolling in a new Master/Doctorate program.',
    steps: [
      {
        number: 1,
        title: 'Apply to a Day 1 CPT University',
        desc: 'Submit your application to an accredited CPT institution (e.g. Westcliff, Trine) at least 2-3 weeks before your OPT end date or during your 60-day grace period.'
      },
      {
        number: 2,
        title: 'Acquire New Acceptance Letter & Transfer I-20',
        desc: 'Upon acceptance, submit your current I-20 and OPT card. Request your current school to release your SEVIS record to the new university.'
      },
      {
        number: 3,
        title: 'Receive New Day 1 CPT I-20',
        desc: 'The new school will issue a transfer-in I-20. Ensure that the second page specifies your active CPT employer and authorization dates.'
      },
      {
        number: 4,
        title: 'Initiate Authorized CPT Employment',
        desc: 'Begin working on the authorized CPT start date listed on your I-20. Remember, you cannot work even one day without active CPT authorization.'
      }
    ]
  },
  {
    id: 'h1b',
    tabLabel: 'H-1B to F-1 CPT',
    summary: 'For H-1B workers facing layoffs, maxing out their 6-year limit, or seeking an alternate pathway to maintain employment and study.',
    steps: [
      {
        number: 1,
        title: 'Apply & Gain Admission',
        desc: 'Apply to an executive hybrid program that allows CPT. Obtain your official acceptance letter.'
      },
      {
        number: 2,
        title: 'Decide: Change of Status vs. Consular Processing',
        desc: 'Select either Consular Processing (leaving the US to get an F-1 visa stamp at a consulate) or I-539 Change of Status (staying in the US while USCIS processes the transition, which may take months).'
      },
      {
        number: 3,
        title: 'Receive approved F-1 status & I-20',
        desc: 'Once your F-1 status is active, work with the university DSO (Designated School Official) to register your employer and generate your CPT approval.'
      },
      {
        number: 4,
        title: 'Begin CPT Work',
        desc: 'Transitions from H-1B require careful timing. You must cease H-1B employment and only resume work on the authorized CPT start date.'
      }
    ]
  },
  {
    id: 'dependents',
    tabLabel: 'H-4 / L-2 / B-2 to F-1',
    summary: 'For dependents (H-4, L-2) wanting to study and gain full-time work rights, or tourist visa holders (B-1/B-2) wishing to transition to academic status.',
    steps: [
      {
        number: 1,
        title: 'Enroll in an Approved School',
        desc: 'Obtain an initial I-20 from an SEVP-certified institution offering Day 1 CPT.'
      },
      {
        number: 2,
        title: 'Submit Form I-539',
        desc: 'File for a change of status to F-1 with USCIS, submitting proof of financial support and intent to study. Standard premium processing is available.'
      },
      {
        number: 3,
        title: 'Wait for SEVIS Activation',
        desc: 'Upon approval, your SEVIS status changes to active. You will be registered for classes.'
      },
      {
        number: 4,
        title: 'Acquire CPT and Start Interning',
        desc: 'Fulfill the school’s CPT requirements (some require completing 1-2 residency sessions) and obtain your active employment authorization.'
      }
    ]
  }
];

export default function Visa() {
  const [activePathId, setActivePathId] = useState('f1-opt');
  
  const currentPath = TRANSITION_PATHS.find(p => p.id === activePathId) || TRANSITION_PATHS[0];

  return (
    <div className="anim-fade">
      {/* BACKGROUND DECORATIONS */}
      <div className="bg-glow-orb orb-1"></div>
      <div className="bg-glow-orb orb-2" style={{ bottom: '15%', right: '10%' }}></div>

      {/* PAGE HEADER */}
      <section className="container" style={{ padding: '80px 24px 20px' }}>
        <div className="page-header">
          <div className="gradient-text" style={{ fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>
            Immigration Navigator
          </div>
          <h1>Change Visa Status</h1>
          <p>
            Learn the exact regulatory steps required to change or maintain your legal status in the US while working under Day 1 CPT authorization.
          </p>
        </div>
      </section>

      {/* TABS CONTAINER */}
      <section className="container" style={{ paddingBottom: '20px' }}>
        <div className={styles.tabsContainer}>
          {TRANSITION_PATHS.map((path) => (
            <button
              key={path.id}
              onClick={() => setActivePathId(path.id)}
              className={`${styles.tabBtn} ${activePathId === path.id ? styles.tabBtnActive : ''}`}
            >
              {path.tabLabel}
            </button>
          ))}
        </div>
      </section>

      {/* STEPS TIMELINE/WIZARD */}
      <section className="container" style={{ paddingBottom: '40px' }}>
        <div className={styles.wizardWrapper}>
          {/* Path Summary Card */}
          <div className="glass-card" style={{ padding: '30px', marginBottom: '40px', borderLeft: '4px solid var(--accent-indigo)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>Transition Overview</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{currentPath.summary}</p>
          </div>

          {/* Chronological Steps */}
          <div className={styles.stepsGrid}>
            {currentPath.steps.map((step) => (
              <div key={step.number} className={`${styles.stepCard} glass-card`}>
                <div className={styles.stepNumber}>
                  {step.number}
                </div>
                <div className={styles.stepInfo}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Compliance Card */}
          <div className={`${styles.complianceCard} glass-card`}>
            <div className={styles.complianceTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              Important SEVIS Compliance Notice
            </div>
            <p className={styles.complianceDesc}>
              <strong>No-Gap Rule:</strong> When transferring your SEVIS record between programs, your new program start date must be within 5 months of your OPT end date or SEVIS release date. 
              Additionally, you must register for classes during the next available term. 
              Always review these timelines with a designated school official (DSO) or an immigration attorney.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER CALL-TO-ACTION */}
      <section className="section-padding text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Unsure of your timeline?</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Avoid accrual of unlawful presence. Book a priority evaluation session to audit your visa end dates and transition windows.
        </p>
        <Link href="/contact" className="btn btn-primary" style={{ marginTop: '10px' }}>
          Request Status Audit
        </Link>
      </section>
    </div>
  );
}
