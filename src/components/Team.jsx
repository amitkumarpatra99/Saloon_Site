import React from 'react';
import { Award, Briefcase } from 'lucide-react';
import { INITIAL_TEAM } from '../data/mockData';

const Team = () => {
  return (
    <section id="team" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-primary)', transition: 'var(--transition-smooth)' }}>
      <div className="container">
        {/* Title */}
        <div className="section-title-container">
          <span className="section-subtitle">Meet the Artisans</span>
          <h2 className="section-title">Our Expert Team</h2>
        </div>

        {/* Team Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {INITIAL_TEAM.map((member) => (
            <div
              key={member.id}
              className="glass-card"
              style={{
                padding: '1.5rem',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
              className="team-card glass-card"
            >
              {/* Photo Frame */}
              <div style={{
                position: 'relative',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--accent)',
                marginBottom: '1.5rem',
                boxShadow: 'var(--shadow)'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${member.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'var(--transition-smooth)'
                }} className="team-img" />
              </div>

              {/* Name */}
              <h3 style={{
                fontSize: '1.3rem',
                marginBottom: '0.25rem',
                color: 'var(--text-primary)'
              }}>
                {member.name}
              </h3>

              {/* Role Title */}
              <span style={{
                color: 'var(--accent)',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: 'block',
                marginBottom: '1rem'
              }}>
                {member.role}
              </span>

              {/* Details */}
              <div style={{
                width: '100%',
                borderTop: '1px solid var(--border-light)',
                paddingTop: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <Award size={14} className="text-gold" />
                  <span>Specialty: {member.specialization}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <Briefcase size={14} className="text-gold" />
                  <span>Experience: {member.experience}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .team-card:hover .team-img {
          transform: scale(1.1);
        }
        .team-card:hover {
          border-color: var(--accent) !important;
        }
      `}</style>
    </section>
  );
};

export default Team;
