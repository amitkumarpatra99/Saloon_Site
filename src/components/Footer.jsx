import React, { useState } from 'react';
import { ChevronRight, Mail } from 'lucide-react';

const Footer = ({ setCurrentView }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const scrollToSection = (id) => {
    setCurrentView('site');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer style={{
      backgroundColor: 'var(--bg-primary)',
      borderTop: '1px solid var(--border-light)',
      padding: '5rem 0 2rem 0',
      transition: 'var(--transition-smooth)'
    }}>
      <div className="container">
        {/* Footer Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {/* Col 1: Brand Info */}
          <div>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.8rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              background: 'linear-gradient(135deg, var(--accent) 0%, #fff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'block',
              marginBottom: '1rem'
            }}>
              AURA
            </span>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Where modern grooming meets classic beauty rituals. A sanctuary designed to pamper and elevate your personal expression.
            </p>
          </div>

          {/* Col 2: Quick Navigation */}
          <div>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.75rem' }}>
              {['home', 'about', 'services', 'packages', 'gallery', 'reviews', 'team', 'contact'].map((sect) => (
                <li key={sect}>
                  <a
                    href={`#${sect}`}
                    onClick={(e) => { e.preventDefault(); scrollToSection(sect); }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      transition: 'var(--transition-fast)'
                    }}
                    className="footer-nav-link"
                  >
                    <ChevronRight size={12} style={{ marginRight: '0.4rem', color: 'var(--accent)' }} />
                    <span style={{ textTransform: 'capitalize' }}>{sect}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Services */}
          <div>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
              Specialties
            </h4>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <li>Signature Haircut & Design</li>
              <li>Hand-Painted Balayage Highlights</li>
              <li>Royal Milk & Honey Pedicure</li>
              <li>HydraGlow Diamond Facials</li>
              <li>Flawless Airbrush Bridal Makeup</li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
              Newsletter Sign Up
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.5 }}>
              Subscribe to receive updates on VIP slots, seasonal styling trends, and exclusive member discounts.
            </p>

            {subscribed ? (
              <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600 }}>
                Thank you for subscribing!
              </span>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Mail size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.6rem 0.6rem 2.2rem',
                      fontSize: '0.8rem',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '4px'
                    }}
                    className="footer-mail-input"
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: '#000000',
                    fontWeight: 600,
                    padding: '0.6rem 1rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                  className="footer-sub-btn"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom Credentials */}
        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <p>© {new Date().getFullYear()} AURA Luxury Salon & Spa. All Rights Reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#privacy" style={{ hover: 'color: var(--accent)' }}>Privacy Policy</a>
            <a href="#terms" style={{ hover: 'color: var(--accent)' }}>Terms of Service</a>
            <span style={{ cursor: 'pointer', color: 'var(--accent)' }} onClick={() => scrollToSection('home')}>Back to Top ↑</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-nav-link:hover {
          color: var(--accent) !important;
          transform: translateX(3px);
        }
        .footer-mail-input:focus {
          border-color: var(--accent) !important;
        }
        .footer-sub-btn:hover {
          background-color: var(--text-primary);
          color: var(--bg-primary);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
