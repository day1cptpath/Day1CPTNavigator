'use client';

import React, { useState } from 'react';
import styles from './contact.module.css';

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

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    visaStatus: 'F-1 OPT',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    if (activeFaq === id) {
      setActiveFaq(null);
    } else {
      setActiveFaq(id);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate premium animated submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="anim-fade">
      {/* BACKGROUND DECORATIONS */}
      <div className="bg-glow-orb orb-1" style={{ top: '30%', left: '5%' }}></div>
      <div className="bg-glow-orb orb-2" style={{ bottom: '10%', right: '5%' }}></div>

      {/* PAGE HEADER */}
      <section className="container" style={{ padding: '80px 24px 20px' }}>
        <div className="page-header">
          <div className="gradient-text" style={{ fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>
            Get Guided
          </div>
          <h1>Contact Our Advisors</h1>
          <p>
            Connect with an expert academic consultant. Receive tailored recommendations, credit transfer reviews, and application assistance.
          </p>
        </div>
      </section>

      {/* FORM AND INFO ROW */}
      <section className="container" style={{ paddingBottom: '60px' }}>
        <div className={styles.contactLayout}>
          
          {/* LEFT: FORM CARD */}
          <div className={`${styles.formCard} glass-card`}>
            {!isSubmitted ? (
              <>
                <div className={styles.formHeader}>
                  <h2>Request a Free Consultation</h2>
                  <p>Fill out the form below, and we will get back to you within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.row}>
                    <div className="input-group">
                      <input
                        type="text"
                        name="firstName"
                        placeholder=" "
                        className="input-field"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      <label className="input-label">First Name</label>
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        name="lastName"
                        placeholder=" "
                        className="input-field"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                      <label className="input-label">Last Name</label>
                    </div>
                  </div>

                  <div className="input-group">
                    <input
                      type="email"
                      name="email"
                      placeholder=" "
                      className="input-field"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="input-label">Email Address</label>
                  </div>

                  <div className="input-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder=" "
                      className="input-field"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="input-label">Phone Number</label>
                  </div>

                  <div className={styles.formGroup} style={{ marginBottom: '25px' }}>
                    <label className={styles.formLabel} style={{ marginBottom: '6px', display: 'block' }}>Current Visa Status</label>
                    <select
                      name="visaStatus"
                      className="input-field"
                      value={formData.visaStatus}
                      onChange={handleInputChange}
                    >
                      <option value="F-1 OPT">F-1 OPT / STEM OPT</option>
                      <option value="H-1B">H-1B Worker</option>
                      <option value="H-4 / L-2">H-4 or L-2 Dependent</option>
                      <option value="B-1 / B-2">B-1 or B-2 Visitor</option>
                      <option value="Other">Other Visa Status</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <textarea
                      name="message"
                      placeholder=" "
                      className="input-field"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      style={{ resize: 'vertical' }}
                    ></textarea>
                    <label className="input-label">Your Questions / Academic Goals</label>
                  </div>

                  <button 
                    type="submit" 
                    className={`${styles.submitBtn} btn btn-primary`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending Request...' : 'Submit Request'}
                  </button>
                </form>
              </>
            ) : (
              <div className={styles.successCard}>
                <div className={styles.successIcon}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h2>Advising Request Sent!</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Thank you, <strong>{formData.firstName}</strong>. We have received your visa and education details. One of our Day 1 CPT advisors will contact you at <strong>{formData.email}</strong> shortly.
                </p>
                <button onClick={() => setIsSubmitted(false)} className="btn btn-secondary" style={{ marginTop: '10px' }}>
                  Submit Another Inquiry
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: INFO COLUMN */}
          <div className={styles.infoCol}>
            {/* Direct Contact Card */}
            <div className={`${styles.infoCard} glass-card`}>
              <h3 className={styles.infoTitle}>Connect Instantly</h3>
              
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className={styles.infoText}>
                  <h4>Email Support</h4>
                  <p>info@cptnavigator.com</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className={styles.infoText}>
                  <h4>Phone Support</h4>
                  <p>+1 (800) 555-0199 (Mon - Fri, 9 AM - 6 PM EST)</p>
                </div>
              </div>
            </div>

            {/* Office Location Card */}
            <div className={`${styles.infoCard} glass-card`}>
              <h3 className={styles.infoTitle}>Main Office</h3>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className={styles.infoText}>
                  <h4>New York Headquarters</h4>
                  <p>100 Broadway, 24th Floor<br />New York, NY 10005</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className={`${styles.faqSection} container section-padding`}>
        <div className={styles.faqHeader}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <p className={styles.faqDesc}>Quick compliance guidelines on Day 1 CPT study programs</p>
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
      </section>
    </div>
  );
}
