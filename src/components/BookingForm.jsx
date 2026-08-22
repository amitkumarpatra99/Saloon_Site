import React, { useState, useEffect } from 'react';
import { Calendar, User, Phone, CheckCircle, MessageSquare, Clock } from 'lucide-react';

const BookingForm = ({ services, selectedService, onAddBooking }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00 AM');
  const [whatsappConfirm, setWhatsappConfirm] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const today = new Date().toLocaleDateString('en-CA');

  // Pre-select service if passed from catalog clicks
  useEffect(() => {
    if (selectedService) {
      setService(selectedService);
    }
  }, [selectedService]);

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", 
    "05:00 PM", "06:00 PM", "07:00 PM"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    if (!cleanName || !cleanPhone || !service || !date || !time || date < today) return;

    const newBooking = {
      id: `b_${Date.now()}`,
      name: cleanName,
      phone: cleanPhone,
      service,
      date,
      time,
      status: "Pending",
      whatsappConfirmed: whatsappConfirm,
      created: new Date().toISOString().split('T')[0]
    };

    onAddBooking(newBooking);
    setSubmittedData(newBooking);
    setIsSubmitted(true);

    // Reset Form
    setName('');
    setPhone('');
    setService('');
    setDate('');
    setTime('10:00 AM');
  };

  const getWhatsAppLink = () => {
    if (!submittedData) return '';
    const text = `Hi AURA Luxury Salon! I have just booked an appointment:\n\n*Name:* ${submittedData.name}\n*Service:* ${submittedData.service}\n*Date:* ${submittedData.date}\n*Time:* ${submittedData.time}\n\nPlease confirm my slot. Thank you!`;
    return `https://wa.me/15550199?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="booking" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-primary)', transition: 'var(--transition-smooth)' }}>
      <div className="container" style={{ maxWidth: '650px' }}>
        {/* Title */}
        <div className="section-title-container">
          <span className="section-subtitle">Reservations</span>
          <h2 className="section-title">Book An Appointment</h2>
        </div>

        {isSubmitted ? (
          <div className="glass-card animate-fade-in" style={{
            textAlign: 'center',
            padding: '3.5rem 2rem',
            border: '2px solid var(--accent)',
            background: 'linear-gradient(to bottom, rgba(212, 175, 55, 0.05), var(--bg-secondary))'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'var(--accent-light)',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              marginBottom: '1.5rem'
            }}>
              <CheckCircle size={36} />
            </div>

            <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Appointment Requested!
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Your appointment request is saved. We will contact you shortly to confirm availability.
            </p>

            {/* Booking Summary Card */}
            <div style={{
              backgroundColor: 'var(--bg-tertiary)',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              textAlign: 'left',
              marginBottom: '2.5rem',
              display: 'grid',
              gap: '0.8rem'
            }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <strong>Guest Name:</strong> {submittedData?.name}
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <strong>Service:</strong> {submittedData?.service}
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <strong>Date & Time:</strong> {submittedData?.date} • {submittedData?.time}
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <strong>Status:</strong> <span style={{ color: 'var(--warning)', fontWeight: 600 }}>{submittedData?.status}</span>
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {submittedData?.whatsappConfirmed && (
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{ justifyContent: 'center', backgroundColor: '#25d366', color: '#fff', boxShadow: 'none' }}
                >
                  <MessageSquare size={18} />
                  <span>Instant WhatsApp Confirmation</span>
                </a>
              )}

              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-outline"
                style={{ justifyContent: 'center' }}
              >
                Book Another Slot
              </button>
            </div>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="glass-card animate-fade-in"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              padding: '3rem 2.5rem',
              border: '1px solid var(--border)'
            }}
          >
            {/* Guest Name */}
            <div>
              <label htmlFor="booking-name" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  id="booking-name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter guest full name"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem 0.85rem 2.5rem',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '8px',
                    transition: 'var(--transition-fast)'
                  }}
                  className="booking-input"
                />
              </div>
            </div>

            {/* Guest Phone */}
            <div>
              <label htmlFor="booking-phone" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 }}>
                Phone Number
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="tel"
                  id="booking-phone"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  pattern="[0-9+() -]{7,20}"
                  title="Enter a valid phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter mobile number"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem 0.85rem 2.5rem',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '8px',
                    transition: 'var(--transition-fast)'
                  }}
                  className="booking-input"
                />
              </div>
            </div>

            {/* Select Service */}
            <div>
              <label htmlFor="booking-service" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 }}>
                Select Service / Package
              </label>
              <select
                required
                id="booking-service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                className="booking-input select-input"
              >
                <option value="">Choose a treatment...</option>
                {/* Dynamically grouped options by categories */}
                {Array.from(new Set(services.map(s => s.category))).map(category => (
                  <optgroup key={category} label={category} style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                    {services.filter(s => s.category === category).map(s => (
                      <option key={s.id} value={s.name}>
                        {s.name} (₹{s.price})
                      </option>
                    ))}
                  </optgroup>
                ))}
                {/* Manual Combos/Offers */}
                <optgroup label="Special Offers & Combo Packages" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                  <option value="Golden Jubilee Bridal Package">Golden Jubilee Bridal Package (₹19,999)</option>
                  <option value="Aura Premium Hair Spa Combo">Aura Premium Hair Spa Combo (₹9,999)</option>
                  <option value="First-Visit Welcoming Invitation">First-Visit Welcoming Invitation (20% OFF)</option>
                </optgroup>
              </select>
            </div>

            {/* Date and Time Group */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="date-time-row">
              {/* Date */}
              <div>
                <label htmlFor="booking-date" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Date
                </label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="date"
                    id="booking-date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={today}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem 0.85rem 2.5rem',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '8px'
                    }}
                    className="booking-input"
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label htmlFor="booking-time" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Preferred Time
                </label>
                <div style={{ position: 'relative' }}>
                  <Clock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <select
                    required
                    id="booking-time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem 0.85rem 2.5rem',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                    className="booking-input select-input"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* WhatsApp confirmation checkbox toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input
                type="checkbox"
                id="whatsapp-confirm"
                checked={whatsappConfirm}
                onChange={(e) => setWhatsappConfirm(e.target.checked)}
                style={{
                  cursor: 'pointer',
                  width: '18px',
                  height: '18px',
                  accentColor: 'var(--accent)'
                }}
              />
              <label htmlFor="whatsapp-confirm" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer', userSelect: 'none' }}>
                Receive instant reservation confirmation copy via WhatsApp
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-gold"
              style={{
                marginTop: '1rem',
                justifyContent: 'center',
                padding: '1rem'
              }}
            >
              <Calendar size={18} />
              <span>Confirm Reservation Request</span>
            </button>
          </form>
        )}
      </div>

      <style>{`
        .booking-input:focus {
          border-color: var(--accent) !important;
          box-shadow: 0 0 5px rgba(212, 175, 55, 0.2);
        }
        .select-input option {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
        }
        @media (max-width: 480px) {
          .date-time-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BookingForm;
