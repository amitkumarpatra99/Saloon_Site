import React, { useState } from 'react';
import { Sun, Moon, Calendar, Shield, Menu, X, Phone } from 'lucide-react';

const Navbar = ({ currentView, setCurrentView, theme, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleNavClick = (id) => {
    setCurrentView('site');
    setMobileMenuOpen(false);
    
    // Smooth scroll to section
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--glass-border)',
      transition: 'var(--transition-smooth)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80px'
      }}>
        {/* Logo */}
        <a href="#home" onClick={() => handleNavClick('home')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.8rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            background: 'linear-gradient(135deg, var(--accent) 0%, #fff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            AURA
          </span>
          <span style={{
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            borderLeft: '1px solid var(--border)',
            paddingLeft: '0.5rem',
            marginTop: '0.2rem'
          }}>
            Luxury Spa
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none' }} className="desktop-nav">
          <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
                  style={{
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 500,
                    color: currentView === 'site' ? 'var(--text-primary)' : 'var(--text-secondary)'
                  }}
                  className="nav-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            style={{ 
              cursor: 'pointer', 
              color: 'var(--accent)', 
              padding: '0.5rem', 
              borderRadius: '50%',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-light)'
            }}
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Admin Switch */}
          <button
            onClick={() => setCurrentView(currentView === 'admin' ? 'site' : 'admin')}
            style={{
              cursor: 'pointer',
              color: currentView === 'admin' ? '#000000' : 'var(--text-primary)',
              backgroundColor: currentView === 'admin' ? 'var(--accent)' : 'var(--bg-tertiary)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              border: `1px solid ${currentView === 'admin' ? 'transparent' : 'var(--border)'}`
            }}
            title="Go to Admin Panel"
          >
            <Shield size={14} />
            <span>{currentView === 'admin' ? 'Dashboard' : 'Admin'}</span>
          </button>

          {/* Booking CTA Button */}
          <button
            onClick={() => handleNavClick('booking')}
            className="btn-gold"
            style={{
              padding: '0.55rem 1.25rem',
              fontSize: '0.8rem',
              display: 'none'
            }}
            id="desktop-book-btn"
          >
            <Calendar size={14} />
            <span>Book Now</span>
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: 'var(--text-primary)', cursor: 'pointer' }}
            className="mobile-nav-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '80px',
          left: 0,
          width: '100%',
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          padding: '2rem 1.5rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', listStyle: 'none' }}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
                  style={{
                    display: 'block',
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    fontWeight: 500,
                    color: 'var(--text-primary)'
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
              <button
                onClick={() => handleNavClick('booking')}
                className="btn-gold"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Calendar size={16} />
                <span>Book Appointment</span>
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Custom Inline CSS for responsive navbar classes */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: block !important;
          }
          #desktop-book-btn {
            display: inline-flex !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
        }
        .nav-link {
          position: relative;
          padding: 0.25rem 0;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: 0;
          left: 0;
          background-color: var(--accent);
          transition: var(--transition-fast);
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-link:hover {
          color: var(--accent) !important;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
