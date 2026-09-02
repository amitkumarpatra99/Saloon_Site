import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, User, Phone, CheckCircle, MessageSquare, Clock, Scissors, Loader2, AlertCircle } from 'lucide-react';
import { INITIAL_TEAM } from '../data/mockData';

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", 
  "05:00 PM", "06:00 PM", "07:00 PM"
];

const BookingForm = ({ services, selectedService, bookings, onAddBooking }) => {
  const today = new Date().toLocaleDateString('en-CA');
  
  // Consolidated form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    stylist: 'Any Available Stylist',
    date: today,
    time: '10:00 AM',
    whatsappConfirm: true
  });

  const [uiState, setUiState] = useState({
    isSubmitting: false,
    isSubmitted: false,
    submittedData: null
  });

  // Sync external prop changes
  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Memoized booking filters for performance
  const activeBookingsForDate = useMemo(() => 
    (bookings || []).filter(b => b.date === formData.date && b.status === "Approved"),
  [bookings, formData.date]);

  // Memoized availability checker
  const getSlotStatus = (slot) => {
    if (!formData.date) return 'available';

    const bookingsForTime = activeBookingsForDate.filter(b => b.time === slot);

    if (formData.stylist === 'Any Available Stylist') {
      const bookedStylists = bookingsForTime
        .map(b => b.stylist)
        .filter(name => name && name !== 'Any Available Stylist');
      
      const uniqueBooked = new Set(bookedStylists);

      if (uniqueBooked.size >= INITIAL_TEAM.length || bookingsForTime.some(b => b.stylist === 'Any Available Stylist')) {
        return 'booked';
      }
      return 'available';
    } 

    const isStylistBooked = bookingsForTime.some(b => 
      b.stylist === formData.stylist || b.stylist === 'Any Available Stylist'
    );
    return isStylistBooked ? 'booked' : 'available';
  };

  const isCurrentSlotBooked = getSlotStatus(formData.time) === 'booked';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanName = formData.name.trim();
    const cleanPhone = formData.phone.trim();
    
    if (!cleanName || !cleanPhone || !formData.service || !formData.date || !formData.time || formData.date < today || isCurrentSlotBooked) return;

    setUiState(prev => ({ ...prev, isSubmitting: true }));

    const newBooking = {
      id: `b_${Date.now()}`,
      ...formData,
      name: cleanName,
      phone: cleanPhone,
      status: "Pending",
      created: new Date().toISOString().split('T')[0]
    };

    // Simulate network delay for premium feel
    await new Promise(resolve => setTimeout(resolve, 600));

    onAddBooking(newBooking);
    
    setUiState({
      isSubmitting: false,
      isSubmitted: true,
      submittedData: newBooking
    });

    // Reset Form to defaults
    setFormData({
      name: '', phone: '', service: '',
      stylist: 'Any Available Stylist',
      date: today, time: '10:00 AM', whatsappConfirm: true
    });
  };

  const getWhatsAppLink = () => {
    if (!uiState.submittedData) return '';
    const { name, service, stylist, date, time } = uiState.submittedData;
    const text = `Hi AURA Luxury Salon! I have just booked an appointment:\n\n*Name:* ${name}\n*Service:* ${service}\n*Preferred Stylist:* ${stylist}\n*Date:* ${date}\n*Time:* ${time}\n\nPlease confirm my slot. Thank you!`;
    return `https://wa.me/15550199?text=${encodeURIComponent(text)}`;
  };

  // --- Render Helpers ---

  const renderSuccessScreen = () => (
    <div className="glass-card animate-fade-in" style={styles.successCard}>
      <div style={styles.successIconWrapper}>
        <CheckCircle size={36} />
      </div>
      <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
        Appointment Requested!
      </h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Your appointment request is saved. We will contact you shortly to confirm availability.
      </p>

      <div style={styles.summaryCard}>
        <SummaryRow label="Guest Name" value={uiState.submittedData?.name} />
        <SummaryRow label="Service / Package" value={uiState.submittedData?.service} />
        <SummaryRow label="Stylist Assigned" value={uiState.submittedData?.stylist} />
        <SummaryRow label="Date & Time" value={`${uiState.submittedData?.date} • ${uiState.submittedData?.time}`} />
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <strong>Status:</strong> <span style={{ color: 'var(--warning)', fontWeight: 600 }}>{uiState.submittedData?.status}</span>
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {uiState.submittedData?.whatsappConfirm && (
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-gold" style={styles.waButton}>
            <MessageSquare size={18} />
            <span>Instant WhatsApp Confirmation</span>
          </a>
        )}
        <button 
          onClick={() => setUiState(prev => ({ ...prev, isSubmitted: false }))} 
          className="btn-outline" 
          style={{ justifyContent: 'center' }}
        >
          Book Another Slot
        </button>
      </div>
    </div>
  );

  return (
    <section id="booking" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-primary)', transition: 'var(--transition-smooth)' }}>
      <div className="container" style={{ maxWidth: '650px' }}>
        <div className="section-title-container">
          <span className="section-subtitle">Reservations</span>
          <h2 className="section-title">Book An Appointment</h2>
        </div>

        {uiState.isSubmitted ? renderSuccessScreen() : (
          <form onSubmit={handleSubmit} className="glass-card animate-fade-in" style={styles.formContainer}>
            
            <InputField 
              icon={<User size={16} />} 
              label="Full Name" 
              id="name" 
              type="text" 
              value={formData.name} 
              onChange={(e) => updateForm('name', e.target.value)} 
              placeholder="Enter guest full name" 
            />

            <InputField 
              icon={<Phone size={16} />} 
              label="Phone Number" 
              id="phone" 
              type="tel" 
              pattern="[0-9+() -]{7,20}"
              value={formData.phone} 
              onChange={(e) => updateForm('phone', e.target.value)} 
              placeholder="Enter mobile number" 
            />

            <div style={styles.inputGroup}>
              <label htmlFor="service" style={styles.label}>Select Service / Package</label>
              <select required id="service" value={formData.service} onChange={(e) => updateForm('service', e.target.value)} className="booking-input select-input" style={styles.input}>
                <option value="">Choose a treatment...</option>
                {formData.service && !services.some(s => s.name === formData.service) && 
                  !["Golden Jubilee Bridal Package", "Aura Premium Hair Spa Combo", "First-Visit Welcoming Invitation", "Vip Monthly Membership Club"].includes(formData.service) && (
                    <option value={formData.service}>{formData.service}</option>
                )}
                {Array.from(new Set(services.map(s => s.category))).map(category => (
                  <optgroup key={category} label={category} style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    {services.filter(s => s.category === category).map(s => (
                      <option key={s.id} value={s.name}>{s.name} (₹{s.price})</option>
                    ))}
                  </optgroup>
                ))}
                <optgroup label="Special Offers & Combo Packages" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <option value="Golden Jubilee Bridal Package">Golden Jubilee Bridal Package (₹799)</option>
                  <option value="Aura Premium Hair Spa Combo">Aura Premium Hair Spa Combo (₹699)</option>
                  <option value="First-Visit Welcoming Invitation">First-Visit Welcoming Invitation (20% OFF)</option>
                  <option value="Vip Monthly Membership Club">Vip Monthly Membership Club (₹799)</option>
                </optgroup>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="stylist" style={styles.label}>Select Master Stylist / Dermal Artist</label>
              <div style={styles.inputWrapper}>
                <Scissors size={16} style={styles.inputIcon} />
                <select id="stylist" value={formData.stylist} onChange={(e) => updateForm('stylist', e.target.value)} className="booking-input select-input" style={{...styles.input, paddingLeft: '2.5rem'}}>
                  <option value="Any Available Stylist">Any Available Master Stylist</option>
                  {INITIAL_TEAM.map((member) => (
                    <option key={member.id} value={member.name}>{member.name} ({member.role})</option>
                  ))}
                </select>
              </div>
            </div>

            <InputField 
              icon={<Calendar size={16} />} 
              label="Appointment Date" 
              id="date" 
              type="date" 
              min={today}
              value={formData.date} 
              onChange={(e) => updateForm('date', e.target.value)} 
            />

            <div style={{ marginTop: '0.5rem' }}>
              <label style={styles.label}>Select Available Time Slot</label>
              
              <div style={styles.legendContainer}>
                <LegendItem color="var(--bg-secondary)" border="var(--border-light)" text="Available" />
                <LegendItem color="rgba(212, 175, 55, 0.15)" border="var(--accent)" text="Selected" textColor="var(--accent)" bold />
                <LegendItem color="rgba(239, 68, 68, 0.1)" border="rgba(239, 68, 68, 0.5)" text="Booked" textColor="#ef4444" crossed />
              </div>

              <div style={styles.slotGrid}>
                {timeSlots.map((slot) => {
                  const isBooked = getSlotStatus(slot) === 'booked';
                  const isSelected = formData.time === slot;
                  
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={isBooked}
                      onClick={() => updateForm('time', slot)}
                      className={`slot-btn ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
                      style={{
                        ...styles.slotButton,
                        backgroundColor: isSelected ? 'rgba(212, 175, 55, 0.15)' : isBooked ? 'rgba(239, 68, 68, 0.05)' : 'var(--bg-secondary)',
                        border: `1px solid ${isSelected ? 'var(--accent)' : isBooked ? 'rgba(239, 68, 68, 0.25)' : 'var(--border-light)'}`,
                        color: isSelected ? 'var(--accent)' : isBooked ? 'rgba(239, 68, 68, 0.5)' : 'var(--text-primary)',
                        textDecoration: isBooked ? 'line-through' : 'none'
                      }}
                    >
                      {slot}
                      {isBooked && <span style={styles.bookedLabel}>[Booked]</span>}
                    </button>
                  );
                })}
              </div>

              {formData.date && isCurrentSlotBooked && (
                <div style={styles.alertBox}>
                  <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertCircle size={16} /> {formData.time} is booked on {formData.date} with {formData.stylist}.
                  </div>
                  <div>Try one of these available slots instead:</div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                    {timeSlots.filter(s => getSlotStatus(s) !== 'booked').slice(0, 4).map(availSlot => (
                      <button key={availSlot} type="button" onClick={() => updateForm('time', availSlot)} style={styles.suggestedSlot}>
                        {availSlot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input
                type="checkbox"
                id="whatsapp-confirm"
                checked={formData.whatsappConfirm}
                onChange={(e) => updateForm('whatsappConfirm', e.target.checked)}
                style={{ cursor: 'pointer', width: '18px', height: '18px', accentColor: 'var(--accent)' }}
              />
              <label htmlFor="whatsapp-confirm" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer', userSelect: 'none' }}>
                Receive instant reservation confirmation copy via WhatsApp
              </label>
            </div>

            <button
              type="submit"
              className={isCurrentSlotBooked ? "btn-outline" : "btn-gold"}
              disabled={isCurrentSlotBooked || uiState.isSubmitting}
              style={{
                marginTop: '1rem',
                justifyContent: 'center',
                padding: '1rem',
                cursor: isCurrentSlotBooked || uiState.isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isCurrentSlotBooked || uiState.isSubmitting ? 0.7 : 1
              }}
            >
              {uiState.isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Calendar size={18} />}
              <span>{isCurrentSlotBooked ? "Selected Slot Unavailable" : uiState.isSubmitting ? "Processing..." : "Confirm Reservation Request"}</span>
            </button>
          </form>
        )}
      </div>

      <style>{`
        .booking-input:focus { border-color: var(--accent) !important; box-shadow: 0 0 5px rgba(212, 175, 55, 0.2); }
        .select-input option { background-color: var(--bg-secondary); color: var(--text-primary); }
        .slot-btn { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important; }
        .slot-btn:not(:disabled):hover { transform: translateY(-2px); border-color: var(--accent) !important; box-shadow: 0 4px 12px rgba(212, 175, 55, 0.15); }
        .slot-btn.selected { box-shadow: 0 0 15px rgba(212, 175, 55, 0.25); }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
};

// --- Reusable Sub-components ---

const InputField = ({ icon, label, id, type, ...props }) => (
  <div style={styles.inputGroup}>
    <label htmlFor={id} style={styles.label}>{label}</label>
    <div style={styles.inputWrapper}>
      <span style={styles.inputIcon}>{icon}</span>
      <input type={type} id={id} required className="booking-input" style={styles.input} {...props} />
    </div>
  </div>
);

const SummaryRow = ({ label, value }) => (
  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
    <strong>{label}:</strong> {value}
  </p>
);

const LegendItem = ({ color, border, text, textColor = 'var(--text-secondary)', bold, crossed }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
    <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: color, border: `1px solid ${border}`, position: 'relative' }}>
      {crossed && <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '1px', backgroundColor: border, transform: 'rotate(45deg)' }}></div>}
    </div>
    <span style={{ color: textColor, fontWeight: bold ? 600 : 400 }}>{text}</span>
  </div>
);

// --- Extracted Styles Object ---

const styles = {
  formContainer: { display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '3rem 2.5rem', border: '1px solid var(--border)' },
  successCard: { textAlign: 'center', padding: '3.5rem 2rem', border: '2px solid var(--accent)', background: 'linear-gradient(to bottom, rgba(212, 175, 55, 0.05), var(--bg-secondary))' },
  successIconWrapper: { width: '60px', height: '60px', backgroundColor: 'var(--accent-light)', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', marginBottom: '1.5rem' },
  summaryCard: { backgroundColor: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-light)', textAlign: 'left', marginBottom: '2.5rem', display: 'grid', gap: '0.8rem' },
  waButton: { justifyContent: 'center', backgroundColor: '#25d366', color: '#fff', boxShadow: 'none' },
  inputGroup: { width: '100%' },
  label: { display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 },
  inputWrapper: { position: 'relative' },
  inputIcon: { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex' },
  input: { width: '100%', padding: '0.85rem 1rem 0.85rem 2.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '8px', transition: 'var(--transition-fast)' },
  legendContainer: { display: 'flex', gap: '1.2rem', marginBottom: '1rem', fontSize: '0.75rem', flexWrap: 'wrap' },
  slotGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(95px, 1fr))', gap: '0.6rem', marginBottom: '1rem' },
  slotButton: { padding: '0.75rem 0.5rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, textAlign: 'center', position: 'relative', overflow: 'hidden' },
  bookedLabel: { position: 'absolute', bottom: '2px', right: '2px', fontSize: '0.55rem', color: 'rgba(239, 68, 68, 0.7)', fontWeight: 700 },
  alertBox: { backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '0.9rem 1rem', fontSize: '0.85rem', color: '#ef4444', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', animation: 'fadeIn 0.3s ease' },
  suggestedSlot: { padding: '0.3rem 0.6rem', backgroundColor: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--accent)', borderRadius: '4px', color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }
};

export default BookingForm;