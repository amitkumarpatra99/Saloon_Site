import React, { useState } from 'react';
import { 
  Calendar, IndianRupee, Clock, Plus, Trash2,
  Edit3, Check, X, ShieldAlert, TrendingUp, BarChart3,
  CheckCircle, XCircle, AlertCircle
} from 'lucide-react';

const AdminDashboard = ({ 
  bookings, 
  onUpdateBooking, 
  services, 
  onAddService, 
  onEditService, 
  onDeleteService 
}) => {
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Service CRUD state
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  
  // Form fields for Service
  const [serviceName, setServiceName] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Haircut & Styling');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [servicePopular, setServicePopular] = useState(false);

  // Reschedule state
  const [reschedulingId, setReschedulingId] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('10:00 AM');

  // Categories list
  const categories = [
    "Haircut & Styling", "Hair Color", "Hair Spa", 
    "Facial", "Cleanup", "Manicure & Pedicure", 
    "Bridal Makeup", "Groom Makeup", "Waxing", "Skin Care"
  ];

  // Bookings calculations
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;

  // Calculate estimated earnings (based on average service cost of ₹400)
  const estimatedRevenue = bookings
    .filter(b => b.status === 'Approved')
    .reduce((sum, b) => {
      // Find matching service price
      const s = services.find(x => x.name === b.service);
      return sum + (s ? s.price : 400);
    }, 0);

  const pendingRevenue = bookings
    .filter(b => b.status === 'Pending')
    .reduce((sum, b) => {
      const s = services.find(x => x.name === b.service);
      return sum + (s ? s.price : 400);
    }, 0);

  // Handle Rescheduling
  const openReschedule = (booking) => {
    setReschedulingId(booking.id);
    setNewDate(booking.date);
    setNewTime(booking.time);
  };

  const saveReschedule = (id) => {
    onUpdateBooking(id, { date: newDate, time: newTime, status: 'Pending' });
    setReschedulingId(null);
  };

  // Handle Service Submit
  const handleServiceSubmit = (e) => {
    e.preventDefault();
    if (!serviceName || !servicePrice) return;

    const data = {
      name: serviceName,
      category: serviceCategory,
      price: Number(servicePrice),
      description: serviceDesc,
      popular: servicePopular
    };

    if (editingServiceId) {
      onEditService(editingServiceId, data);
      setEditingServiceId(null);
    } else {
      onAddService({
        id: `s_${Date.now()}`,
        ...data
      });
    }

    // Reset Form
    setServiceName('');
    setServiceCategory('Haircut & Styling');
    setServicePrice('');
    setServiceDesc('');
    setServicePopular(false);
    setShowAddServiceForm(false);
  };

  // Edit Service triggers
  const startEditService = (service) => {
    setEditingServiceId(service.id);
    setServiceName(service.name);
    setServiceCategory(service.category);
    setServicePrice(service.price);
    setServiceDesc(service.description);
    setServicePopular(service.popular);
    setShowAddServiceForm(true);
  };

  return (
    <div style={{ padding: '3rem 0', minHeight: '80vh', backgroundColor: 'var(--bg-primary)', transition: 'var(--transition-smooth)' }}>
      <div className="container">
        
        {/* Dashboard Title Header */}
        <div className="admin-header-flex" style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.5rem' }}>
          <div>
            <span style={{ color: 'var(--accent)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.15em', fontWeight: 600 }}>
              System Administration
            </span>
            <h2 className="admin-h2" style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
              Management Console
            </h2>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            backgroundColor: 'var(--accent-light)',
            border: '1px solid var(--border)',
            borderRadius: '50px',
            fontSize: '0.8rem',
            color: 'var(--accent)',
            width: 'fit-content'
          }}>
            <ShieldAlert size={14} />
            <strong>Secure Session</strong>
          </div>
        </div>

        {/* Overview KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {/* Card 1: Approved Revenue */}
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
              <IndianRupee size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Confirmed Billing</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '0.1rem' }}>₹{estimatedRevenue}</h3>
            </div>
          </div>

          {/* Card 2: Pending Revenue */}
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
              <IndianRupee size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Pipeline Estimate</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '0.1rem' }}>₹{pendingRevenue}</h3>
            </div>
          </div>

          {/* Card 3: Pending Bookings */}
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: 'rgba(212, 175, 55, 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
              <Clock size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Pending Requests</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '0.1rem' }}>{pendingBookings}</h3>
            </div>
          </div>

          {/* Card 4: Total Bookings */}
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
              <Calendar size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Bookings Log</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '0.1rem' }}>{totalBookings}</h3>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="admin-tabs-nav" style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--border-light)',
          paddingBottom: '0.5rem',
          overflowX: 'auto'
        }}>
          {[
            { id: 'bookings', label: 'Reservation Log', icon: <Calendar size={16} /> },
            { id: 'services', label: 'Catalog Manager', icon: <Plus size={16} /> },
            { id: 'analytics', label: 'Visual Analytics', icon: <BarChart3 size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                cursor: 'pointer',
                padding: '0.6rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-secondary)',
                borderBottom: `2px solid ${activeTab === tab.id ? 'var(--accent)' : 'transparent'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'var(--transition-fast)'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* View Section 1: Bookings Management */}
        {activeTab === 'bookings' && (
          <div className="glass-card animate-fade-in" style={{ padding: '2rem', overflowX: 'auto' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Active Reservations</h3>
            
            {bookings.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '3rem' }}>No reservation requests logged yet.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--accent)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '1rem' }}>Guest</th>
                    <th style={{ padding: '1rem' }}>Service Requested</th>
                    <th style={{ padding: '1rem' }}>Date & Time</th>
                    <th style={{ padding: '1rem' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} style={{ borderBottom: '1px solid var(--border-light)', fontSize: '0.9rem' }}>
                      
                      {/* Guest Info */}
                      <td style={{ padding: '1.25rem 1rem' }}>
                        <strong>{booking.name}</strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
                          {booking.phone}
                        </span>
                      </td>
                      
                      {/* Service Info */}
                      <td style={{ padding: '1.25rem 1rem' }}>{booking.service}</td>
                      
                      {/* Date & Time (Includes inline rescheduling editor!) */}
                      <td style={{ padding: '1.25rem 1rem' }}>
                        {reschedulingId === booking.id ? (
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <input 
                              type="date" 
                              value={newDate} 
                              onChange={(e) => setNewDate(e.target.value)}
                              style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', border: '1px solid var(--accent)', borderRadius: '4px', backgroundColor: 'var(--bg-tertiary)' }}
                            />
                            <select 
                              value={newTime} 
                              onChange={(e) => setNewTime(e.target.value)}
                              style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', border: '1px solid var(--accent)', borderRadius: '4px', backgroundColor: 'var(--bg-tertiary)' }}
                            >
                              {["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"].map(t => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                            <button onClick={() => saveReschedule(booking.id)} style={{ cursor: 'pointer', color: '#10b981' }} title="Save">
                              <Check size={16} />
                            </button>
                            <button onClick={() => setReschedulingId(null)} style={{ cursor: 'pointer', color: '#ef4444' }} title="Cancel">
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <strong>{booking.date}</strong>
                            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                              {booking.time}
                            </span>
                          </>
                        )}
                      </td>
                      
                      {/* Status Badge */}
                      <td style={{ padding: '1.25rem 1rem' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '0.25rem 0.6rem',
                          borderRadius: '20px',
                          backgroundColor: booking.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : booking.status === 'Cancelled' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: booking.status === 'Approved' ? '#10b981' : booking.status === 'Cancelled' ? '#ef4444' : '#f59e0b'
                        }}>
                          {booking.status === 'Approved' ? <CheckCircle size={10} /> : booking.status === 'Cancelled' ? <XCircle size={10} /> : <AlertCircle size={10} />}
                          <span>{booking.status}</span>
                        </span>
                      </td>

                      {/* Control Actions */}
                      <td style={{ padding: '1.25rem 1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          
                          {/* Approve Action */}
                          {booking.status !== 'Approved' && (
                            <button
                              onClick={() => onUpdateBooking(booking.id, { status: 'Approved' })}
                              style={{
                                cursor: 'pointer',
                                padding: '0.4rem 0.8rem',
                                fontSize: '0.75rem',
                                color: '#10b981',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                borderRadius: '4px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.2rem'
                              }}
                              className="admin-action-btn app"
                            >
                              <Check size={12} />
                              <span>Approve</span>
                            </button>
                          )}

                          {/* Reschedule Action */}
                          {booking.status !== 'Cancelled' && reschedulingId !== booking.id && (
                            <button
                              onClick={() => openReschedule(booking)}
                              style={{
                                cursor: 'pointer',
                                padding: '0.4rem 0.8rem',
                                fontSize: '0.75rem',
                                color: 'var(--accent)',
                                border: '1px solid rgba(212, 175, 55, 0.3)',
                                borderRadius: '4px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.2rem'
                              }}
                              className="admin-action-btn res"
                            >
                              <Edit3 size={12} />
                              <span>Resched</span>
                            </button>
                          )}

                          {/* Cancel Action */}
                          {booking.status !== 'Cancelled' && (
                            <button
                              onClick={() => onUpdateBooking(booking.id, { status: 'Cancelled' })}
                              style={{
                                cursor: 'pointer',
                                padding: '0.4rem 0.8rem',
                                fontSize: '0.75rem',
                                color: '#ef4444',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: '4px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.2rem'
                              }}
                              className="admin-action-btn rej"
                            >
                              <X size={12} />
                              <span>Cancel</span>
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* View Section 2: Services Catalog Manager */}
        {activeTab === 'services' && (
          <div className="animate-fade-in" style={{ display: 'grid', gap: '2rem' }}>
            
            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.4rem' }}>Catalog Services</h3>
              <button
                onClick={() => {
                  setEditingServiceId(null);
                  setServiceName('');
                  setServicePrice('');
                  setServiceDesc('');
                  setServicePopular(false);
                  setShowAddServiceForm(!showAddServiceForm);
                }}
                className="btn-gold"
                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
              >
                <Plus size={14} />
                <span>{showAddServiceForm ? "Collapse Form" : "Create Service"}</span>
              </button>
            </div>

            {/* Service Form (Add / Edit) */}
            {showAddServiceForm && (
              <form onSubmit={handleServiceSubmit} className="glass-card" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.25rem',
                border: '1px solid var(--accent)',
                padding: '2.5rem'
              }}>
                <h4 style={{ gridColumn: '1 / -1', fontSize: '1.2rem', marginBottom: '-0.5rem', color: 'var(--accent)' }}>
                  {editingServiceId ? "Modify Treatment Specs" : "Add New Salon Treatment"}
                </h4>

                {/* Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Service Name</label>
                  <input
                    type="text"
                    required
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="e.g. Balayage Highlighting"
                    style={{ width: '100%', padding: '0.6rem 0.8rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: '6px' }}
                  />
                </div>

                {/* Category */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Category</label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                    placeholder="e.g. 1500"
                    style={{ width: '100%', padding: '0.6rem 0.8rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: '6px' }}
                  />
                </div>

                {/* Description */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Service Description</label>
                  <textarea
                    required
                    rows={2}
                    value={serviceDesc}
                    onChange={(e) => setServiceDesc(e.target.value)}
                    placeholder="Short description of the styling treatment details..."
                    style={{ width: '100%', padding: '0.6rem 0.8rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: '6px', resize: 'none' }}
                  />
                </div>

                {/* Popular Checkbox */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', gridColumn: '1 / -1' }}>
                  <input
                    type="checkbox"
                    id="popular-box"
                    checked={servicePopular}
                    onChange={(e) => setServicePopular(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--accent)', cursor: 'pointer' }}
                  />
                  <label htmlFor="popular-box" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    Feature with gold popular badge on the client-facing catalog
                  </label>
                </div>

                <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <button type="submit" className="btn-gold" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>
                    <span>{editingServiceId ? "Save Changes" : "Publish Treatment"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddServiceForm(false);
                      setEditingServiceId(null);
                    }}
                    className="btn-outline"
                    style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* List Table */}
            <div className="glass-card" style={{ padding: '2rem', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--accent)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '1rem' }}>Name</th>
                    <th style={{ padding: '1rem' }}>Category</th>
                    <th style={{ padding: '1rem' }}>Price</th>
                    <th style={{ padding: '1rem' }}>Featured</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} style={{ borderBottom: '1px solid var(--border-light)', fontSize: '0.9rem' }}>
                      <td style={{ padding: '1.1rem 1rem' }}>
                        <strong>{service.name}</strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.1rem', maxWidth: '350px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {service.description}
                        </span>
                      </td>
                      <td style={{ padding: '1.1rem 1rem' }}>
                        <span style={{ fontSize: '0.8rem', backgroundColor: 'var(--bg-tertiary)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                          {service.category}
                        </span>
                      </td>
                      <td style={{ padding: '1.1rem 1rem', fontWeight: 600, color: 'var(--accent)' }}>₹{service.price}</td>
                      <td style={{ padding: '1.1rem 1rem' }}>{service.popular ? "★ Yes" : "No"}</td>
                      <td style={{ padding: '1.1rem 1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => startEditService(service)}
                            style={{ cursor: 'pointer', color: 'var(--accent)', padding: '0.3rem' }}
                            title="Edit Service Details"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => onDeleteService(service.id)}
                            style={{ cursor: 'pointer', color: '#ef4444', padding: '0.3rem' }}
                            title="Delete Service"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* View Section 3: Visual Analytics */}
        {activeTab === 'analytics' && (
          <div className="animate-fade-in analytics-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            
            {/* Chart Block 1: Popular categories */}
            <div className="glass-card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                <TrendingUp size={20} className="text-gold" />
                <h3 style={{ fontSize: '1.3rem' }}>Service Popularity Index</h3>
              </div>

              {/* Pure CSS Bar Charts */}
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {[
                  { label: "Haircut & Design", percent: 45, count: 82 },
                  { label: "Hair Color / Tone", percent: 28, count: 51 },
                  { label: "Bridal Cosmetics", percent: 15, count: 27 },
                  { label: "Hydrafacials & Skin Care", percent: 12, count: 22 }
                ].map((item) => (
                  <div key={item.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                      <span>{item.label} (<strong>{item.count}</strong> reservations)</span>
                      <strong>{item.percent}%</strong>
                    </div>
                    {/* Bar Background */}
                    <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden' }}>
                      {/* Bar Fill */}
                      <div style={{ width: `${item.percent}%`, height: '100%', background: 'linear-gradient(to right, #9c7810, var(--accent))', borderRadius: '10px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing Breakdown Cards */}
            <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifySelf: 'stretch', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <IndianRupee size={20} className="text-gold" />
                  <h3 style={{ fontSize: '1.3rem' }}>Billing Analysis</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                  AURA financial metrics compiled dynamically based on customer bookings and service prices listed within the database.
                </p>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                  <span>Confirmed Billing (Approved Bookings):</span>
                  <strong style={{ color: '#10b981' }}>₹{estimatedRevenue}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                  <span>Unconfirmed Pipeline (Pending Bookings):</span>
                  <strong style={{ color: '#f59e0b' }}>₹{pendingRevenue}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderTop: '2px dashed var(--border)', paddingTop: '1.5rem', fontSize: '1.1rem' }}>
                  <strong>Maximum Estimated Revenue potential:</strong>
                  <strong style={{ color: 'var(--accent)' }}>₹{estimatedRevenue + pendingRevenue}</strong>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      <style>{`
        .admin-action-btn {
          background-color: transparent;
          transition: var(--transition-fast);
        }
        .admin-action-btn.app:hover {
          background-color: #10b981 !important;
          color: #ffffff !important;
        }
        .admin-action-btn.res:hover {
          background-color: var(--accent) !important;
          color: #000000 !important;
        }
        .admin-action-btn.rej:hover {
          background-color: #ef4444 !important;
          color: #ffffff !important;
        }
        .admin-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
        }
        .admin-tabs-nav::-webkit-scrollbar {
          display: none;
        }
        .admin-tabs-nav {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        @media (max-width: 768px) {
          .admin-header-flex {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .admin-h2 {
            font-size: 1.7rem !important;
          }
        }
        @media (min-width: 992px) {
          .analytics-grid {
            grid-template-columns: 1.2fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
