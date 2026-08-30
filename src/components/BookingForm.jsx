import React, { useState, useEffect } from 'react';
import { Calendar, User, Phone, CheckCircle, MessageSquare, Clock, Scissors } from 'lucide-react';
import { INITIAL_TEAM } from '../data/mockData';

const BookingForm = ({ services, selectedService, bookings, onAddBooking }) => {
  const today = new Date().toLocaleDateString('en-CA');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [stylist, setStylist] = useState('Any Available Stylist');
  const [date, setDate] = useState(today); // Pre-fill with today's date for instant availability checking
  const [time, setTime] = useState('10:00 AM');
  const [whatsappConfirm, setWhatsappConfirm] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

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

  // Filter approved bookings for selected date
  const activeBookingsForDate = (bookings || []).filter(
    b => b.date === date && b.status === "Approved"
  );

  // Helper to determine slot availability status (movie-seat style)
  const getSlotStatus = (slot) => {
    if (!date) return 'available';

    // Find bookings at this specific time
    const bookingsForTime = activeBookingsForDate.filter(b => b.time === slot);

    if (stylist === 'Any Available Stylist') {
      // Find which unique specific stylists have approved bookings at this time
      const bookedStylists = bookingsForTime
        .map(b => b.stylist)
        .filter(name => name && name !== 'Any Available Stylist');
      const uniqueBooked = new Set(bookedStylists);

      // If all 4 team members are booked, or if there is a general booking blocking the slot
      if (uniqueBooked.size >= INITIAL_TEAM.length || bookingsForTime.some(b => b.stylist === 'Any Available Stylist')) {
        return 'booked';
      }
      return 'available';
    } else {
      // Specific stylist selected
      const isStylistBooked = bookingsForTime.some(b => 
        b.stylist === stylist || b.stylist === 'Any Available Stylist'
      );
      return isStylistBooked ? 'booked' : 'available';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    if (!cleanName || !cleanPhone || !service || !date || !time || date < today || getSlotStatus(time) === 'booked') return;

    const newBooking = {
      id: `b_${Date.now()}`,
      name: cleanName,
      phone: cleanPhone,
      service,
      stylist,
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
    setStylist('Any Available Stylist');
    setDate('');
    setTime('10:00 AM');
  };

  const getWhatsAppLink = () => {
    if (!submittedData) return '';
    const text = `Hi AURA Luxury Salon! I have just booked an appointment:\n\n*Name:* ${submittedData.name}\n*Service:* ${submittedData.service}\n*Preferred Stylist:* ${submittedData.stylist}\n*Date:* ${submittedData.date}\n*Time:* ${submittedData.time}\n\nPlease confirm my slot. Thank you!`;
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
                <strong>Service / Package:</strong> {submittedData?.service}
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <strong>Stylist Assigned:</strong> {submittedData?.stylist}
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
                {/* Dynamically inject custom combination values from PackageBuilder if not present */}
                {service && !services.some(s => s.name === service) && 
                  !["Golden Jubilee Bridal Package", "Aura Premium Hair Spa Combo", "First-Visit Welcoming Invitation", "Vip Monthly Membership Club"].includes(service) && (
                    <option value={service}>{service}</option>
                )}
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
                  <option value="Golden Jubilee Bridal Package">Golden Jubilee Bridal Package (₹799)</option>
                  <option value="Aura Premium Hair Spa Combo">Aura Premium Hair Spa Combo (₹699)</option>
                  <option value="First-Visit Welcoming Invitation">First-Visit Welcoming Invitation (20% OFF)</option>
                  <option value="Vip Monthly Membership Club">Vip Monthly Membership Club (₹799)</option>
                </optgroup>
              </select>
            </div>

            {/* Select Preferred Stylist */}
            <div>
              <label htmlFor="booking-stylist" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 }}>
                Select Master Stylist / Dermal Artist
              </label>
              <div style={{ position: 'relative' }}>
                <Scissors size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <select
                  id="booking-stylist"
                  value={stylist}
                  onChange={(e) => setStylist(e.target.value)}
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
                  <option value="Any Available Stylist">Any Available Master Stylist</option>
                  {INITIAL_TEAM.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name} ({member.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date Picker (Full Width to make space for visual slots below) */}
            <div>
              <label htmlFor="booking-date" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 }}>
                Appointment Date
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

            {/* Select Appointment Slot (Movie Book Style Grid) */}
            <div style={{ marginTop: '0.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontWeight: 500 }}>
                Select Available Time Slot (Movie Booking Style)
              </label>
              
              {/* Legend */}
              <div style={{ display: 'flex', gap: '1.2rem', marginBottom: '1rem', fontSize: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}></div>
                  <span style={{ color: 'var(--text-secondary)' }}>Available</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'rgba(212, 175, 55, 0.15)', border: '1px solid var(--accent)' }}></div>
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Selected</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.5)', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '1px', backgroundColor: 'rgba(239, 68, 68, 0.5)', transform: 'rotate(45deg)' }}></div>
                  </div>
                  <span style={{ color: '#ef4444' }}>Booked (Unavailable)</span>
                </div>
              </div>

              {/* Time Slots Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(95px, 1fr))',
                gap: '0.6rem',
                marginBottom: '1rem'
              }}>
                {timeSlots.map((slot) => {
                  const isBooked = getSlotStatus(slot) === 'booked';
                  const isSelected = time === slot;
                  
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={isBooked}
                      onClick={() => setTime(slot)}
                      style={{
                        padding: '0.75rem 0.5rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        textAlign: 'center',
                        cursor: isBooked ? 'not-allowed' : 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundColor: isSelected 
                          ? 'rgba(212, 175, 55, 0.15)' 
                          : isBooked 
                            ? 'rgba(239, 68, 68, 0.05)' 
                            : 'var(--bg-secondary)',
                        border: isSelected 
                          ? '1px solid var(--accent)' 
                          : isBooked 
                            ? '1px solid rgba(239, 68, 68, 0.25)' 
                            : '1px solid var(--border-light)',
                        color: isSelected 
                          ? 'var(--accent)' 
                          : isBooked 
                            ? 'rgba(239, 68, 68, 0.5)' 
                            : 'var(--text-primary)',
                        textDecoration: isBooked ? 'line-through' : 'none'
                      }}
                      className={`slot-btn ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
                    >
                      {slot}
                      {isBooked && (
                        <span style={{ 
                          position: 'absolute', 
                          bottom: '2px', 
                          right: '2px', 
                          fontSize: '0.55rem', 
                          color: 'rgba(239, 68, 68, 0.7)',
                          fontWeight: 700
                        }}>
                          [Booked]
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Alert / Suggested Alternative slots */}
              {date && getSlotStatus(time) === 'booked' && (
                <div style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  padding: '0.9rem 1rem',
                  fontSize: '0.85rem',
                  color: '#ef4444',
                  marginBottom: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  animation: 'fadeIn 0.3s ease'
                }}>
                  <div style={{ fontWeight: 600 }}>
                    ⚠️ {time} is booked on {date} with {stylist}.
                  </div>
                  <div>
                    Try one of these available slots instead:
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                    {timeSlots.filter(s => getSlotStatus(s) !== 'booked').slice(0, 4).map(availSlot => (
                      <button
                        key={availSlot}
                        type="button"
                        onClick={() => setTime(availSlot)}
                        style={{
                          padding: '0.3rem 0.6rem',
                          backgroundColor: 'rgba(212, 175, 55, 0.1)',
                          border: '1px solid var(--accent)',
                          borderRadius: '4px',
                          color: 'var(--accent)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {availSlot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
              className={getSlotStatus(time) === 'booked' ? "btn-outline" : "btn-gold"}
              disabled={getSlotStatus(time) === 'booked'}
              style={{
                marginTop: '1rem',
                justifyContent: 'center',
                padding: '1rem',
                cursor: getSlotStatus(time) === 'booked' ? 'not-allowed' : 'pointer',
                opacity: getSlotStatus(time) === 'booked' ? 0.5 : 1
              }}
            >
              <Calendar size={18} />
              <span>{getSlotStatus(time) === 'booked' ? "Selected Slot Unavailable" : "Confirm Reservation Request"}</span>
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
        .slot-btn {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .slot-btn:not(:disabled):hover {
          transform: translateY(-2px);
          border-color: var(--accent) !important;
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.15);
        }
        .slot-btn.selected {
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.25);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
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
