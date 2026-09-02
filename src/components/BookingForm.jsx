import React, { useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  User,
  Phone,
  CheckCircle,
  MessageSquare,
  Clock,
  Scissors,
  AlertCircle,
  ChevronRight,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { INITIAL_TEAM } from '../data/mockData';

const BookingForm = ({
  services = [],
  selectedService,
  bookings = [],
  onAddBooking,
}) => {
  /* =========================================================
     DATE / TIME HELPERS
  ========================================================= */

  const getLocalDate = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    return new Date(now.getTime() - offset * 60 * 1000)
      .toISOString()
      .split('T')[0];
  };

  const getCurrentMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  const timeToMinutes = (timeString) => {
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  const today = getLocalDate();

  /* =========================================================
     STATE
  ========================================================= */

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [stylist, setStylist] = useState('Any Available Stylist');
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('10:00 AM');

  const [whatsappConfirm, setWhatsappConfirm] = useState(true);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState('');

  /* =========================================================
     TIME SLOTS
  ========================================================= */

  const timeSlots = useMemo(
    () => [
      '09:00 AM',
      '10:00 AM',
      '11:00 AM',
      '12:00 PM',
      '01:00 PM',
      '02:00 PM',
      '03:00 PM',
      '04:00 PM',
      '05:00 PM',
      '06:00 PM',
      '07:00 PM',
    ],
    []
  );

  /* =========================================================
     PRE-SELECT SERVICE
  ========================================================= */

  useEffect(() => {
    if (selectedService) {
      setService(selectedService);
    }
  }, [selectedService]);

  /* =========================================================
     ACTIVE BOOKINGS
  ========================================================= */

  const activeBookingsForDate = useMemo(() => {
    return bookings.filter(
      (booking) =>
        booking.date === date &&
        booking.status === 'Approved'
    );
  }, [bookings, date]);

  /* =========================================================
     BOOKING AVAILABILITY
  ========================================================= */

  const getSlotStatus = (slot) => {
    if (!date) return 'available';

    // Disable previous time slots for today's date
    if (
      date === today &&
      timeToMinutes(slot) <= getCurrentMinutes()
    ) {
      return 'past';
    }

    const bookingsForTime = activeBookingsForDate.filter(
      (booking) => booking.time === slot
    );

    if (stylist === 'Any Available Stylist') {
      const hasGeneralBooking = bookingsForTime.some(
        (booking) =>
          booking.stylist === 'Any Available Stylist'
      );

      if (hasGeneralBooking) {
        return 'booked';
      }

      const bookedStylists = new Set(
        bookingsForTime
          .map((booking) => booking.stylist)
          .filter(Boolean)
          .filter(
            (name) =>
              name !== 'Any Available Stylist'
          )
      );

      if (bookedStylists.size >= INITIAL_TEAM.length) {
        return 'booked';
      }

      return 'available';
    }

    const isStylistBooked = bookingsForTime.some(
      (booking) =>
        booking.stylist === stylist ||
        booking.stylist === 'Any Available Stylist'
    );

    return isStylistBooked ? 'booked' : 'available';
  };

  const availableSlots = useMemo(() => {
    return timeSlots.filter(
      (slot) => getSlotStatus(slot) === 'available'
    );
  }, [timeSlots, date, stylist, activeBookingsForDate]);

  const selectedSlotStatus = getSlotStatus(time);

  /* =========================================================
     FORM VALIDATION
  ========================================================= */

  const validateForm = () => {
    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      return 'Please enter your full name.';
    }

    if (cleanName.length < 2) {
      return 'Please enter a valid name.';
    }

    const phoneDigits = cleanPhone.replace(/\D/g, '');

    if (phoneDigits.length < 10) {
      return 'Please enter a valid 10-digit mobile number.';
    }

    if (!service) {
      return 'Please select a service or package.';
    }

    if (!date) {
      return 'Please select an appointment date.';
    }

    if (date < today) {
      return 'Please select today or a future date.';
    }

    if (!time) {
      return 'Please select an appointment time.';
    }

    if (selectedSlotStatus === 'past') {
      return 'This time has already passed. Please choose another slot.';
    }

    if (selectedSlotStatus === 'booked') {
      return `${time} is no longer available. Please choose another slot.`;
    }

    return '';
  };

  /* =========================================================
     SUBMIT BOOKING
  ========================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    const newBooking = {
      id: `b_${Date.now()}`,
      name: cleanName,
      phone: cleanPhone,
      service,
      stylist,
      date,
      time,
      status: 'Pending',
      whatsappConfirmed: whatsappConfirm,
      created: today,
    };

    try {
      await Promise.resolve(onAddBooking(newBooking));

      setSubmittedData(newBooking);
      setIsSubmitted(true);

      // Reset fields while keeping today's date
      setName('');
      setPhone('');
      setService('');
      setStylist('Any Available Stylist');
      setTime('10:00 AM');
    } catch (submissionError) {
      console.error(submissionError);
      setError(
        'Something went wrong while saving your reservation. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================================
     WHATSAPP
  ========================================================= */

  const getWhatsAppLink = () => {
    if (!submittedData) return '#';

    const text = `Hi AURA Luxury Salon!

I have just requested an appointment:

Name: ${submittedData.name}
Service: ${submittedData.service}
Preferred Stylist: ${submittedData.stylist}
Date: ${submittedData.date}
Time: ${submittedData.time}

Please confirm my appointment. Thank you!`;

    const salonWhatsAppNumber = '15550199';

    return `https://wa.me/${salonWhatsAppNumber}?text=${encodeURIComponent(
      text
    )}`;
  };

  /* =========================================================
     BOOK ANOTHER SLOT
  ========================================================= */

  const handleBookAnother = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setError('');
    setDate(today);
    setTime('10:00 AM');
  };

  /* =========================================================
     SLOT CLICK
  ========================================================= */

  const handleSlotClick = (slot) => {
    const status = getSlotStatus(slot);

    if (status !== 'available') return;

    setTime(slot);
    setError('');
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      id="booking"
      style={{
        padding: '6rem 0',
        backgroundColor: 'var(--bg-primary)',
        transition: 'var(--transition-smooth)',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '0 1rem',
        }}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="section-title-container"
          style={{
            textAlign: 'center',
            marginBottom: '2.5rem',
          }}
        >
          <span className="section-subtitle">
            Reservations
          </span>

          <h2 className="section-title">
            Book An Appointment
          </h2>

          <p
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '520px',
              margin: '0.75rem auto 0',
              lineHeight: 1.7,
            }}
          >
            Choose your preferred service, stylist, date and
            time. Your reservation will remain pending until
            our team confirms it.
          </p>
        </div>

        {/* =====================================================
            SUCCESS SCREEN
        ===================================================== */}

        {isSubmitted ? (
          <div
            className="glass-card animate-fade-in"
            style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              border: '1px solid var(--accent)',
              background:
                'linear-gradient(145deg, rgba(212,175,55,0.08), var(--bg-secondary))',
              borderRadius: '16px',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                backgroundColor: 'var(--accent-light)',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
                marginBottom: '1.5rem',
                boxShadow:
                  '0 0 30px rgba(212,175,55,0.15)',
              }}
            >
              <CheckCircle size={40} />
            </div>

            <h3
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                marginBottom: '0.6rem',
                color: 'var(--text-primary)',
              }}
            >
              Appointment Requested!
            </h3>

            <p
              style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '2rem',
              }}
            >
              Your reservation has been successfully
              submitted. Our team will contact you shortly
              to confirm your appointment.
            </p>

            {/* BOOKING SUMMARY */}

            <div
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                textAlign: 'left',
                marginBottom: '2rem',
                display: 'grid',
                gap: '1rem',
              }}
            >
              <SummaryRow
                label="Guest Name"
                value={submittedData?.name}
              />

              <SummaryRow
                label="Service"
                value={submittedData?.service}
              />

              <SummaryRow
                label="Preferred Stylist"
                value={submittedData?.stylist}
              />

              <SummaryRow
                label="Date"
                value={submittedData?.date}
              />

              <SummaryRow
                label="Time"
                value={submittedData?.time}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  paddingTop: '0.5rem',
                  borderTop:
                    '1px solid var(--border-light)',
                }}
              >
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Status
                </span>

                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--warning)',
                    padding: '0.3rem 0.7rem',
                    borderRadius: '999px',
                    background:
                      'rgba(245,158,11,0.1)',
                  }}
                >
                  Pending Confirmation
                </span>
              </div>
            </div>

            {/* ACTIONS */}

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
            >
              {submittedData?.whatsappConfirmed && (
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{
                    justifyContent: 'center',
                    backgroundColor: '#25D366',
                    color: '#fff',
                    boxShadow:
                      '0 8px 20px rgba(37,211,102,0.15)',
                    textDecoration: 'none',
                  }}
                >
                  <MessageSquare size={18} />
                  <span>
                    Send Details on WhatsApp
                  </span>
                  <ChevronRight size={17} />
                </a>
              )}

              <button
                type="button"
                onClick={handleBookAnother}
                className="btn-outline"
                style={{
                  justifyContent: 'center',
                }}
              >
                <RotateCcw size={17} />
                Book Another Appointment
              </button>
            </div>

            {/* TRUST MESSAGE */}

            <div
              style={{
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
              }}
            >
              <ShieldCheck size={15} />
              Your booking details are kept private.
            </div>
          </div>
        ) : (
          /* ===================================================
             BOOKING FORM
          =================================================== */

          <form
            onSubmit={handleSubmit}
            className="glass-card animate-fade-in"
            noValidate
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              padding: 'clamp(1.5rem, 5vw, 3rem)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
            }}
          >
            {/* ERROR MESSAGE */}

            {error && (
              <div
                role="alert"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.7rem',
                  padding: '0.9rem 1rem',
                  borderRadius: '10px',
                  background:
                    'rgba(239,68,68,0.08)',
                  border:
                    '1px solid rgba(239,68,68,0.25)',
                  color: '#ef4444',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                }}
              >
                <AlertCircle
                  size={17}
                  style={{
                    flexShrink: 0,
                    marginTop: '1px',
                  }}
                />

                <span>{error}</span>
              </div>
            )}

            {/* =================================================
                NAME
            ================================================= */}

            <FormField
              label="Full Name"
              htmlFor="booking-name"
            >
              <div className="booking-field-wrapper">
                <User
                  size={17}
                  className="booking-field-icon"
                />

                <input
                  type="text"
                  id="booking-name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your full name"
                  className="booking-input"
                  maxLength={60}
                />
              </div>
            </FormField>

            {/* =================================================
                PHONE
            ================================================= */}

            <FormField
              label="Phone Number"
              htmlFor="booking-phone"
            >
              <div className="booking-field-wrapper">
                <Phone
                  size={17}
                  className="booking-field-icon"
                />

                <input
                  type="tel"
                  id="booking-phone"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter mobile number"
                  className="booking-input"
                  maxLength={20}
                />
              </div>
            </FormField>

            {/* =================================================
                SERVICE
            ================================================= */}

            <FormField
              label="Select Service / Package"
              htmlFor="booking-service"
            >
              <select
                required
                id="booking-service"
                value={service}
                onChange={(e) => {
                  setService(e.target.value);
                  setError('');
                }}
                className="booking-input select-input"
              >
                <option value="">
                  Choose a treatment...
                </option>

                {/* Custom selected service */}

                {service &&
                  !services.some(
                    (s) => s.name === service
                  ) &&
                  ![
                    'Golden Jubilee Bridal Package',
                    'Aura Premium Hair Spa Combo',
                    'First-Visit Welcoming Invitation',
                    'Vip Monthly Membership Club',
                  ].includes(service) && (
                    <option value={service}>
                      {service}
                    </option>
                  )}

                {/* Dynamic service groups */}

                {Array.from(
                  new Set(
                    services.map(
                      (serviceItem) =>
                        serviceItem.category
                    )
                  )
                ).map((category) => (
                  <optgroup
                    key={category}
                    label={category}
                  >
                    {services
                      .filter(
                        (item) =>
                          item.category === category
                      )
                      .map((item) => (
                        <option
                          key={item.id}
                          value={item.name}
                        >
                          {item.name} (₹{item.price})
                        </option>
                      ))}
                  </optgroup>
                ))}

                {/* Special offers */}

                <optgroup label="Special Offers & Combo Packages">
                  <option value="Golden Jubilee Bridal Package">
                    Golden Jubilee Bridal Package (₹799)
                  </option>

                  <option value="Aura Premium Hair Spa Combo">
                    Aura Premium Hair Spa Combo (₹699)
                  </option>

                  <option value="First-Visit Welcoming Invitation">
                    First-Visit Welcoming Invitation (20% OFF)
                  </option>

                  <option value="Vip Monthly Membership Club">
                    VIP Monthly Membership Club (₹799)
                  </option>
                </optgroup>
              </select>
            </FormField>

            {/* =================================================
                STYLIST
            ================================================= */}

            <FormField
              label="Preferred Stylist / Dermal Artist"
              htmlFor="booking-stylist"
            >
              <div className="booking-field-wrapper">
                <Scissors
                  size={17}
                  className="booking-field-icon"
                />

                <select
                  id="booking-stylist"
                  value={stylist}
                  onChange={(e) => {
                    setStylist(e.target.value);
                    setError('');
                  }}
                  className="booking-input select-input booking-input-with-icon"
                >
                  <option value="Any Available Stylist">
                    Any Available Master Stylist
                  </option>

                  {INITIAL_TEAM.map((member) => (
                    <option
                      key={member.id}
                      value={member.name}
                    >
                      {member.name} ({member.role})
                    </option>
                  ))}
                </select>
              </div>
            </FormField>

            {/* =================================================
                DATE
            ================================================= */}

            <FormField
              label="Appointment Date"
              htmlFor="booking-date"
            >
              <div className="booking-field-wrapper">
                <Calendar
                  size={17}
                  className="booking-field-icon"
                />

                <input
                  type="date"
                  id="booking-date"
                  required
                  value={date}
                  min={today}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setError('');
                  }}
                  className="booking-input booking-input-with-icon"
                />
              </div>
            </FormField>

            {/* =================================================
                TIME SLOTS
            ================================================= */}

            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '0.8rem',
                }}
              >
                <label
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                  }}
                >
                  Select Time Slot
                </label>

                <span
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {availableSlots.length} slots available
                </span>
              </div>

              {/* LEGEND */}

              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  marginBottom: '1rem',
                  fontSize: '0.72rem',
                  flexWrap: 'wrap',
                }}
              >
                <Legend
                  type="available"
                  label="Available"
                />

                <Legend
                  type="selected"
                  label="Selected"
                />

                <Legend
                  type="booked"
                  label="Booked"
                />

                <Legend
                  type="past"
                  label="Passed"
                />
              </div>

              {/* SLOTS */}

              <div
                className="time-slots-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fill, minmax(105px, 1fr))',
                  gap: '0.65rem',
                }}
              >
                {timeSlots.map((slot) => {
                  const status = getSlotStatus(slot);
                  const isSelected = time === slot;

                  const disabled =
                    status !== 'available';

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={disabled}
                      aria-label={`${slot} ${
                        status === 'available'
                          ? 'available'
                          : status
                      }`}
                      aria-pressed={
                        isSelected
                      }
                      onClick={() =>
                        handleSlotClick(slot)
                      }
                      className={`slot-btn ${
                        isSelected
                          ? 'selected'
                          : ''
                      } ${
                        status === 'booked'
                          ? 'booked'
                          : ''
                      } ${
                        status === 'past'
                          ? 'past'
                          : ''
                      }`}
                    >
                      <Clock size={14} />
                      <span>{slot}</span>

                      {status === 'booked' && (
                        <small>Booked</small>
                      )}

                      {status === 'past' && (
                        <small>Passed</small>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* BOOKED ALERT */}

              {selectedSlotStatus ===
                'booked' && (
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    borderRadius: '10px',
                    background:
                      'rgba(239,68,68,0.07)',
                    border:
                      '1px solid rgba(239,68,68,0.25)',
                    color: '#ef4444',
                    fontSize: '0.82rem',
                  }}
                >
                  <strong>
                    {time} is unavailable.
                  </strong>

                  {availableSlots.length >
                    0 && (
                    <>
                      <div
                        style={{
                          marginTop: '0.5rem',
                          color:
                            'var(--text-secondary)',
                        }}
                      >
                        Try an available slot:
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          gap: '0.5rem',
                          flexWrap: 'wrap',
                          marginTop: '0.6rem',
                        }}
                      >
                        {availableSlots
                          .slice(0, 4)
                          .map(
                            (availableSlot) => (
                              <button
                                key={
                                  availableSlot
                                }
                                type="button"
                                onClick={() =>
                                  handleSlotClick(
                                    availableSlot
                                  )
                                }
                                className="quick-slot"
                              >
                                {availableSlot}
                              </button>
                            )
                          )}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* NO SLOTS */}

              {date &&
                availableSlots.length ===
                  0 && (
                  <div
                    style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      borderRadius: '10px',
                      background:
                        'rgba(245,158,11,0.07)',
                      border:
                        '1px solid rgba(245,158,11,0.25)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.82rem',
                    }}
                  >
                    <strong>
                      No available slots for this
                      selection.
                    </strong>
                    <div
                      style={{
                        marginTop: '0.3rem',
                      }}
                    >
                      Please choose another date or
                      select another stylist.
                    </div>
                  </div>
                )}
            </div>

            {/* =================================================
                WHATSAPP
            ================================================= */}

            <label
              htmlFor="whatsapp-confirm"
              className="whatsapp-option"
            >
              <input
                type="checkbox"
                id="whatsapp-confirm"
                checked={whatsappConfirm}
                onChange={(e) =>
                  setWhatsappConfirm(
                    e.target.checked
                  )
                }
              />

              <div>
                <strong>
                  Get confirmation via WhatsApp
                </strong>

                <span>
                  We'll prepare your booking details
                  for quick WhatsApp confirmation.
                </span>
              </div>

              <MessageSquare
                size={19}
                style={{
                  marginLeft: 'auto',
                  color: '#25D366',
                  flexShrink: 0,
                }}
              />
            </label>

            {/* =================================================
                SUBMIT
            ================================================= */}

            <button
              type="submit"
              disabled={
                isSubmitting ||
                selectedSlotStatus !==
                  'available'
              }
              className={
                selectedSlotStatus ===
                'available'
                  ? 'btn-gold'
                  : 'btn-outline'
              }
              style={{
                marginTop: '0.5rem',
                justifyContent: 'center',
                padding: '1rem',
                opacity: isSubmitting
                  ? 0.7
                  : 1,
              }}
            >
              {isSubmitting ? (
                <>
                  <span className="booking-spinner" />
                  Submitting Request...
                </>
              ) : (
                <>
                  <Calendar size={18} />

                  <span>
                    {selectedSlotStatus ===
                    'available'
                      ? 'Confirm Reservation Request'
                      : 'Selected Slot Unavailable'}
                  </span>

                  {selectedSlotStatus ===
                    'available' && (
                    <ChevronRight
                      size={17}
                    />
                  )}
                </>
              )}
            </button>

            <p
              style={{
                textAlign: 'center',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                margin: 0,
              }}
            >
              Your reservation is a request until
              confirmed by AURA Luxury Salon.
            </p>
          </form>
        )}
      </div>

      {/* =======================================================
          STYLES
      ======================================================= */}

      <style>{`
        .booking-input {
          width: 100%;
          padding: 0.9rem 1rem;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-light);
          border-radius: 9px;
          color: var(--text-primary);
          outline: none;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .booking-input-with-icon {
          padding-left: 2.6rem;
        }

        .booking-input::placeholder {
          color: var(--text-muted);
        }

        .booking-input:focus {
          border-color: var(--accent) !important;
          box-shadow:
            0 0 0 3px rgba(212,175,55,0.08),
            0 0 12px rgba(212,175,55,0.08);
        }

        .booking-field-wrapper {
          position: relative;
        }

        .booking-field-icon {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
          z-index: 2;
        }

        .select-input {
          cursor: pointer;
        }

        .select-input option {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
        }

        .slot-btn {
          min-height: 52px;
          padding: 0.65rem 0.4rem;
          border-radius: 9px;
          border: 1px solid var(--border-light);
          background: var(--bg-secondary);
          color: var(--text-primary);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.2rem;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition:
            transform 0.2s ease,
            border-color 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        .slot-btn:not(:disabled):hover {
          transform: translateY(-2px);
          border-color: var(--accent);
          box-shadow:
            0 7px 18px rgba(212,175,55,0.12);
        }

        .slot-btn.selected {
          background: rgba(212,175,55,0.14);
          border-color: var(--accent);
          color: var(--accent);
          box-shadow:
            0 0 0 2px rgba(212,175,55,0.08),
            0 5px 20px rgba(212,175,55,0.12);
        }

        .slot-btn.booked {
          background: rgba(239,68,68,0.05);
          border-color: rgba(239,68,68,0.2);
          color: rgba(239,68,68,0.5);
          text-decoration: line-through;
          cursor: not-allowed;
        }

        .slot-btn.past {
          background: rgba(100,100,100,0.04);
          border-color: var(--border-light);
          color: var(--text-muted);
          opacity: 0.5;
          cursor: not-allowed;
        }

        .slot-btn small {
          font-size: 0.55rem;
          font-weight: 700;
          text-decoration: none;
        }

        .quick-slot {
          padding: 0.35rem 0.65rem;
          border-radius: 6px;
          border: 1px solid var(--accent);
          background: rgba(212,175,55,0.08);
          color: var(--accent);
          font-size: 0.72rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-slot:hover {
          background: rgba(212,175,55,0.16);
          transform: translateY(-1px);
        }

        .whatsapp-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border: 1px solid var(--border-light);
          border-radius: 10px;
          background: var(--bg-secondary);
          cursor: pointer;
          transition: border-color 0.2s ease,
                      background 0.2s ease;
        }

        .whatsapp-option:hover {
          border-color: rgba(37,211,102,0.35);
          background: rgba(37,211,102,0.03);
        }

        .whatsapp-option input {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #25D366;
          flex-shrink: 0;
        }

        .whatsapp-option div {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          min-width: 0;
        }

        .whatsapp-option strong {
          font-size: 0.82rem;
          color: var(--text-primary);
        }

        .whatsapp-option span {
          font-size: 0.7rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .booking-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid currentColor;
          border-right-color: transparent;
          border-radius: 50%;
          animation: bookingSpin 0.7s linear infinite;
        }

        @keyframes bookingSpin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 520px) {
          #booking {
            padding: 4rem 0 !important;
          }

          .time-slots-grid {
            grid-template-columns:
              repeat(3, 1fr) !important;
          }

          .slot-btn {
            min-height: 50px;
            font-size: 0.7rem;
          }
        }

        @media (max-width: 360px) {
          .time-slots-grid {
            grid-template-columns:
              repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};

/* =============================================================
   REUSABLE COMPONENTS
============================================================= */

const FormField = ({
  label,
  htmlFor,
  children,
}) => (
  <div>
    <label
      htmlFor={htmlFor}
      style={{
        display: 'block',
        fontSize: '0.82rem',
        color: 'var(--text-secondary)',
        marginBottom: '0.55rem',
        fontWeight: 600,
      }}
    >
      {label}
    </label>

    {children}
  </div>
);

const SummaryRow = ({ label, value }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '1rem',
    }}
  >
    <span
      style={{
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        flexShrink: 0,
      }}
    >
      {label}
    </span>

    <strong
      style={{
        fontSize: '0.82rem',
        color: 'var(--text-primary)',
        textAlign: 'right',
        wordBreak: 'break-word',
      }}
    >
      {value || '—'}
    </strong>
  </div>
);

const Legend = ({ type, label }) => {
  const styles = {
    available: {
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-light)',
    },
    selected: {
      background: 'rgba(212,175,55,0.15)',
      border: '1px solid var(--accent)',
    },
    booked: {
      background: 'rgba(239,68,68,0.08)',
      border: '1px solid rgba(239,68,68,0.35)',
    },
    past: {
      background: 'rgba(100,100,100,0.06)',
      border: '1px solid var(--border-light)',
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
      }}
    >
      <div
        style={{
          width: '11px',
          height: '11px',
          borderRadius: '3px',
          ...styles[type],
        }}
      />

      <span
        style={{
          color: 'var(--text-secondary)',
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default BookingForm;