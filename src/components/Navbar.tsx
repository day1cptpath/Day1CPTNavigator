'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

interface NavItem {
  name: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Day1 CPT Universities & Programs', path: '/universities' },
  { name: 'Change Visa Status', path: '/visa' },
  { name: 'Contact Us', path: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Track scroll position for styles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.navContainer} container`}>
        {/* LOGO */}
        <Link href="/" className={styles.logo} onClick={() => setIsMobileMenuOpen(false)}>
          <img 
            src="/logo.jpg" 
            alt="Day1 CPT Navigator Logo" 
            style={{ height: '62px', width: 'auto', display: 'block', borderRadius: '4px' }} 
          />
        </Link>

        {/* DESKTOP MENU */}
        <nav className={styles.navMenu}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.path} className={styles.navItem}>
                  <Link
                    href={item.path}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* MOBILE MENU TRIGGER */}
        <button 
          className={`${styles.mobileMenuBtn} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>

        {/* MOBILE SLIDE-OUT MENU */}
        <div className={`${styles.navMenuWrapper} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <ul className={styles.navListMobile}>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`${styles.navLinkMobile} ${isActive ? styles.navLinkMobileActive : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
