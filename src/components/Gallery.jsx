import React, { useState } from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';
import { Eye } from 'lucide-react';

const Gallery = () => {
  const [filter, setFilter] = useState('all');

  const galleryItems = [
    {
      id: 1,
      category: 'interior',
      url: '/images/hero.jpg',
      title: 'AURA Styling Hall'
    },
    {
      id: 2,
      category: 'makeup',
      url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&fit=crop',
      title: 'Bridal HD Makeup'
    },
    {
      id: 3,
      category: 'hair',
      url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&fit=crop',
      title: 'Precision Blonde Balayage'
    },
    {
      id: 4,
      category: 'interior',
      url: 'https://images.unsplash.com/photo-1527799822367-a0db2888f3f8?w=600&fit=crop',
      title: 'VIP Consultation Parlour'
    },
    {
      id: 5,
      category: 'makeup',
      url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&fit=crop',
      title: 'Cosmetic Artistry Room'
    },
    {
      id: 6,
      category: 'hair',
      url: 'https://images.unsplash.com/photo-1605497746444-ac9da58d440f?w=600&fit=crop',
      title: 'Classic Razor Shave'
    }
  ];

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <section id="gallery" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-primary)', transition: 'var(--transition-smooth)' }}>
      <div className="container">
        {/* Title */}
        <div className="section-title-container">
          <span className="section-subtitle">Visual Experience</span>
          <h2 className="section-title">AURA Lookbook & Gallery</h2>
        </div>

        {/* Gallery Filter Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.8rem',
          flexWrap: 'wrap',
          marginBottom: '3.5rem'
        }}>
          {[
            { label: 'Show All', value: 'all' },
            { label: 'Before & After', value: 'before-after' },
            { label: 'Hair Transformations', value: 'hair' },
            { label: 'Bridal & Makeup', value: 'makeup' },
            { label: 'Salon Interior', value: 'interior' }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              style={{
                cursor: 'pointer',
                padding: '0.6rem 1.25rem',
                borderRadius: '30px',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'var(--transition-smooth)',
                backgroundColor: filter === tab.value ? 'var(--accent)' : 'var(--bg-secondary)',
                color: filter === tab.value ? '#000000' : 'var(--text-primary)',
                border: `1px solid ${filter === tab.value ? 'transparent' : 'var(--border-light)'}`
              }}
              className="gallery-tab-btn"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Before / After Slider Focus Block */}
        {(filter === 'all' || filter === 'before-after') && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'center',
            marginBottom: filter === 'all' ? '4rem' : '0',
            backgroundColor: 'var(--bg-secondary)',
            padding: '3rem 2rem',
            borderRadius: '12px',
            border: '1px solid var(--border)'
          }} className="before-after-focus">
            <div style={{ maxWidth: '450px' }}>
              <span style={{ color: 'var(--accent)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.2em', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                Featured Transformation
              </span>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>Frizz-Free Silk Keratin Infusion</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                Drag the center slider control left and right to inspect the dramatic shine restoration and frizz alignment achieved in our 90-minute Royal Keratin Smooth session.
              </p>
              <ul style={{ color: 'var(--text-secondary)', listStyleType: 'square', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Restore keratin matrix structures</li>
                <li>Humidity shielding for up to 16 weeks</li>
                <li>Enhanced shine light reflectivity</li>
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <BeforeAfterSlider
                beforeImage="/images/hair_before.jpg"
                afterImage="/images/hair_after.jpg"
                beforeLabel="Dehydrated Frizz"
                afterLabel="Keratin Silked"
              />
            </div>
          </div>
        )}

        {/* Grid Images */}
        {filter !== 'before-after' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem'
          }} className="animate-fade-in">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  height: '300px',
                  border: '1px solid var(--border-light)'
                }}
                className="gallery-item-container"
              >
                {/* Image */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${item.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'var(--transition-smooth)'
                }} className="gallery-item-img" />

                {/* Glass Hover Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to top, rgba(10, 10, 10, 0.95), rgba(0, 0, 0, 0.4))',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '2rem',
                  opacity: 0,
                  transition: 'var(--transition-smooth)'
                }} className="gallery-item-overlay">
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    marginBottom: '1rem'
                  }}>
                    <Eye size={16} />
                  </div>
                  <h4 style={{ color: '#fff', fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>{item.title}</h4>
                  <span style={{ color: 'var(--accent)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem' }}>
                    {item.category === 'hair' ? 'Hair Design' : item.category === 'makeup' ? 'Cosmetics' : 'Interior'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 992px) {
          .before-after-focus {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        .gallery-tab-btn:hover {
          background-color: var(--accent);
          color: #000000;
          border-color: transparent;
        }
        .gallery-item-container:hover .gallery-item-img {
          transform: scale(1.08);
        }
        .gallery-item-container:hover .gallery-item-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
