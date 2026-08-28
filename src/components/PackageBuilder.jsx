import React, { useState, useMemo } from 'react';
import { Sparkles, Calendar, Clock, Check, Award, ArrowRight } from 'lucide-react';

const PackageBuilder = ({ services, onSelectService }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  // Estimate duration based on category
  const getDuration = (category) => {
    switch (category) {
      case 'Haircut & Styling': return 45;
      case 'Hair Color': return 90;
      case 'Hair Spa': return 60;
      case 'Facial': return 60;
      case 'Cleanup': return 45;
      case 'Manicure & Pedicure': return 60;
      case 'Bridal Makeup': return 120;
      case 'Groom Makeup': return 60;
      case 'Waxing': return 45;
      case 'Skin Care': return 75;
      default: return 45;
    }
  };

  const handleToggleService = (id) => {
    setSelectedIds((prev) => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Group services by category
  const servicesByCategory = useMemo(() => {
    const groups = {};
    services.forEach(s => {
      if (!groups[s.category]) {
        groups[s.category] = [];
      }
      groups[s.category].push({
        ...s,
        duration: getDuration(s.category)
      });
    });
    return groups;
  }, [services]);

  // Calculations
  const selectedServices = useMemo(() => {
    return services.filter(s => selectedIds.includes(s.id)).map(s => ({
      ...s,
      duration: getDuration(s.category)
    }));
  }, [selectedIds, services]);

  const subtotal = useMemo(() => {
    return selectedServices.reduce((sum, s) => sum + s.price, 0);
  }, [selectedServices]);

  const totalDuration = useMemo(() => {
    return selectedServices.reduce((sum, s) => sum + s.duration, 0);
  }, [selectedServices]);

  const discountRate = useMemo(() => {
    const count = selectedServices.length;
    if (count >= 3) return 0.15; // 15% off for 3+ services
    if (count === 2) return 0.10; // 10% off for 2 services
    return 0;
  }, [selectedServices]);

  const discountAmount = Math.round(subtotal * discountRate);
  const finalPrice = subtotal - discountAmount;

  const handleBook = () => {
    if (selectedServices.length === 0) return;
    
    // Create a package summary string
    const pkgNames = selectedServices.map(s => s.name).join(' + ');
    const summary = `Custom Combo: ${pkgNames} (₹${finalPrice})`;
    
    onSelectService(summary);
    
    setTimeout(() => {
      const el = document.getElementById('booking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <section id="packages" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-secondary)', transition: 'var(--transition-smooth)' }}>
      <div className="container">
        {/* Title */}
        <div className="section-title-container">
          <span className="section-subtitle">Tailor Your Visit</span>
          <h2 className="section-title">AURA Package Customizer</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'start'
        }} className="builder-layout-grid">
          
          {/* Service Selector Panel */}
          <div style={{ display: 'grid', gap: '2rem' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
              Select multiple styling treatments to design your own custom ritual. The more services you combine, the more elite perks and package discounts you unlock automatically.
            </p>

            {Object.keys(servicesByCategory).map((category) => (
              <div key={category} style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-light)',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: 'var(--shadow)'
              }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  marginBottom: '1rem',
                  borderBottom: '1px solid var(--border-light)',
                  paddingBottom: '0.5rem'
                }}>
                  {category}
                </h3>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  {servicesByCategory[category].map((s) => {
                    const isSelected = selectedIds.includes(s.id);
                    return (
                      <div 
                        key={s.id} 
                        onClick={() => handleToggleService(s.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '1rem',
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          backgroundColor: isSelected ? 'var(--accent-light)' : 'var(--bg-secondary)',
                          border: `1px solid ${isSelected ? 'var(--accent)' : 'transparent'}`,
                          transition: 'var(--transition-fast)'
                        }}
                        className="builder-service-item"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          {/* Check Box */}
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--text-muted)'}`,
                            backgroundColor: isSelected ? 'var(--accent)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#000',
                            flexShrink: 0
                          }}>
                            {isSelected && <Check size={12} strokeWidth={3} />}
                          </div>
                          
                          <div>
                            <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)', display: 'block' }}>
                              {s.name}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.15rem' }}>
                              <Clock size={10} /> {s.duration} mins
                            </span>
                          </div>
                        </div>

                        <span style={{ fontWeight: 600, color: isSelected ? 'var(--accent)' : 'var(--text-primary)' }}>
                          ₹{s.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Calculator Estimation Card */}
          <div className="glass-card" style={{
            position: 'sticky',
            top: '100px',
            border: selectedIds.length > 0 ? '1px solid var(--accent)' : '1px solid var(--border-light)',
            padding: '2.5rem 2rem',
            background: 'linear-gradient(to bottom, var(--glass-bg), var(--bg-tertiary))'
          }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <Sparkles size={20} className="text-gold" />
              <span>Package Summary</span>
            </h3>

            {selectedServices.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Choose treatments on the left to begin customizing your premium styling package.
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {/* List Selected */}
                <div style={{
                  maxHeight: '180px',
                  overflowY: 'auto',
                  display: 'grid',
                  gap: '0.75rem',
                  paddingRight: '0.5rem',
                  borderBottom: '1px solid var(--border-light)',
                  paddingBottom: '1.25rem'
                }}>
                  {selectedServices.map(s => (
                    <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{s.name}</span>
                      <span style={{ fontWeight: 500 }}>₹{s.price}</span>
                    </div>
                  ))}
                </div>

                {/* KPI stats */}
                <div style={{ display: 'grid', gap: '0.8rem', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> Total Duration:</span>
                    <strong>{totalDuration} mins (~{(totalDuration / 60).toFixed(1)} hrs)</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>Standard Subtotal:</span>
                    <span>₹{subtotal}</span>
                  </div>

                  {discountRate > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Award size={14} /> Combo Discount ({discountRate * 100}%):
                      </span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                </div>

                {/* Final Price */}
                <div style={{
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: '1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline'
                }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>Estimated Package Price:</span>
                  <span style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--accent)' }}>
                    ₹{finalPrice}
                  </span>
                </div>

                {/* Extra Promo Notification */}
                {selectedServices.length === 1 && (
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--accent)',
                    backgroundColor: 'var(--accent-light)',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '6px',
                    textAlign: 'center'
                  }}>
                    ✨ Add 1 more service to unlock <strong>10% Package Discount</strong>!
                  </div>
                )}
                {selectedServices.length === 2 && (
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--accent)',
                    backgroundColor: 'var(--accent-light)',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '6px',
                    textAlign: 'center'
                  }}>
                    ✨ Add 1 more service to upgrade to <strong>15% Package Discount</strong>!
                  </div>
                )}

                {/* Action button */}
                <button onClick={handleBook} className="btn-gold" style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '1rem'
                }}>
                  <Calendar size={16} />
                  <span>Book Custom Package</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .builder-layout-grid {
            grid-template-columns: 1.3fr 1fr !important;
          }
        }
        .builder-service-item:hover {
          background-color: var(--accent-light) !important;
          border-color: rgba(212, 175, 55, 0.4) !important;
        }
      `}</style>
    </section>
  );
};

export default PackageBuilder;
