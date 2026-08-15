import React from 'react';
import { Award, ShieldCheck, Sparkles, Users } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <Sparkles size={28} className="text-gold" />,
      title: "Elite Organic Products",
      desc: "We exclusively source premium, cruelty-free international brands to ensure optimal hair health and skin glow."
    },
    {
      icon: <Award size={28} className="text-gold" />,
      title: "Artisanal Expertise",
      desc: "Every beautician and stylist at AURA undergoes continuous training in modern Parisian and Milanese fashion schools."
    },
    {
      icon: <ShieldCheck size={28} className="text-gold" />,
      title: "Medical-Grade Hygiene",
      desc: "Your safety is non-negotiable. We sanitize tools, linens, and styling stations under rigid clinical grade protocols."
    },
    {
      icon: <Users size={28} className="text-gold" />,
      title: "Bespoke Consultations",
      desc: "We don't believe in templates. We assess facial structure, hair texture, and skin tone to craft a tailored signature look."
    }
  ];

  return (
    <section id="about" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-secondary)', transition: 'var(--transition-smooth)' }}>
      <div className="container">
        {/* Header */}
        <div className="section-title-container">
          <span className="section-subtitle">Our Heritage</span>
          <h2 className="section-title">The Legend of AURA</h2>
        </div>

        {/* Narrative & Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '5rem'
        }} className="about-grid">
          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Defining Luxury Grooming & Aesthetics Since 2014
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Established in the heart of the design district, AURA was born from a simple vision: to elevate everyday salon services into sublime, rejuvenating rituals. Over the past decade, we have grown from a boutique barber shop into an award-winning full-service grooming sanctuary.
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
              We treat hair and skin not merely as canvases, but as extensions of your unique personality. Our stylists merge classic sculpting principles with avant-garde trends, providing a look that remains effortless to maintain long after you leave our chairs.
            </p>
            
            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem',
              borderTop: '1px solid var(--border)',
              paddingTop: '2rem'
            }}>
              <div>
                <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-serif)', display: 'block' }}>12+</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Years Crafting Styles</span>
              </div>
              <div>
                <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-serif)', display: 'block' }}>25k+</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Satisfied Clients</span>
              </div>
              <div>
                <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-serif)', display: 'block' }}>4.9★</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Google Rating</span>
              </div>
            </div>
          </div>

          {/* Luxury Video/Image Frame */}
          <div style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-lg)',
            height: '400px'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `linear-gradient(to top, rgba(10,10,10,0.6) 0%, rgba(0,0,0,0) 50%), url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&fit=crop')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'var(--transition-smooth)'
            }} className="about-img" />
          </div>
        </div>

        {/* Value Proposition Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem'
        }}>
          {highlights.map((item, idx) => (
            <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {item.icon}
              </div>
              <h4 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{item.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 1.2fr 1fr !important;
          }
        }
        .about-img:hover {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};

export default About;
