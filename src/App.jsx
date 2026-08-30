import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Offers from './components/Offers';
import PackageBuilder from './components/PackageBuilder';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Team from './components/Team';
import LoyaltyPortal from './components/LoyaltyPortal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import BookingForm from './components/BookingForm';
import Login from './components/Login';
import { 
  INITIAL_SERVICES, 
  INITIAL_BOOKINGS, 
  INITIAL_REVIEWS 
} from './data/mockData';
import { MessageSquare, Calendar } from 'lucide-react';
import './App.css';

const readStoredData = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
};

function App() {
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('aura_theme') || 'dark';
  });

  // Navigation / Router State ('site' or 'admin')
  const [currentView, setCurrentView] = useState('site');

  // Admin Auth State
  const [user, setUser] = useState(null);

  // Database States
  const [services, setServices] = useState(() => {
    return readStoredData('aura_services_v3', INITIAL_SERVICES);
  });

  const [bookings, setBookings] = useState(() => {
    return readStoredData('aura_bookings_v3', INITIAL_BOOKINGS);
  });

  const [reviews, setReviews] = useState(() => {
    return readStoredData('aura_reviews_v3', INITIAL_REVIEWS);
  });

  // Interactive Selected Service for Booking Form Autofill
  const [selectedService, setSelectedService] = useState('');

  // Synchronize Theme Class on Mount & Theme Toggle
  useEffect(() => {
    const body = document.body;
    if (theme === 'light') {
      body.classList.add('light-theme');
    } else {
      body.classList.remove('light-theme');
    }
    localStorage.setItem('aura_theme', theme);
  }, [theme]);

  // Synchronize DB states with LocalStorage
  useEffect(() => {
    localStorage.setItem('aura_services_v3', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('aura_bookings_v3', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('aura_reviews_v3', JSON.stringify(reviews));
  }, [reviews]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Booking Actions
  const handleAddBooking = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleUpdateBooking = (id, updatedFields) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, ...updatedFields } : b));
  };

  // Service CRUD Actions
  const handleAddService = (newService) => {
    setServices(prev => [newService, ...prev]);
  };

  const handleEditService = (id, updatedData) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  const handleDeleteService = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Review Actions
  const handleAddReview = (newReview) => {
    setReviews(prev => [newReview, ...prev]);
  };

  return (
    <div className="app-container">
      {/* Universal Navigation Header */}
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />

      {currentView === 'admin' ? (
        !user ? (
          <Login onLoginSuccess={(loggedInUser) => setUser(loggedInUser)} />
        ) : (
          /* Render Administrative Dashboard View */
          <main className="animate-fade-in">
            <AdminDashboard 
              user={user}
              onLogout={() => setUser(null)}
              bookings={bookings}
              onUpdateBooking={handleUpdateBooking}
              services={services}
              onAddService={handleAddService}
              onEditService={handleEditService}
              onDeleteService={handleDeleteService}
            />
          </main>
        )
      ) : (
        /* Render Public Front Facing Website View */
        <main className="animate-fade-in">
          <Hero />
          <Services 
            services={services} 
            onSelectService={setSelectedService} 
          />
          <About />
          <Offers 
            onSelectService={setSelectedService} 
          />
          <PackageBuilder 
            services={services} 
            onSelectService={setSelectedService} 
          />
          <Gallery />
          <Reviews 
            reviews={reviews} 
            onAddReview={handleAddReview} 
          />
          <Team />
          <LoyaltyPortal 
            bookings={bookings} 
          />
          <BookingForm 
            services={services}
            selectedService={selectedService}
            bookings={bookings}
            onAddBooking={handleAddBooking}
          />
          <Contact />
        </main>
      )}

      {/* Universal Page Footer */}
      <Footer setCurrentView={setCurrentView} />

      {/* Interactive Global Floating Utilities (Client-facing view only) */}
      {currentView === 'site' && (
        <>
          {/* Sticky Book Appointment Bottom Bar (Mobile responsive viewports) */}
          <div className="sticky-book-bar">
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                Ready to transform?
              </span>
              <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>AURA Premium Booking</p>
            </div>
            <button 
              onClick={() => {
                const el = document.getElementById('booking');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-gold"
              style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}
            >
              <Calendar size={14} />
              <span>Book Slot</span>
            </button>
          </div>

          {/* Floating WhatsApp Button */}
          <a
            href="https://wa.me/15550199?text=Hi%20AURA,%20I'd%20like%20to%20inquire%20about%20your%20services."
            className="floating-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
          >
            <MessageSquare size={26} />
          </a>
        </>
      )}
    </div>
  );
}

export default App;
