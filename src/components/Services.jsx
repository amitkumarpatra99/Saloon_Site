import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const Services = ({ services, onSelectService }) => {
  // Extract unique categories dynamically from the current service list
  const categories = Array.from(new Set(services.map(s => s.category)));
  const [activeCategory, setActiveCategory] = useState(categories[0] || "Haircut & Styling");

  const filteredServices = services.filter(s => s.category === activeCategory);

  const handleBookService = (serviceName) => {
    onSelectService(serviceName);
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-primary)', transition: 'var(--transition-smooth)' }}>
      <div className="container">
        {/* Title */}
        <div className="section-title-container">
          <span className="section-subtitle">Catalog of Services</span>
          <h2 className="section-title">Luxury Treatments & Pricing</h2>
        </div>

        {/* Categories Tab Bar */}
        <div className="tabs-container" style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '3.5rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px solid var(--border-light)'
        }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                cursor: 'pointer',
                padding: '0.75rem 1.5rem',
                borderRadius: '30px',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'var(--transition-smooth)',
                backgroundColor: activeCategory === category ? 'var(--accent)' : 'var(--bg-secondary)',
                color: activeCategory === category ? '#000000' : 'var(--text-primary)',
                border: `1px solid ${activeCategory === category ? 'transparent' : 'var(--border-light)'}`
              }}
              className="service-tab-btn"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Pricing Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }} key={activeCategory} className="animate-fade-in">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="glass-card"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2.5rem 2rem',
                border: '1px solid var(--border-light)',
                minHeight: '220px'
              }}
            >
              {/* Popular Badge */}
              {service.popular && (
                <span className="badge-popular">
                  <Sparkles size={10} style={{ marginRight: '0.2rem', display: 'inline' }} />
                  Popular
                </span>
              )}

              <div>
                {/* Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '1rem',
                  gap: '1rem'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600
                  }}>
                    {service.name}
                  </h3>
                  <span style={{
                    fontSize: '1.5rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    whiteSpace: 'nowrap'
                  }}>
                    ₹{service.price}
                  </span>
                </div>

                {/* Description */}
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  marginBottom: '2rem'
                }}>
                  {service.description}
                </p>
              </div>

              {/* Action */}
              <button
                onClick={() => handleBookService(service.name)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--accent)',
                  cursor: 'pointer',
                  width: 'fit-content',
                  transition: 'var(--transition-fast)'
                }}
                className="service-book-btn"
              >
                <span>Book This Treatment</span>
                <ArrowRight size={14} className="arrow-icon" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .service-tab-btn:hover {
          background-color: var(--accent);
          color: #000000;
          border-color: transparent;
        }
        .service-book-btn:hover {
          color: var(--text-primary);
        }
        .service-book-btn:hover .arrow-icon {
          transform: translateX(5px);
        }
        .arrow-icon {
          transition: transform 0.2s ease;
        }
      `}</style>
    </section>
  );
};

export default Services;
