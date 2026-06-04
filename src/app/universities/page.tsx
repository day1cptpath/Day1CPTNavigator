'use client';

import React, { useState } from 'react';
import styles from './universities.module.css';

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
  logo?: string;
}

export default function Universities() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [regionFilter, setRegionFilter] = useState<'All' | 'West' | 'East' | 'Central'>('All');
  const [degreeFilter, setDegreeFilter] = useState<'All' | 'Tech' | 'Business'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  React.useEffect(() => {
    async function fetchUniversities() {
      try {
        const res = await fetch('/api/universities');
        const data = await res.json();
        setUniversities(data);
      } catch (err) {
        console.error('Failed to load universities', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUniversities();
  }, []);

  const toggleExpandCard = (id: number) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  };

  // Filter logic
  const filteredUniversities = universities.filter((univ) => {
    const matchesRegion = regionFilter === 'All' || univ.region === regionFilter;
    
    let matchesDegree = true;
    if (degreeFilter === 'Tech') {
      matchesDegree = univ.degreeCategory === 'Tech' || univ.degreeCategory === 'Both';
    } else if (degreeFilter === 'Business') {
      matchesDegree = univ.degreeCategory === 'Business' || univ.degreeCategory === 'Both';
    }

    const matchesSearch = 
      univ.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      univ.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      univ.majors.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesRegion && matchesDegree && matchesSearch;
  });

  return (
    <div className="anim-fade">
      {/* BACKGROUND ORBS */}
      <div className="bg-glow-orb orb-1" style={{ top: '20%', right: '10%' }}></div>
      <div className="bg-glow-orb orb-2" style={{ bottom: '30%', left: '10%' }}></div>

      {/* PAGE HEADER */}
      <section className="container" style={{ padding: '80px 24px 20px' }}>
        <div className="page-header">
          <div className="gradient-text" style={{ fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>
            Day 1 CPT Directories
          </div>
          <h1>CPT Universities & Programs</h1>
          <p>
            Explore our curated database of accredited universities offering Day 1 CPT programs. Review hybrid attendance requirements, tuition fees, and STEM designations.
          </p>
        </div>
      </section>

      {/* FILTER CONTROLS */}
      <section className="container" style={{ paddingBottom: '20px' }}>
        <div className={`${styles.controls} glass-card`} style={{ padding: '30px' }}>
          {/* SEARCH INPUT */}
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search universities by name, location, or majors (e.g. Westcliff, MBA, California)..."
              className="input-field"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* REGION FILTER */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Region:</span>
            {(['All', 'West', 'East', 'Central'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRegionFilter(r)}
                className={`${styles.filterBtn} ${regionFilter === r ? styles.filterBtnActive : ''}`}
              >
                {r === 'All' ? 'All Regions' : `${r} Coast`}
              </button>
            ))}
          </div>

          {/* DEGREE FILTER */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Degree Track:</span>
            {(['All', 'Tech', 'Business'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDegreeFilter(d)}
                className={`${styles.filterBtn} ${degreeFilter === d ? styles.filterBtnActive : ''}`}
              >
                {d === 'All' ? 'All Degrees' : d === 'Tech' ? 'STEM / Technical' : 'MBA & Business'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID DISPLAY */}
      <section className="container section-padding" style={{ paddingTop: '20px', paddingBottom: '100px' }}>
        {loading ? (
          <div className="glass-card" style={{ padding: '60px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Loading Directories...</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Gathering program details from our partner institutions.</p>
          </div>
        ) : filteredUniversities.length > 0 ? (
          <div className={styles.grid}>
            {filteredUniversities.map((univ) => {
              const isExpanded = expandedCard === univ.id;
              return (
                <div key={univ.id} className={`${styles.card} glass-card`}>
                  {/* HEADER */}
                  <div className={styles.cardHeader}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                        <span className={styles.univBadge}>{univ.accreditation}</span>
                        <h3 className={styles.univName}>{univ.name}</h3>
                      </div>
                      {univ.logo ? (
                        <img 
                          src={univ.logo} 
                          alt={univ.name} 
                          style={{ 
                            width: '48px', 
                            height: '48px', 
                            objectFit: 'contain', 
                            borderRadius: '8px', 
                            border: '1px solid var(--glass-border)', 
                            padding: '4px', 
                            background: '#ffffff',
                            flexShrink: 0 
                          }} 
                        />
                      ) : (
                        <div 
                          style={{ 
                            width: '48px', 
                            height: '48px', 
                            borderRadius: '8px', 
                            background: 'var(--bg-tertiary)', 
                            border: '1px solid var(--glass-border)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            fontWeight: '800', 
                            fontSize: '0.85rem', 
                            color: 'var(--accent-orange)',
                            flexShrink: 0
                          }}
                        >
                          {univ.name.split(' ').map((w) => w[0]).join('').toUpperCase().substring(0, 3)}
                        </div>
                      )}
                    </div>
                    <div className={styles.univLoc} style={{ marginTop: '10px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {univ.location}
                    </div>
                  </div>

                  {/* BODY */}
                  <div className={styles.cardBody}>
                    <div className={styles.statRow}>
                      <span className={styles.statLabel}>Est. Tuition:</span>
                      <span className={`${styles.statValue} gradient-text`}>{univ.tuition}</span>
                    </div>
                    <div className={styles.statRow}>
                      <span className={styles.statLabel}>Onsite Residency:</span>
                      <span className={styles.statValue}>{univ.onsiteFrequency}</span>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                      <span className={styles.statLabel} style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem' }}>Available Tracks:</span>
                      <div className={styles.tagGroup}>
                        {univ.majors.map((tag) => (
                          <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* EXPAND ACTION */}
                  <button 
                    onClick={() => toggleExpandCard(univ.id)} 
                    className={styles.toggleBtn}
                  >
                    <span>{isExpanded ? 'Hide Program Options' : 'View Full Program List'}</span>
                    <svg 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                      style={{ 
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>

                  {/* EXPANDABLE PROGRAM ACCORDION */}
                  <div className={`${styles.expandPanel} ${isExpanded ? styles.expandPanelOpen : ''}`}>
                    <div className={styles.expandContent}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, borderBottom: '1px solid var(--glass-border)', paddingBottom: '6px' }}>
                        Accredited Programs:
                      </h4>
                      <ul className={styles.programList}>
                        {univ.programs.map((p) => (
                          <li key={p} className={styles.programItem}>
                            <span className={styles.programIcon}>✓</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-card" style={{ padding: '60px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>No Universities Match Your Filters</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Try clearing your search query or selecting "All Regions" / "All Degrees".</p>
          </div>
        )}
      </section>
    </div>
  );
}
