import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { ShieldAlert, Mail, Lock, AlertCircle, Sparkles } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (authError) {
        setError(authError.message);
      } else {
        onLoginSuccess(data.user);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem 1rem',
      backgroundColor: 'var(--bg-primary)',
      transition: 'var(--transition-smooth)'
    }}>
      <form 
        onSubmit={handleLogin} 
        className="glass-card animate-fade-in" 
        style={{ 
          maxWidth: '420px', 
          width: '100%',
          padding: '3rem 2.5rem',
          border: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Header Icon */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: 'var(--accent-light)',
            color: 'var(--accent)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldAlert size={28} />
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', fontWeight: 600 }}>
            Access Restricted
          </span>
          <h3 style={{ 
            fontSize: '1.8rem', 
            fontFamily: 'var(--font-serif)', 
            color: 'var(--text-primary)', 
            marginTop: '0.25rem',
            marginBottom: '0.5rem'
          }}>
            Staff Management
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Authorized salon administrators and developers only.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.85rem',
            color: '#ef4444',
            animation: 'fadeIn 0.3s ease'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Email Input */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 500 }}>
            Admin Email Address
          </label>
          <div style={{ position: 'relative' }}>
            <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="email" 
              required
              placeholder="admin@aurasalon.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="booking-input"
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 2.5rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                color: 'var(--text-primary)'
              }}
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 500 }}>
            Security Password
          </label>
          <div style={{ position: 'relative' }}>
            <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="password" 
              required
              placeholder="••••••••" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="booking-input"
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 2.5rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                color: 'var(--text-primary)'
              }}
            />
          </div>
        </div>

        {/* Submit button */}
        <button 
          type="submit" 
          disabled={loading}
          className="btn-gold" 
          style={{ 
            width: '100%', 
            justifyContent: 'center',
            padding: '0.9rem',
            marginTop: '0.5rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          <Sparkles size={16} />
          <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
        </button>
      </form>
    </div>
  );
}
