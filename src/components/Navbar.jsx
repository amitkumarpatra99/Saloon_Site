import React, { useEffect, useState } from 'react';
import {
  Sun,
  Moon,
  Calendar,
  Shield,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

const Navbar = ({
  currentView,
  setCurrentView,
  theme,
  toggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Packages', id: 'packages' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'Team', id: 'team' },
    { label: 'Contact', id: 'contact' },
  ];

  /* --------------------------------
     Detect Active Section
  -------------------------------- */
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0.1, 0.25, 0.5]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  /* --------------------------------
     Prevent Body Scroll on Mobile
  -------------------------------- */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  /* --------------------------------
     Navigation Handler
  -------------------------------- */
  const handleNavClick = (id) => {
    setCurrentView('site');
    setMobileMenuOpen(false);

    setTimeout(() => {
      const element = document.getElementById(id);

      if (element) {
        const navbarHeight = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: elementPosition - navbarHeight,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  /* --------------------------------
     Admin Toggle
  -------------------------------- */
  const handleAdminToggle = () => {
    setCurrentView(currentView === 'admin' ? 'site' : 'admin');
    setMobileMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <header
        className="aura-navbar"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: '1px solid var(--glass-border)',
          transition: 'all 0.3s ease'
        }}
      >
        <div
          className="container aura-navbar-container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '80px',
            gap: '1rem'
          }}
        >
          {/* =========================
              LOGO
          ========================== */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="aura-logo"
            aria-label="AURA Luxury Spa Home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              flexShrink: 0,
              textDecoration: 'none'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.45rem, 3vw, 1.8rem)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                background:
                  'linear-gradient(135deg, var(--accent) 0%, #fff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1
              }}
            >
              AURA
            </span>

            <span
              className="logo-subtitle"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                borderLeft: '1px solid var(--border)',
                paddingLeft: '0.55rem',
                lineHeight: 1.4,
                whiteSpace: 'nowrap'
              }}
            >
              Luxury Spa
            </span>
          </a>

          {/* =========================
              DESKTOP NAVIGATION
          ========================== */}
          <nav
            className="desktop-nav"
            aria-label="Main navigation"
          >
            <ul
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(1rem, 2vw, 2rem)',
                listStyle: 'none',
                margin: 0,
                padding: 0
              }}
            >
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id);
                    }}
                    className={`nav-link ${
                      activeSection === link.id ? 'active' : ''
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* =========================
              ACTION CONTROLS
          ========================== */}
          <div
            className="navbar-actions"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              flexShrink: 0
            }}
          >
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="navbar-icon-btn"
              aria-label={
                theme === 'dark'
                  ? 'Switch to light theme'
                  : 'Switch to dark theme'
              }
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            {/* Admin */}
            <button
              onClick={handleAdminToggle}
              className={`admin-btn ${
                currentView === 'admin' ? 'admin-active' : ''
              }`}
              aria-label={
                currentView === 'admin'
                  ? 'Return to website'
                  : 'Open admin dashboard'
              }
            >
              <Shield size={14} />

              <span className="admin-text">
                {currentView === 'admin'
                  ? 'Dashboard'
                  : 'Admin'}
              </span>
            </button>

            {/* Desktop Booking */}
            <button
              onClick={() => handleNavClick('booking')}
              className="booking-btn desktop-booking"
            >
              <Calendar size={15} />
              <span>Book Now</span>
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() =>
                setMobileMenuOpen((prev) => !prev)
              }
              className="mobile-menu-btn"
              aria-label={
                mobileMenuOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* =========================
            MOBILE MENU
        ========================== */}
        <div
          className={`mobile-menu ${
            mobileMenuOpen ? 'mobile-menu-open' : ''
          }`}
        >
          <div className="mobile-menu-inner">

            {/* Mobile Header */}
            <div className="mobile-menu-heading">
              <div>
                <span className="mobile-menu-label">
                  AURA
                </span>

                <span className="mobile-menu-subtitle">
                  Luxury Spa
                </span>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-close-btn"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Links */}
            <nav aria-label="Mobile navigation">
              <ul className="mobile-nav-list">
                {navLinks.map((link, index) => (
                  <li
                    key={link.id}
                    style={{
                      animationDelay: `${index * 35}ms`
                    }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.id);
                      }}
                      className={`mobile-nav-link ${
                        activeSection === link.id
                          ? 'mobile-active'
                          : ''
                      }`}
                    >
                      <span>
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <strong>{link.label}</strong>

                      <ChevronRight size={17} />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Booking */}
            <button
              onClick={() => handleNavClick('booking')}
              className="booking-btn mobile-booking"
            >
              <Calendar size={17} />
              <span>Book Appointment</span>
            </button>

            {/* Mobile Admin */}
            <button
              onClick={handleAdminToggle}
              className="mobile-admin-btn"
            >
              <Shield size={16} />

              <span>
                {currentView === 'admin'
                  ? 'Back to Website'
                  : 'Admin Dashboard'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================
          INLINE RESPONSIVE CSS
      ========================== */}
      <style>{`

        /* =========================
           DESKTOP NAV
        ========================== */

        .desktop-nav {
          display: none;
        }

        .nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 0.4rem 0;
          color: var(--text-primary);
          text-decoration: none;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 500;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 1px;
          background: var(--accent);
          transition: width 0.3s ease;
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--accent) !important;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }


        /* =========================
           ICON BUTTON
        ========================== */

        .navbar-icon-btn {
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--accent);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-light);
          border-radius: 50%;
          transition: all 0.25s ease;
        }

        .navbar-icon-btn:hover {
          transform: rotate(10deg) scale(1.05);
          border-color: var(--accent);
        }


        /* =========================
           ADMIN BUTTON
        ========================== */

        .admin-btn {
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.5rem 0.85rem;
          border-radius: 22px;
          cursor: pointer;
          color: var(--text-primary);
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          font-size: 0.76rem;
          font-weight: 600;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .admin-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .admin-btn.admin-active {
          color: #000;
          background: var(--accent);
          border-color: transparent;
        }


        /* =========================
           BOOKING BUTTON
        ========================== */

        .booking-btn {
          min-height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          border: 0;
          border-radius: 22px;
          padding: 0.6rem 1.15rem;
          cursor: pointer;
          background: var(--accent);
          color: #000;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          transition: all 0.25s ease;
        }

        .booking-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
        }


        /* =========================
           MOBILE MENU BUTTON
        ========================== */

        .mobile-menu-btn {
          width: 42px;
          height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid var(--border-light);
          background: var(--bg-tertiary);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .mobile-menu-btn:hover {
          color: var(--accent);
          border-color: var(--accent);
        }


        /* =========================
           MOBILE MENU
        ========================== */

        .mobile-menu {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          height: calc(100dvh - 80px);
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          overflow-y: auto;
          overscroll-behavior: contain;

          opacity: 0;
          visibility: hidden;
          transform: translateY(-12px);

          transition:
            opacity 0.25s ease,
            transform 0.25s ease,
            visibility 0.25s ease;
        }

        .mobile-menu-open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .mobile-menu-inner {
          width: min(100%, 560px);
          margin: 0 auto;
          padding: 1.25rem 1.25rem 2rem;
        }


        /* =========================
           MOBILE MENU HEADING
        ========================== */

        .mobile-menu-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          margin-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-light);
        }

        .mobile-menu-label {
          display: block;
          color: var(--accent);
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .mobile-menu-subtitle {
          display: block;
          margin-top: 2px;
          color: var(--text-secondary);
          font-size: 0.58rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        .mobile-close-btn {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--border-light);
          cursor: pointer;
        }


        /* =========================
           MOBILE LINKS
        ========================== */

        .mobile-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
        }

        .mobile-nav-list li {
          border-bottom: 1px solid var(--border-light);
          animation: mobileLinkIn 0.3s ease both;
        }

        @keyframes mobileLinkIn {
          from {
            opacity: 0;
            transform: translateX(-12px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .mobile-nav-link {
          min-height: 58px;
          display: grid;
          grid-template-columns: 32px 1fr auto;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: var(--text-primary);
          transition: all 0.25s ease;
        }

        .mobile-nav-link > span {
          color: var(--text-secondary);
          font-size: 0.68rem;
          letter-spacing: 0.08em;
        }

        .mobile-nav-link strong {
          font-size: 0.92rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .mobile-nav-link svg {
          color: var(--text-secondary);
          transition: transform 0.25s ease;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.mobile-active {
          color: var(--accent);
        }

        .mobile-nav-link:hover svg,
        .mobile-nav-link.mobile-active svg {
          color: var(--accent);
          transform: translateX(4px);
        }


        /* =========================
           MOBILE BOOKING
        ========================== */

        .mobile-booking {
          width: 100%;
          margin-top: 1.5rem;
          min-height: 52px;
          border-radius: 14px;
          font-size: 0.85rem;
        }


        /* =========================
           MOBILE ADMIN
        ========================== */

        .mobile-admin-btn {
          width: 100%;
          min-height: 48px;
          margin-top: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          border-radius: 12px;
          background: transparent;
          color: var(--text-primary);
          border: 1px solid var(--border);
          cursor: pointer;
          font-size: 0.82rem;
          font-weight: 600;
          transition: all 0.25s ease;
        }

        .mobile-admin-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }


        /* =========================
           TABLET
        ========================== */

        @media (min-width: 768px) {

          .aura-navbar-container {
            height: 84px !important;
          }

          .mobile-menu {
            top: 84px;
            height: calc(100dvh - 84px);
          }

          .mobile-menu-inner {
            padding-left: 2rem;
            padding-right: 2rem;
          }

          .mobile-nav-link {
            min-height: 62px;
          }
        }


        /* =========================
           DESKTOP
        ========================== */

        @media (min-width: 1024px) {

          .desktop-nav {
            display: block;
          }

          .desktop-booking {
            display: inline-flex;
          }

          .mobile-menu-btn {
            display: none;
          }

          .mobile-menu {
            display: none;
          }

          .navbar-actions {
            gap: 0.7rem !important;
          }

          .nav-link {
            font-size: 0.78rem;
          }
        }


        /* =========================
           LARGE DESKTOP
        ========================== */

        @media (min-width: 1200px) {

          .nav-link {
            font-size: 0.82rem;
          }

          .navbar-actions {
            gap: 0.85rem !important;
          }
        }


        /* =========================
           SMALL MOBILE
        ========================== */

        @media (max-width: 420px) {

          .aura-navbar-container {
            height: 70px !important;
          }

          .mobile-menu {
            top: 70px;
            height: calc(100dvh - 70px);
          }

          .logo-subtitle {
            display: none !important;
          }

          .aura-logo span:first-child {
            font-size: 1.55rem !important;
          }

          .navbar-actions {
            gap: 0.4rem !important;
          }

          .navbar-icon-btn,
          .mobile-menu-btn {
            width: 38px;
            height: 38px;
          }

          .admin-btn {
            width: 38px;
            height: 38px;
            padding: 0;
            border-radius: 50%;
          }

          .admin-text {
            display: none;
          }

          .mobile-menu-inner {
            padding: 1rem 1rem 1.5rem;
          }

          .mobile-nav-link {
            min-height: 55px;
          }

          .mobile-nav-link strong {
            font-size: 0.82rem;
          }
        }


        /* =========================
           VERY SMALL MOBILE
        ========================== */

        @media (max-width: 340px) {

          .aura-navbar-container {
            padding-left: 0.8rem;
            padding-right: 0.8rem;
          }

          .aura-logo span:first-child {
            font-size: 1.4rem !important;
          }

          .navbar-actions {
            gap: 0.3rem !important;
          }

          .navbar-icon-btn,
          .mobile-menu-btn,
          .admin-btn {
            width: 36px;
            height: 36px;
          }
        }


        /* =========================
           REDUCED MOTION
        ========================== */

        @media (prefers-reduced-motion: reduce) {

          .mobile-menu,
          .nav-link,
          .booking-btn,
          .mobile-nav-link,
          .navbar-icon-btn,
          .admin-btn {
            transition: none !important;
          }

          .mobile-nav-list li {
            animation: none !important;
          }
        }

      `}</style>
    </>
  );
};

export default Navbar;