import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquare, CheckCircle, Plus } from 'lucide-react';

const Reviews = ({ reviews, onAddReview }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showWriteForm, setShowWriteForm] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newReview = {
      id: `r_${Date.now()}`,
      name,
      rating,
      text,
      date: new Date().toISOString().split('T')[0],
      verified: true
    };

    onAddReview(newReview);
    setFormSubmitted(true);
    setName('');
    setText('');
    setRating(5);
    
    setTimeout(() => {
      setFormSubmitted(false);
      setShowWriteForm(false);
    }, 2000);
  };

  const activeReview = reviews[activeIndex];

  return (
    <section id="reviews" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-secondary)', transition: 'var(--transition-smooth)' }}>
      <div className="container">
        {/* Title */}
        <div className="section-title-container">
          <span className="section-subtitle">Client Testimonials</span>
          <h2 className="section-title">What Our Guests Say</h2>
        </div>

        {/* Global Google Rating Stats */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '4rem',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={22} fill="var(--accent)" color="var(--accent)" />
            ))}
          </div>
          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
            4.9 out of 5 Stars
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Based on 180+ verified reviews on Google Maps & Salon Systems
          </p>
        </div>

        {/* Review Testimonial Slider */}
        {activeReview && !showAllReviews && !showWriteForm && (
          <div style={{
            position: 'relative',
            maxWidth: '700px',
            margin: '0 auto 3rem auto',
            minHeight: '260px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            {/* Quote Icon */}
            <div style={{
              fontSize: '4rem',
              fontFamily: 'var(--font-serif)',
              color: 'var(--accent)',
              opacity: 0.15,
              height: '30px',
              lineHeight: 1,
              marginBottom: '1rem'
            }}>
              “
            </div>

            {/* Review Stars */}
            <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < activeReview.rating ? 'var(--accent)' : 'none'}
                  color={i < activeReview.rating ? 'var(--accent)' : 'var(--text-muted)'}
                />
              ))}
            </div>

            {/* Review Text */}
            <p style={{
              fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              lineHeight: 1.7,
              marginBottom: '2rem',
              padding: '0 1rem'
            }}>
              {activeReview.text}
            </p>

            {/* Author */}
            <div>
              <span style={{ fontWeight: 600, color: 'var(--accent)', display: 'block', fontSize: '1.05rem' }}>
                {activeReview.name}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.25rem' }}>
                <CheckCircle size={10} style={{ color: 'var(--success)' }} /> Verified Guest • {activeReview.date}
              </span>
            </div>

            {/* Slider Navigation Buttons */}
            <button
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: '-10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-tertiary)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border-light)',
                zIndex: 2
              }}
              className="carousel-btn"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: '-10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-tertiary)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border-light)',
                zIndex: 2
              }}
              className="carousel-btn"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* See All Reviews Section */}
        {showAllReviews && (
          <div style={{ maxWidth: '800px', margin: '0 auto 3rem auto' }} className="animate-fade-in">
            <button
              onClick={() => setShowAllReviews(false)}
              style={{
                color: 'var(--accent)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
                marginBottom: '2rem',
                display: 'block'
              }}
            >
              ← Back to Carousel
            </button>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {reviews.map((rev) => (
                <div key={rev.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, color: 'var(--accent)' }}>{rev.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.2rem' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        fill={i < rev.rating ? 'var(--accent)' : 'none'}
                        color={i < rev.rating ? 'var(--accent)' : 'var(--text-muted)'}
                      />
                    ))}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{rev.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Write a Review Form Drawer */}
        {showWriteForm && (
          <div style={{ maxWidth: '500px', margin: '0 auto 3rem auto' }} className="animate-fade-in">
            <button
              onClick={() => setShowWriteForm(false)}
              style={{
                color: 'var(--accent)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
                marginBottom: '2rem',
                display: 'block'
              }}
            >
              ← Back to Carousel
            </button>

            {formSubmitted ? (
              <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                <CheckCircle size={44} style={{ color: 'var(--success)', marginBottom: '1rem' }} />
                <h4 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Thank You!</h4>
                <p style={{ color: 'var(--text-secondary)' }}>Your review has been successfully submitted and is now live.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Write a Review</h3>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '8px'
                    }}
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Rating</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        style={{ cursor: 'pointer' }}
                      >
                        <Star
                          size={24}
                          fill={star <= rating ? 'var(--accent)' : 'none'}
                          color={star <= rating ? 'var(--accent)' : 'var(--text-muted)'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Review Details</label>
                  <textarea
                    required
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '8px',
                      resize: 'none'
                    }}
                    placeholder="Share your experience..."
                  />
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>Submit Review</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Global Review Action Controls */}
        {!showAllReviews && !showWriteForm && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginTop: '2rem'
          }}>
            <button
              onClick={() => setShowAllReviews(true)}
              className="btn-outline"
              style={{ fontSize: '0.85rem' }}
            >
              <MessageSquare size={16} />
              <span>See All Reviews</span>
            </button>

            <button
              onClick={() => setShowWriteForm(true)}
              className="btn-gold"
              style={{ fontSize: '0.85rem' }}
            >
              <Plus size={16} />
              <span>Write a Review</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .carousel-btn:hover {
          background-color: var(--accent) !important;
          color: #000000 !important;
          border-color: transparent !important;
        }
      `}</style>
    </section>
  );
};

export default Reviews;
