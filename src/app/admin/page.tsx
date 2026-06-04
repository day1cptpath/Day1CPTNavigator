'use client';

import React, { useState, useEffect } from 'react';
import styles from './admin.module.css';

interface University {
  id: number;
  name: string;
  location: string;
  region: 'West' | 'East' | 'Central';
  degreeCategory: 'Tech' | 'Business' | 'Both';
  accreditation: string;
  tuition: string;
  onsiteFrequency: string;
  majors: string[];
  programs: string[];
  logo: string;
}

interface Review {
  id: number;
  quote: string;
  avatar: string;
  name: string;
  univ: string;
}

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'universities' | 'reviews'>('universities');
  
  // Login Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Data Lists
  const [universities, setUniversities] = useState<University[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // University Form States
  const [univName, setUnivName] = useState('');
  const [univLocation, setUnivLocation] = useState('');
  const [univRegion, setUnivRegion] = useState<'West' | 'East' | 'Central'>('West');
  const [univDegree, setUnivDegree] = useState<'Tech' | 'Business' | 'Both'>('Both');
  const [univAccreditation, setUnivAccreditation] = useState('');
  const [univTuition, setUnivTuition] = useState('');
  const [univOnsite, setUnivOnsite] = useState('');
  const [univMajors, setUnivMajors] = useState('');
  const [univPrograms, setUnivPrograms] = useState('');
  const [univLogoBase64, setUnivLogoBase64] = useState('');
  const [univSubmitError, setUnivSubmitError] = useState('');
  const [univSubmitSuccess, setUnivSubmitSuccess] = useState('');
  const [univSubmitting, setUnivSubmitting] = useState(false);

  // Review Form States
  const [revQuote, setRevQuote] = useState('');
  const [revName, setRevName] = useState('');
  const [revUniv, setRevUniv] = useState('');
  const [revAvatar, setRevAvatar] = useState('');
  const [revSubmitError, setRevSubmitError] = useState('');
  const [revSubmitSuccess, setRevSubmitSuccess] = useState('');
  const [revSubmitting, setRevSubmitting] = useState(false);

  // Verification check on load
  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch('/api/auth/status');
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
      } catch (err) {
        setIsAuthenticated(false);
      }
    }
    checkStatus();
  }, []);

  // Fetch management data
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  async function fetchData() {
    setDataLoading(true);
    try {
      const [resUnivs, resRevs] = await Promise.all([
        fetch('/api/universities'),
        fetch('/api/reviews')
      ]);
      const dataUnivs = await resUnivs.json();
      const dataRevs = await resRevs.json();
      setUniversities(dataUnivs);
      setReviews(dataRevs);
    } catch (err) {
      console.error('Failed to load lists', err);
    } finally {
      setDataLoading(false);
    }
  }

  // Handle Login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Server connection failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout submission
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        setIsAuthenticated(false);
        setUniversities([]);
        setReviews([]);
      }
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  // Convert uploaded logo image file to Base64 data string
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // limit 2MB
        setUnivSubmitError('Logo image is too large. Please select a file under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUnivLogoBase64(reader.result as string);
      };
      reader.onerror = () => {
        setUnivSubmitError('Failed to read image file.');
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a Partner University
  const handleAddUniversity = async (e: React.FormEvent) => {
    e.preventDefault();
    setUnivSubmitError('');
    setUnivSubmitSuccess('');
    setUnivSubmitting(true);

    if (!univName || !univLocation || !univAccreditation || !univTuition || !univOnsite) {
      setUnivSubmitError('Please complete all required fields.');
      setUnivSubmitting(false);
      return;
    }

    try {
      const payload = {
        name: univName,
        location: univLocation,
        region: univRegion,
        degreeCategory: univDegree,
        accreditation: univAccreditation,
        tuition: univTuition,
        onsiteFrequency: univOnsite,
        majors: univMajors,
        programs: univPrograms,
        logo: univLogoBase64
      };

      const res = await fetch('/api/universities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok) {
        setUnivSubmitSuccess(`Accredited Partner "${univName}" added successfully.`);
        // Reset inputs
        setUnivName('');
        setUnivLocation('');
        setUnivAccreditation('');
        setUnivTuition('');
        setUnivOnsite('');
        setUnivMajors('');
        setUnivPrograms('');
        setUnivLogoBase64('');
        // Refresh items
        fetchData();
      } else {
        setUnivSubmitError(data.error || 'Failed to submit university details.');
      }
    } catch (err) {
      setUnivSubmitError('Network failure saving university.');
    } finally {
      setUnivSubmitting(false);
    }
  };

  // Delete a Partner University
  const handleDeleteUniversity = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}"?`)) return;

    try {
      const res = await fetch(`/api/universities?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setUniversities(prev => prev.filter(u => u.id !== id));
      } else {
        alert('Failed to delete university.');
      }
    } catch (err) {
      console.error('Delete request failed', err);
    }
  };

  // Add a Testimonial Review
  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setRevSubmitError('');
    setRevSubmitSuccess('');
    setRevSubmitting(true);

    if (!revName || !revQuote || !revUniv) {
      setRevSubmitError('Please fill out all required fields.');
      setRevSubmitting(false);
      return;
    }

    try {
      const payload = {
        name: revName,
        quote: revQuote,
        univ: revUniv,
        avatar: revAvatar
      };

      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok) {
        setRevSubmitSuccess(`Review by "${revName}" saved.`);
        setRevName('');
        setRevQuote('');
        setRevUniv('');
        setRevAvatar('');
        fetchData();
      } else {
        setRevSubmitError(data.error || 'Failed to submit review.');
      }
    } catch (err) {
      setRevSubmitError('Network failure saving review.');
    } finally {
      setRevSubmitting(false);
    }
  };

  // Delete a Review
  const handleDeleteReview = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to remove review by "${name}"?`)) return;

    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReviews(prev => prev.filter(r => r.id !== id));
      } else {
        alert('Failed to delete review.');
      }
    } catch (err) {
      console.error('Delete request failed', err);
    }
  };

  // Render initial status loading
  if (isAuthenticated === null) {
    return (
      <div className={styles.loadingScreen}>
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
          <h3 className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Day 1 CPT Navigator</h3>
          <p style={{ marginTop: '10px', color: 'var(--text-secondary)' }}>Verifying administrative security state...</p>
        </div>
      </div>
    );
  }

  // Render Login view if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className={styles.loginPageContainer}>
        {/* Background glow patterns */}
        <div className="bg-glow-orb orb-1" style={{ top: '25%', right: '15%' }}></div>
        <div className="bg-glow-orb orb-2" style={{ bottom: '20%', left: '15%' }}></div>

        <div className={`${styles.loginCard} glass-card`}>
          <div className={styles.loginHeader}>
            <span style={{ color: 'var(--accent-orange)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Management Portal
            </span>
            <h1 className="gradient-text">Administrator Login</h1>
            <p>Access the control dashboard to manage universities, program options, and reviews.</p>
          </div>

          <form onSubmit={handleLogin} className={styles.loginForm}>
            {loginError && <div className={styles.errorMessage}>{loginError}</div>}
            
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="admin@day1cptpath.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '15px' }} disabled={loginLoading}>
              {loginLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Dashboard if authenticated
  return (
    <div className={styles.portalContainer}>
      {/* Background patterns */}
      <div className="bg-glow-orb orb-1" style={{ top: '15%', right: '10%' }}></div>
      <div className="bg-glow-orb orb-2" style={{ bottom: '25%', left: '10%' }}></div>

      <header className={`${styles.portalHeader} glass-card`}>
        <div className={styles.headerInfo}>
          <h1>Admin Control Panel</h1>
          <p>Logged in as: <span style={{ color: 'var(--accent-orange)', fontWeight: 700 }}>day1cptpath@gmail.com</span></p>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary">
          Log Out
        </button>
      </header>

      {/* TABS SELECTOR */}
      <div className={styles.tabSelector}>
        <button
          onClick={() => setActiveTab('universities')}
          className={`${styles.tabBtn} ${activeTab === 'universities' ? styles.tabBtnActive : ''}`}
        >
          Manage Partnered Universities
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`${styles.tabBtn} ${activeTab === 'reviews' ? styles.tabBtnActive : ''}`}
        >
          Manage Student Testimonials
        </button>
      </div>

      {/* DASHBOARD CONTENT PANEL */}
      <div className={styles.dashboardGrid}>
        
        {/* TABS CONTAINER 1: UNIVERSITIES */}
        {activeTab === 'universities' && (
          <>
            {/* ADD UNIVERSITY FORM CARD */}
            <div className="glass-card" style={{ padding: '30px', height: 'fit-content' }}>
              <h2 className={styles.cardTitle}>Add Partner University</h2>
              <form onSubmit={handleAddUniversity} className={styles.dataForm}>
                {univSubmitError && <div className={styles.errorMessage}>{univSubmitError}</div>}
                {univSubmitSuccess && <div className={styles.successMessage}>{univSubmitSuccess}</div>}

                <div className={styles.formGroup}>
                  <label>University Name *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Westcliff University"
                    value={univName}
                    onChange={(e) => setUnivName(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Location (City, State) *</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. Irvine, California"
                      value={univLocation}
                      onChange={(e) => setUnivLocation(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Accreditation *</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. WASC Accredited"
                      value={univAccreditation}
                      onChange={(e) => setUnivAccreditation(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Region *</label>
                    <select
                      className="input-field"
                      value={univRegion}
                      onChange={(e) => setUnivRegion(e.target.value as any)}
                    >
                      <option value="West">West Coast</option>
                      <option value="East">East Coast</option>
                      <option value="Central">Central Coast / Midwest</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Degree Track Category *</label>
                    <select
                      className="input-field"
                      value={univDegree}
                      onChange={(e) => setUnivDegree(e.target.value as any)}
                    >
                      <option value="Both">Both (Tech & Business)</option>
                      <option value="Tech">Technical / STEM Only</option>
                      <option value="Business">Business / MBA Only</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Estimated Tuition *</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. $12,500 - $14,000 / year"
                      value={univTuition}
                      onChange={(e) => setUnivTuition(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Onsite Frequency *</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. 1 Weekend per Semester"
                      value={univOnsite}
                      onChange={(e) => setUnivOnsite(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Available Majors (comma separated) *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="MSCS, MSIT, MBA, DBA"
                    value={univMajors}
                    onChange={(e) => setUnivMajors(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Accredited Programs List (comma separated) *</label>
                  <textarea
                    rows={3}
                    className="input-field"
                    placeholder="MS Computer Science (STEM), Master of Business Administration"
                    value={univPrograms}
                    onChange={(e) => setUnivPrograms(e.target.value)}
                  ></textarea>
                </div>

                {/* LOGO FILE UPLOAD AND BASE64 CONVERTER */}
                <div className={styles.formGroup}>
                  <label>Accredited Partner Logo Image</label>
                  <div className={styles.fileUploadWrapper}>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                      onChange={handleLogoUpload}
                      style={{ display: 'none' }}
                      id="logo-file-input"
                    />
                    <label htmlFor="logo-file-input" className={styles.fileUploadBtn}>
                      Upload Image (JPEG/PNG/SVG)
                    </label>
                    {univLogoBase64 && (
                      <div className={styles.logoPreview}>
                        <img src={univLogoBase64} alt="Upload preview" />
                        <button type="button" onClick={() => setUnivLogoBase64('')} className={styles.clearLogoBtn}>✕ Remove</button>
                      </div>
                    )}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={univSubmitting}>
                  {univSubmitting ? 'Saving School...' : 'Add Partner University'}
                </button>
              </form>
            </div>

            {/* LIST UNIVERSITIES CARD */}
            <div className="glass-card" style={{ padding: '30px' }}>
              <h2 className={styles.cardTitle}>Current Partner Universities ({universities.length})</h2>
              {dataLoading ? (
                <div className={styles.loadingMessage}>Loading list...</div>
              ) : universities.length > 0 ? (
                <div className={styles.listContainer}>
                  {universities.map((u) => (
                    <div key={u.id} className={styles.listItem}>
                      <div className={styles.listItemMeta}>
                        <div className={styles.itemLogoContainer}>
                          {u.logo ? (
                            <img src={u.logo} alt={u.name} className={styles.tableLogo} />
                          ) : (
                            <div className={styles.tableAcronym}>
                              {u.name.split(' ').map(w => w[0]).join('').substring(0, 3)}
                            </div>
                          )}
                        </div>
                        <div className={styles.itemTextContainer}>
                          <h4 style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{u.name}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{u.location} | {u.accreditation}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeleteUniversity(u.id, u.name)} 
                        className={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyMessage}>No partner schools configured. Add one on the left.</div>
              )}
            </div>
          </>
        )}

        {/* TABS CONTAINER 2: REVIEWS */}
        {activeTab === 'reviews' && (
          <>
            {/* ADD REVIEW FORM CARD */}
            <div className="glass-card" style={{ padding: '30px', height: 'fit-content' }}>
              <h2 className={styles.cardTitle}>Add Testimonial Review</h2>
              <form onSubmit={handleAddReview} className={styles.dataForm}>
                {revSubmitError && <div className={styles.errorMessage}>{revSubmitError}</div>}
                {revSubmitSuccess && <div className={styles.successMessage}>{revSubmitSuccess}</div>}

                <div className={styles.formGroup}>
                  <label>Student Author Name *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Rajesh Patel"
                    value={revName}
                    onChange={(e) => setRevName(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>University & Current Job Title *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Westcliff University | Software Engineer"
                    value={revUniv}
                    onChange={(e) => setRevUniv(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Avatar Initials (Optional)</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. RP (defaults to initials of Author Name)"
                    value={revAvatar}
                    onChange={(e) => setRevAvatar(e.target.value)}
                    maxLength={3}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Student Testimonial Quote *</label>
                  <textarea
                    rows={4}
                    className="input-field"
                    placeholder="Describe their journey, OPT transition, and how navigation support was valuable..."
                    value={revQuote}
                    onChange={(e) => setRevQuote(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={revSubmitting}>
                  {revSubmitting ? 'Saving Review...' : 'Publish Testimonial'}
                </button>
              </form>
            </div>

            {/* LIST REVIEWS CARD */}
            <div className="glass-card" style={{ padding: '30px' }}>
              <h2 className={styles.cardTitle}>Active Testimonials ({reviews.length})</h2>
              {dataLoading ? (
                <div className={styles.loadingMessage}>Loading list...</div>
              ) : reviews.length > 0 ? (
                <div className={styles.listContainer}>
                  {reviews.map((r) => (
                    <div key={r.id} className={styles.listItem}>
                      <div className={styles.listItemMeta}>
                        <div className={styles.reviewAvatarCircle}>
                          {r.avatar}
                        </div>
                        <div className={styles.itemTextContainer}>
                          <h4 style={{ fontWeight: 800 }}>{r.name}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>{r.univ}</p>
                          <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>"{r.quote}"</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeleteReview(r.id, r.name)} 
                        className={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyMessage}>No active testimonials. Publish one on the left.</div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
