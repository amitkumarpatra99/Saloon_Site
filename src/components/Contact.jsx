import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-secondary)', transition: 'var(--transition-smooth)' }}>
      <div className="container">
        {/* Title */}
        <div className="section-title-container">
          <span className="section-subtitle">Locations & Hours</span>
          <h2 className="section-title">Visit the Sanctuary</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'start'
        }} className="contact-grid">
          {/* Contact Details Card */}
          <div className="glass-card" style={{ padding: '3rem 2.5rem', display: 'grid', gap: '2rem' }}>
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--accent)' }}>
              AURA Grand Parlour
            </h3>
            
            {/* Items */}
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {/* Address */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--accent)', marginTop: '0.2rem' }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>Location Address</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    742 Fifth Avenue, Luxury Row,<br />
                    Manhattan, New York, NY 10019
                  </p>
                </div>
              </div>

              {/* Phone & Chat */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--accent)', marginTop: '0.2rem' }}>
                  <Phone size={22} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>Call & WhatsApp</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    Receptionist: <a href="tel:+15550199" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>+1 (555) 0199</a>
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    WhatsApp: <a href="https://wa.me/15550199" style={{ color: '#25d366', fontWeight: 500 }}>+1 (555) 0199</a>
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--accent)', marginTop: '0.2rem' }}>
                  <Clock size={22} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>Opening Hours</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    Monday - Friday: 09:00 AM - 08:00 PM <br />
                    Saturday - Sunday: 09:00 AM - 09:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div style={{
              borderTop: '1px solid var(--border-light)',
              paddingTop: '1.5rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Follow our Art:
              </span>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" title="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" title="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" title="Twitter">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Map Frame */}
          <div style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            height: '420px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1843444498363!2d-73.97448868459368!3d40.76008697932688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f97ffea6f3%3A0x7d02283e20dfbe55!2s742%205th%20Ave%2C%20New%20York%2C%20NY%2010019!5e0!3m2!1sen!2sus!4v1655078518928!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="google-map-iframe"
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr 1.2fr !important;
          }
        }
        .social-icon-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--bg-tertiary);
          color: var(--accent);
          transition: var(--transition-smooth);
          border: 1px solid var(--border-light);
        }
        .social-icon-link:hover {
          background-color: var(--accent);
          color: #000000;
          transform: translateY(-3px);
          border-color: transparent;
        }
        
        /* Premium custom dark maps styling */
        .google-map-iframe {
          transition: filter 0.5s ease;
        }
        /* Invert colors only if global body doesn't have light-theme class */
        body:not(.light-theme) .google-map-iframe {
          filter: invert(90%) hue-rotate(180deg) grayscale(85%) contrast(90%);
        }
      `}</style>
    </section>
  );
};

export default Contact;
