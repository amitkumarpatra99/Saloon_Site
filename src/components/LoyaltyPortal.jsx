import React, { useState, useMemo } from 'react';
import { ShieldCheck, Search, Award, Gift, Sparkles, CheckCircle2 } from 'lucide-react';

const LoyaltyPortal = ({ bookings }) => {
  const [searchName, setSearchName] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [searchedProfile, setSearchedProfile] = useState(null);

  // Define some mock VIP codes or look up in actual bookings
  const handleLookup = (e) => {
    e.preventDefault();
    const query = searchName.trim().toLowerCase();
    if (!query) return;

    // Secret VIP bypass
    if (query === 'vip-777' || query === 'vip') {
      setSearchedProfile({
        name: "Royal Elite VIP Guest",
        tier: "Royal Elite",
        visitsCount: 15,
        discount: 20,
        memberId: "AURA-VIP-777",
        perks: [
          "Flat 20% discount on all treatments & spas",
          "Free luxury beverage service on every visit",
          "Complimentary hot stone add-on to any service",
          "Immediate priority line scheduling access",
          "Invite-only entry to seasonal styling masterclasses"
        ]
      });
      setSearchTriggered(true);
      return;
    }

    // Count bookings matching the name
    const matchCount = bookings.filter(b => b.name.toLowerCase().includes(query)).length;

    let tier = "Bronze";
    let discount = 5;
    let perks = [
      "Flat 5% discount on all standalone services",
      "Complimentary organic scalp massage with hair sessions",
      "Access to standard digital reservation log"
    ];

    if (matchCount >= 3) {
      tier = "Platinum";
      discount = 15;
      perks = [
        "Flat 15% discount on all catalog services",
        "Complimentary Dermal Skin hydration wash",
        "Priority scheduling slot overrides",
        "Free styling consult with Elena Rostova"
      ];
    } else if (matchCount >= 1) {
      tier = "Gold";
      discount = 10;
      perks = [
        "Flat 10% discount on all services & treatments",
        "Complimentary honey wax touchup session",
        "Free artisan herbal tea selection",
        "1 priority reschedule allowance per month"
      ];
    }

    // Generate member details
    const capitalizedName = searchName
      .trim()
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    setSearchedProfile({
      name: capitalizedName || "Aura Valued Client",
      tier: tier,
      visitsCount: matchCount,
      discount: discount,
      memberId: `AURA-${Math.floor(100000 + Math.random() * 900000)}`,
      perks: perks
    });

    setSearchTriggered(true);
  };

  return (
    <section id="loyalty" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-primary)', transition: 'var(--transition-smooth)' }}>
      <div className="container">
        {/* Header */}
        <div className="section-title-container">
          <span className="section-subtitle">Privilege Club</span>
          <h2 className="section-title">AURA Membership Circle</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'start'
        }} className="loyalty-grid">
          
          {/* Information & Checker Form */}
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1.25rem' }}>Indulge in Elite Rewards</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem', marginBottom: '1rem' }}>
                Join the AURA Privilege Circle to turn each visit into reward points. All guests are automatically enrolled upon their first approved booking. Enter your name below to retrieve your digital card.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                💡 Tip: Try entering "Samantha Wright" or "Emily Watson" to check their mock tiers, or type "VIP-777" for our special Elite membership demo.
              </p>
            </div>

            <form onSubmit={handleLookup} style={{
              display: 'flex',
              gap: '0.5rem',
              backgroundColor: 'var(--bg-secondary)',
              padding: '0.5rem',
              borderRadius: '50px',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '1rem', flex: 1 }}>
                <Search size={18} style={{ color: 'var(--accent)' }} />
                <input
                  type="text"
                  required
                  placeholder="Enter your guest name or membership code..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: '0.9rem',
                    color: 'var(--text-primary)',
                    padding: '0.5rem 0'
                  }}
                />
              </div>
              
              <button type="submit" className="btn-gold" style={{
                borderRadius: '50px',
                padding: '0.6rem 1.5rem',
                fontSize: '0.85rem',
                whiteSpace: 'nowrap'
              }}>
                Retrieve Card
              </button>
            </form>

            {/* Standard Tier Tiers Info */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.2rem',
              marginTop: '1rem'
            }}>
              {[
                { name: "Bronze Circle", visits: "0 Visits", discount: "5% Off", color: "#cd7f32" },
                { name: "Gold Circle", visits: "1-2 Visits", discount: "10% Off", color: "var(--accent)" },
                { name: "Platinum Circle", visits: "3+ Visits", discount: "15% Off", color: "#e5e4e2" }
              ].map(tier => (
                <div key={tier.name} style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '10px',
                  padding: '1.2rem',
                  textAlign: 'center'
                }}>
                  <Award size={24} style={{ color: tier.color, marginBottom: '0.5rem' }} />
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{tier.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.25rem' }}>{tier.visits}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent)', marginTop: '0.5rem', display: 'block' }}>{tier.discount} Perk</span>
                </div>
              ))}
            </div>
          </div>

          {/* Glassmorphic Digital Loyalty Card Render */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {searchTriggered && searchedProfile ? (
              <div style={{ width: '100%', maxWidth: '420px' }} className="animate-fade-in">
                {/* 3D Glass Card wrapper */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1.58 / 1',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(212,175,55,0.03) 50%, rgba(0,0,0,0.5) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  borderRadius: '16px',
                  padding: '1.5rem 1.8rem',
                  color: '#fff',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  margin: '0 auto 2rem auto',
                  transition: 'var(--transition-smooth)'
                }} className="digital-privilege-card">
                  {/* Floating Gold Halo Effect */}
                  <div style={{
                    position: 'absolute',
                    top: '-40%',
                    right: '-30%',
                    width: '60%',
                    height: '100%',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(0,0,0,0) 70%)',
                    zIndex: 0,
                    pointerEvents: 'none'
                  }} />

                  {/* Header Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1 }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent)' }}>AURA</span>
                      <span style={{ display: 'block', fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Privilege Circle</span>
                    </div>
                    
                    <span style={{
                      backgroundColor: 'rgba(212,175,55,0.15)',
                      color: 'var(--accent)',
                      border: '1px solid rgba(212,175,55,0.4)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '50px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em'
                    }}>
                      {searchedProfile.tier} Tier
                    </span>
                  </div>

                  {/* Middle Row (Member name/ID) */}
                  <div style={{ zIndex: 1, margin: '1rem 0' }}>
                    <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}>Cardholder</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.03em', fontFamily: 'var(--font-sans)', marginTop: '2px' }}>{searchedProfile.name}</h3>
                  </div>

                  {/* Bottom Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 1 }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}>Member ID</span>
                      <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', fontWeight: 600, letterSpacing: '0.05em' }}>{searchedProfile.memberId}</span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}>Active Perks</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent)' }}>{searchedProfile.discount}% Off</span>
                    </div>
                  </div>
                </div>

                {/* Perk List */}
                <div className="glass-card" style={{ padding: '2rem 1.75rem', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Gift size={16} className="text-gold" />
                    <span>Unlocked Privileges ({searchedProfile.tier} Tier)</span>
                  </h4>

                  <ul style={{ display: 'grid', gap: '0.75rem', listStyle: 'none', padding: 0 }}>
                    {searchedProfile.perks.map((perk, i) => (
                      <li key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                        <CheckCircle2 size={15} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.15rem' }} />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {searchedProfile.tier !== 'Royal Elite' && (
                    <div style={{
                      marginTop: '1.5rem',
                      paddingTop: '1.25rem',
                      borderTop: '1px solid var(--border-light)',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      textAlign: 'center'
                    }}>
                      ⭐ Visited <strong>{searchedProfile.visitsCount}</strong> times. Book more treatments to upgrade tiers.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div style={{
                width: '100%',
                maxWidth: '400px',
                height: '250px',
                border: '2px dashed var(--border)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                textAlign: 'center',
                padding: '2rem'
              }}>
                <ShieldCheck size={40} style={{ color: 'var(--border)', marginBottom: '1rem' }} />
                <p style={{ fontSize: '0.9rem' }}>
                  Retrieve card to render your digital glass membership token here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .loyalty-grid {
            grid-template-columns: 1.2fr 1fr !important;
          }
        }
        .digital-privilege-card:hover {
          transform: translateY(-5px) scale(1.02) rotateX(2deg) rotateY(-2deg);
          box-shadow: 0 25px 60px rgba(212, 175, 55, 0.15);
        }
      `}</style>
    </section>
  );
};

export default LoyaltyPortal;
