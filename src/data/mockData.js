// Mock Database for AURA Luxury Salon

export const INITIAL_SERVICES = [
  {
    id: "s1",
    category: "Haircut & Styling",
    name: "Signature Styling & Haircut",
    description: "Premium hair consultation, scalp massage, custom haircut, wash and professional blow-dry styling.",
    price: 450,
    popular: true
  },
  {
    id: "s2",
    category: "Haircut & Styling",
    name: "Classic Grooming Cut",
    description: "Tailored mens cut, hot towel service, scalp massage, wash and precision beard trim.",
    price: 350,
    popular: false
  },
  {
    id: "s3",
    category: "Hair Color",
    name: "Balayage Glow Transformation",
    description: "Premium hand-painted highlights, custom toner, color-lock treatment and blowout.",
    price: 750,
    popular: true
  },
  {
    id: "s4",
    category: "Hair Color",
    name: "Vibrant Gloss & Tone",
    description: "All-over rich demi-permanent color glaze for ultimate shine and tone refreshing.",
    price: 500,
    popular: false
  },
  {
    id: "s5",
    category: "Hair Spa",
    name: "Royal Keratin Smooth Therapy",
    description: "Deep conditioning keratin infusion to eliminate frizz, restore moisture, and add silkiness.",
    price: 600,
    popular: false
  },
  {
    id: "s6",
    category: "Facial",
    name: "HydraGlow Diamond Facial",
    description: "Advanced multi-step exfoliating therapy, deep blackhead extraction, and custom serum booster.",
    price: 650,
    popular: true
  },
  {
    id: "s7",
    category: "Cleanup",
    name: "Charcoal Detox Deep Cleanse",
    description: "Pore-clearing charcoal clay mask, gentle exfoliation, hot steam and herbal hydration.",
    price: 400,
    popular: false
  },
  {
    id: "s8",
    category: "Manicure & Pedicure",
    name: "Royal Rose Petal Spa Mani-Pedi",
    description: "Warm milk bath, rose petal foot scrub, cuticle care, volcanic hot stone massage & polish.",
    price: 550,
    popular: false
  },
  {
    id: "s9",
    category: "Bridal Makeup",
    name: "Ethereal HD Bridal Makeup",
    description: "Professional high-definition bridal styling, eyelash application, airbrush foundation, and 16hr setting.",
    price: 799,
    popular: true
  },
  {
    id: "s10",
    category: "Groom Makeup",
    name: "Precision Groom Prep",
    description: "Subtle shine-control correction, moisturizing primer, dark circle diffusing & eyebrow setting.",
    price: 450,
    popular: false
  },
  {
    id: "s11",
    category: "Waxing",
    name: "Full Body Silk Infusion Wax",
    description: "Gentle organic honey wax application followed by soothing chamomile cooling gel.",
    price: 600,
    popular: false
  },
  {
    id: "s12",
    category: "Skin Care",
    name: "24K Gold Luxury Radiance Therapy",
    description: "Anti-aging pure gold leaf facial, collagen tightening massage, and high-frequency lifting.",
    price: 700,
    popular: true
  }
];

export const INITIAL_TEAM = [
  {
    id: "t1",
    name: "Elena Rostova",
    role: "Senior Master Stylist",
    specialization: "Balayage & Couture Cuts",
    experience: "10+ Years",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
  },
  {
    id: "t2",
    name: "Julian Mercer",
    role: "Grooming & Beard Architect",
    specialization: "Fade Artistry & Classic Shaves",
    experience: "8 Years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    id: "t3",
    name: "Amina Al-Jamil",
    role: "Lead Makeup & Bridal Artist",
    specialization: "HD Airbrush & Ethereal Glow",
    experience: "7 Years",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
  },
  {
    id: "t4",
    name: "Marcus Vane",
    role: "Dermal Esthetician",
    specialization: "Advanced Hydrafacials & Skin Peel",
    experience: "6 Years",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  }
];

export const INITIAL_REVIEWS = [
  {
    id: "r1",
    name: "Samantha Wright",
    rating: 5,
    text: "Elena transformed my hair! The balayage blend is completely seamless, and the atmosphere in AURA is incredibly relaxing. Absolutely worth every penny.",
    date: "2026-08-10",
    verified: true
  },
  {
    id: "r2",
    name: "David H. Miller",
    rating: 5,
    text: "Hands down the best fade and beard trim I have ever had. Julian pays attention to every minor detail. The hot towel treatment is a game-changer.",
    date: "2026-08-12",
    verified: true
  },
  {
    id: "r3",
    name: "Priya Sharma",
    rating: 5,
    text: "Amina did my bridal makeup and I felt like royalty. It looked amazing in person and flawless in high-definition photos. The staff is exceptionally warm.",
    date: "2026-08-14",
    verified: true
  },
  {
    id: "r4",
    name: "Clara Vincent",
    rating: 4,
    text: "The gold radiance skin therapy made my skin look glowing and refreshed. Highly professional. Will be booking a monthly session here.",
    date: "2026-08-15",
    verified: true
  }
];

export const SPECIAL_OFFERS = [
  {
    id: "o1",
    title: "Golden Jubilee Bridal Package",
    description: "Ethereal HD Makeup + Hair Styling + Luxury Rose Mani-Pedi + Gold Foil Facial.",
    price: 799,
    discount: "Save ₹300",
    badge: "Most Popular Combo"
  },
  {
    id: "o2",
    title: "Aura Premium Hair Spa Combo",
    description: "Royal Keratin Therapy + Signature Haircut + Custom Color Glaze Tone.",
    price: 699,
    discount: "Save ₹250",
    badge: "Limited Time"
  },
  {
    id: "o3",
    title: "First-Visit Welcoming Invitation",
    description: "Receive a 20% flat discount on any single styling or treatment during your first visit.",
    price: null,
    discount: "20% OFF",
    badge: "New Clients"
  },
  {
    id: "o4",
    title: "Vip Monthly Membership Club",
    description: "Unlimited cuts, 12 luxury facials, priority reservation line, and 15% discount on all retail products.",
    price: 799,
    discount: "Monthly Sub",
    badge: "Elite Perks"
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: "b1",
    name: "Emily Watson",
    phone: "+1 555-0199",
    service: "Signature Styling & Haircut",
    date: "2026-08-20",
    time: "10:30 AM",
    status: "Approved",
    whatsappConfirmed: true,
    created: "2026-08-15"
  },
  {
    id: "b2",
    name: "Liam O'Connor",
    phone: "+1 555-0142",
    service: "Classic Grooming Cut",
    date: "2026-08-21",
    time: "02:00 PM",
    status: "Pending",
    whatsappConfirmed: false,
    created: "2026-08-15"
  },
  {
    id: "b3",
    name: "Sophia Carter",
    phone: "+1 555-0177",
    service: "HydraGlow Diamond Facial",
    date: "2026-08-22",
    time: "11:00 AM",
    status: "Pending",
    whatsappConfirmed: true,
    created: "2026-08-15"
  }
];
