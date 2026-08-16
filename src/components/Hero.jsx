import React from 'react';
import { Calendar, Phone, MessageSquare } from 'lucide-react';

const Hero = () => {
  const handleScrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      style={{
        position: 'relative',
        height: 'calc(100vh - 80px)',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: `linear-gradient(to right, rgba(10, 10, 10, 0.85) 30%, rgba(10, 10, 10, 0.4) 100%), url('/images/hero.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Gold Light Beam Effect */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '50%',
        height: '120%',
        background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.08) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '650px' }} className="animate-fade-in-up">
          {/* Welcome Tag */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '50px',
            marginBottom: '1.5rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--accent)'
          }}>
            <span>Experience The Art of Grooming</span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
            marginBottom: '1.5rem',
            fontWeight: 700,
            lineHeight: 1.1
          }}>
            Where Elegance <br />
            Meets <span className="text-gold" style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', fontWeight: 400 }}>Artistry</span>
          </h1>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--text-secondary)',
            marginBottom: '2.5rem',
            fontWeight: 300,
            maxWidth: '550px',
            lineHeight: 1.6
          }}>
            Indulge in couture hair design, therapeutic spas, and flawless makeup styling. Crafted by master artists within a sanctuary of luxury.
          </p>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <button 
              onClick={handleScrollToBooking}
              className="btn-gold"
              style={{ padding: '1rem 2.2rem' }}
            >
              <Calendar size={18} />
              <span>Book Appointment</span>
            </button>

            <a 
              href="tel:+15550199" 
              className="btn-outline"
              style={{ padding: '1rem 2.2rem' }}
            >
              <Phone size={18} />
              <span>Call Now</span>
            </a>

            <a 
              href="https://wa.me/15550199?text=Hi,%20I'd%20like%20to%20book%20an%20appointment%20at%20AURA." 
              className="btn-outline"
              style={{
                borderColor: '#25d366',
                color: '#25d366',
                padding: '1rem 2.2rem'
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-btn btn-outline"
            >
              <MessageSquare size={18} />
              <span>WhatsApp Booking</span>
            </a>
          </div>
        </div>
      </div>

      {/* Embedded style overrides for hover colors */}
      <style>{`
        .wa-btn:hover {
          background-color: #25d366 !important;
          color: #ffffff !important;
          border-color: transparent !important;
        }
      `}</style>
    </section>
  );
};

export default Hero;
