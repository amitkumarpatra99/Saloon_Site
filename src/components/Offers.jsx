import React from 'react';
import { Tag, Sparkles, Star, Calendar } from 'lucide-react';
import { SPECIAL_OFFERS } from '../data/mockData';

const Offers = ({ onSelectService }) => {
  const handleBookOffer = (title) => {
    onSelectService(title);
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-secondary)', transition: 'var(--transition-smooth)' }}>
      <div className="container">
        {/* Title */}
        <div className="section-title-container">
          <span className="section-subtitle">Exquisite Packages</span>
          <h2 className="section-title">Combo Offers & Memberships</h2>
        </div>

        {/* Offers Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {SPECIAL_OFFERS.map((offer) => {
            const isVip = offer.id === 'o4';
            return (
              <div
                key={offer.id}
                className="glass-card"
                style={{
                  position: 'relative',
                  border: isVip ? '2px solid var(--accent)' : '1px solid var(--border-light)',
                  padding: '3rem 2rem 2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: isVip ? 'linear-gradient(to bottom, rgba(212, 175, 55, 0.08), rgba(18, 18, 18, 0.95))' : 'var(--glass-bg)',
                  boxShadow: isVip ? '0 15px 35px rgba(212, 175, 55, 0.15)' : 'var(--shadow)'
                }}
              >
                {/* Accent Badge */}
                {offer.badge && (
                  <span className="badge-popular" style={{ top: '-12px', right: '20px' }}>
                    {offer.id === 'o1' && <Star size={10} style={{ display: 'inline', marginRight: '0.2rem' }} />}
                    {offer.badge}
                  </span>
                )}

                <div>
                  {/* Icon */}
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: isVip ? 'var(--accent)' : 'var(--accent-light)',
                    color: isVip ? '#000000' : 'var(--accent)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    {isVip ? <Sparkles size={22} /> : <Tag size={22} />}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '1.4rem',
                    marginBottom: '1rem',
                    color: 'var(--text-primary)'
                  }}>
                    {offer.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    marginBottom: '2rem'
                  }}>
                    {offer.description}
                  </p>
                </div>

                {/* Footer Details */}
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '0.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    {offer.price ? (
                      <>
                        <span style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--accent)' }}>
                          ₹{offer.price}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600 }}>
                          {offer.discount}
                        </span>
                      </>
                    ) : (
                      <span style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--accent)' }}>
                        {offer.discount}
                      </span>
                    )}
                  </div>

                  {/* Book CTA */}
                  <button
                    onClick={() => handleBookOffer(offer.title)}
                    className={isVip ? 'btn-gold' : 'btn-outline'}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Calendar size={16} />
                    <span>Secure Package</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Offers;
